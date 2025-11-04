import { folder, leftArrow } from "./fragments.js";
import { fetchJSON } from "./loaders.js";

function differenceInDays(date1) {
    // YOUR CODE HERE
}

let difference_In_Days = differenceInDays(new Date("01-10-2025"));

window.onload = function () {
  document.getElementById("gamenumber").innerText = difference_In_Days.toString();
  document.getElementById("back-icon").innerHTML = folder + leftArrow;
};

let game = {
  guesses: [],
  solution: {},
  players: [],
  leagues: []
};

function getSolution(players, solutionArray, difference_In_Days) {
 
    // YOUR CODE HERE

    // Calculate the index in the solution array
    const index = (difference_In_Days - 1) % solutionArray.length;

    // Retrieve the solution object
    const solution = solutionArray[index];

    // Find the corresponding player object in the players array
    const player = players.find(p => p.id === solution.id);

    // Show the player object for debugging
    console.log("Selected Player:", player);

    // Return the player object
    return player;
}

Promise.all([fetchJSON("fullplayers25"), fetchJSON("solution25")]).then(
  (values) => {

    let solution;
    
    [game.players, solution] = values;

    game.solution = getSolution(game.players, solution, difference_In_Days);
    
    console.log(game.solution);

    document.getElementById("mistery").src = `https://playfootball.games/media/players/${game.solution.id % 32}/${game.solution.id}.png`;
  
  }
);
