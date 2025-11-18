let initState = function(what, solutionId) {

    // YOUR CODE HERE

    // localstorage-etik lortu objektua
    let obj = localStorage.getItem(what);
    let state;

    if (obj) { // objektua existitzen bada, parseatu
        state = JSON.parse(obj);
    } else { // objektua ez bada existitzen, sortu objektu berria guesses hutsik jarriz
        state = {
            solution: solutionId,
            guesses: []
        };

        // localStorage-en gorde
        localStorage.setItem(what, JSON.stringify(state));
    }

    // Guess berriak gorde eta localStorage-n eguneratzeko funtzioa
    let addGuess = function (guess) {
        localStorage.setItem(what, JSON.stringify(state));  // localStorage eguneratu
    };

    // Bi baloreko array-a bueltatu [state, funtzioa]
    return [state, addGuess];
}


let initState = function(what, solutionId) {

    // YOUR CODE HERE
}

function successRate (e){
    // YOUR CODE HERE
    const totalGames = e.totalGames;
    const gamesFailed = e.gamesFailed;

    if (totalGames == 0) return 0;

    const wins = totalGames - gamesFailed;
    return (wins / totalGames) * 100;
}

let getStats = function(what) {
    // YOUR CODE HERE
    //
};


function updateStats(t){
    // YOUR CODE HERE
};


let gamestats = getStats('gameStats');

export {updateStats, getStats, initState}

