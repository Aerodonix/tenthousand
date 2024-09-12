import * as readline from 'readline';

// Create an interface for reading input from the command line
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

function askQuestion(question: string): Promise<string> {
  return new Promise((resolve) => {
    rl.question(question, (answer) => {
      resolve(answer);
    });
  });
}

async function run() {
  console.log("Welcome to the interactive TypeScript quiz!");

  const answer1 = await askQuestion("What is the capital of France? ");
  
  // Reacting to the user input
  if (answer1.toLowerCase() === "paris") {
    console.log("Correct! 🎉");
  } else {
    console.log("Oops! The correct answer is Paris.");
  }

  const answer2 = await askQuestion("What is 2 + 2? ");
  
  if (parseInt(answer2) === 4) {
    console.log("Correct! 🎉");
  } else {
    console.log("Oops! The correct answer is 4.");
  }

  const color = await askQuestion("What's your favorite color? ");
  
  // More reaction based on free input
  if (color.toLowerCase() === "blue") {
    console.log("Blue is a cool color!");
  } else if (color.toLowerCase() === "red") {
    console.log("Red is fiery!");
  } else {
    console.log(`${color} is a unique choice!`);
  }

  // Close the readline interface after all questions are answered
  rl.close();
}

run();
