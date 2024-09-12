"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const readline = __importStar(require("readline"));
// Create an interface for reading input from the command line
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});
function askQuestion(question) {
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
    }
    else {
        console.log("Oops! The correct answer is Paris.");
    }
    const answer2 = await askQuestion("What is 2 + 2? ");
    if (parseInt(answer2) === 4) {
        console.log("Correct! 🎉");
    }
    else {
        console.log("Oops! The correct answer is 4.");
    }
    const color = await askQuestion("What's your favorite color? ");
    // More reaction based on free input
    if (color.toLowerCase() === "blue") {
        console.log("Blue is a cool color!");
    }
    else if (color.toLowerCase() === "red") {
        console.log("Red is fiery!");
    }
    else {
        console.log(`${color} is a unique choice!`);
    }
    // Close the readline interface after all questions are answered
    rl.close();
}
run();
