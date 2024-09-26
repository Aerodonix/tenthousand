import readline from 'readline';

// Define the type for a single roll value (between 1 and 6)
type Roll = 1 | 2 | 3 | 4 | 5 | 6;

// Function to simulate rolling a 6-sided die and return a typed value
function roll(): Roll {
  return (Math.floor(Math.random() * 6) + 1) as Roll;
}

// Function to ask user input using readline
function askUserInput(question: string): Promise<string> {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });

  return new Promise((resolve) => {
    rl.question(question, (answer) => {
      rl.close();
      resolve(answer);
    });
  });
}

// Function to print an array of dice rolls dynamically
function printRolls(rolls: Roll[]): void {
  console.log("Here are your current dice rolls:");
  rolls.forEach((value, index) => {
    console.log(`${index + 1}: ${value}`);
  });
}

// Main function to run the program
async function run(): Promise<void> {
  console.log("Welcome to Zehntausend\n");

  // Initialize the score to 0
  let totalScore = 0;
  let accountScore = 0;

  // Start with 6 dice
  let remainingDice = 6;

  // Loop until the account score reaches 10,000
  while (accountScore < 10000) {
    console.log(`Your current account score: ${accountScore}`);
    console.log(`Your current round score: ${totalScore}`);

    // Roll the remaining dice
    const rolls: Roll[] = Array.from({ length: remainingDice }, () => roll());

    // Print the current rolls
    printRolls(rolls);

    // Filter for indices of dice that have a value of 1 or 5
    const validIndices = rolls
      .map((value, index) => (value === 1 || value === 5 ? index + 1 : null))
      .filter((index) => index !== null) as number[];

    // Count occurrences of each value
    const valueCounts: Record<Roll, number> = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0, 6: 0 };
    rolls.forEach(value => {
      valueCounts[value as Roll]++; // Type assertion here to satisfy TypeScript
    });

    // Check for triples
    const triples = Object.keys(valueCounts).filter(value => valueCounts[Number(value) as Roll] >= 3); // Assert Number(value) as Roll

    // If no valid dice are left, notify and continue to the next round
    if (validIndices.length === 0 && triples.length === 0) {
      console.log("No more 1s or 5s to put aside. You can continue the game.\n");
      remainingDice = 6; // Reset for the next round
      totalScore = 0; // Reset the round score
      continue;
    }

    // Check conditions for auto selection of values
    const allOnesOrFives = rolls.every(value => value === 1 || value === 5);
    const twoTriples = triples.length >= 2;

    if (allOnesOrFives || twoTriples) {
      console.log("All dice show either 1 or 5, or there are two triples. Automatically choosing these values...");
      rolls.forEach(value => {
        if (value === 1) {
          totalScore += 100;
        } else if (value === 5) {
          totalScore += 50;
        }
      });
      console.log(`You have automatically put aside all dice, earning ${totalScore} points.\n`);
      remainingDice = 6; // Reset to 6 dice for a new roll
      continue; // Roll again
    }

    // Allow the user to choose triples
    if (triples.length > 0) {
      const tripleChoices = triples.map(Number).join(", ");
      const chooseTriple = await askUserInput(`You have triples of ${tripleChoices}. Do you want to choose one? (yes/no): `);
      
      if (chooseTriple.toLowerCase() === 'yes') {
        const chosenValue = await askUserInput(`Which value would you like to choose? (${tripleChoices}): `);
        const chosenValueNum = parseInt(chosenValue, 10) as Roll; // Casting to Roll type

        if (triples.includes(chosenValueNum.toString())) {
          // Automatically add score based on the chosen triple
          if (chosenValueNum === 1) {
            totalScore += 1000; // Triple 1 earns 1000 points
            console.log(`You have chosen triple 1s! Added 1000 points to your score.`);
          } else {
            totalScore += chosenValueNum * 100; // Triple of any other number earns number * 100 points
            console.log(`You have chosen triple ${chosenValueNum}s! Added ${chosenValueNum * 100} points to your score.`);
          }
          // Reduce the dice count by 3 and remove those values
          remainingDice -= 3;
          console.log(`You have set aside three ${chosenValueNum}s. Remaining dice: ${remainingDice}`);
          continue; // Continue to the next round since the player set aside triples
        } else {
          console.log("Invalid selection. No points added for this action.");
        }
      }
    }

    // Ask the user which dice they would like to put aside
    let selectedIndices: number[] = [];

    while (selectedIndices.length === 0) {
      const answer = await askUserInput(`Which dice (number ${validIndices.join(", ")}) would you like to put aside? (comma separated for multiple choices): `);

      // Convert the user's answer to an array of numbers
      const chosenIndices = answer.split(",").map(num => parseInt(num.trim(), 10) - 1); // Subtract 1 to match array index (0 to rolls.length - 1)

      // Validate the indices
      const validChoices = chosenIndices.filter(index => 
        index >= 0 && index < rolls.length && (rolls[index] === 1 || rolls[index] === 5)
      );

      if (validChoices.length > 0) {
        selectedIndices = validChoices; // Set the selected indices to break the loop
      } else {
        console.log("Invalid selection. Please choose valid dice numbers with values of 1 or 5.");
      }
    }

    // Calculate points based on the selected die values
    selectedIndices.forEach(index => {
      const selectedValue = rolls[index];
      if (selectedValue === 1) {
        totalScore += 100;
      } else if (selectedValue === 5) {
        totalScore += 50;
      }
    });

    // Log the results of the selected dice
    console.log(`You have put aside dice ${selectedIndices.map(i => i + 1).join(", ")} with values ${selectedIndices.map(i => rolls[i]).join(", ")}, earning ${selectedIndices.map(i => rolls[i] === 1 ? 100 : 50).join(", ")} points.`);
    console.log(`Current total score for this round: ${totalScore}\n`);

    // Remove the selected dice from the count
    remainingDice -= selectedIndices.length;

    // Check if the score is greater than 350 and ask if the user wants to store it
    if (totalScore > 350) {
      const storeAnswer = await askUserInput("Your score is above 350! Do you want to store your score to your account? (yes/no): ");
      if (storeAnswer.toLowerCase() === "yes") {
        accountScore += totalScore;
        console.log(`Your score of ${totalScore} has been added to your account. Total account score: ${accountScore}`);
        totalScore = 0; // Reset the round score
        remainingDice = 6; // Restart with 6 dice
      } else {
        console.log("Continuing with your current round.\n");
      }
    }

    // If all dice are selected, start a new round
    if (remainingDice === 0) {
      console.log("All dice have been put aside. Starting a new round with 6 dice.\n");
      remainingDice = 6; // Reset to 6 dice for a new round
    }
  }

  // End the game and print the final account score
  console.log(`Congratulations! You've reached an account score of ${accountScore}. The game is now over.`);
}

// Running the function
run();
