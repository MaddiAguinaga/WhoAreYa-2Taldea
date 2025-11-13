// YOUR CODE HERE :
// .... stringToHTML ....
import {stringToHTML, higher, lower } from './fragments.js';


// .... setupRows .....

const delay = 350;
const attribs = ['nationality', 'leagueId', 'teamId', 'position', 'birthdate']


let setupRows = function (game) {


    function leagueToFlag(leagueId) {
        // Mapearen bidez lortu bakoitzaren flg-a
        const map = {
            564: "es1", // España (La Liga)
            8: "en1",   // Inglaterra (Premier League)
            82: "de1",  // Alemania (Bundesliga)
            384: "it1", // Italia (Serie A)
            301: "fr1"  // Francia (Ligue 1)
        };

        // balorea bueltatu, edo undefined bada -> 'unknown'
        return map[leagueId] || "unknown";
    }


    function getAge(dateString) {
        // Emandako data (string) Date-era bihurtu
        const birthDate = new Date(dateString);

        // Uneko data lortu
        const today = new Date();

        // Adina kalkulatu
        let age = today.getFullYear() - birthDate.getFullYear();

        // Orandikan urtea ez badu bete aztertu
        const hasHadBirthdayThisYear =
            today.getMonth() > birthDate.getMonth() ||
            (today.getMonth() === birthDate.getMonth() && today.getDate() >= birthDate.getDate());

        if (!hasHadBirthdayThisYear) {
            age -= 1;
        }

        return age;
    }

    let check = function (theKey, theValue) {
        // YOUR CODE HERE
        const player = getPlayer(game.solution.id);
        let result;

        // Atributua existitzen dela ziurtatu
        if (!(theKey in player)) {
            result = 'invalid key';
        }
        // Birthdate kasu berezia tratatu
        else if (theKey === 'birthdate') {
            // Bi datak Date objektu bihurtu
            const playerDate = new Date(player.birthdate);
            const inputDate = new Date(theValue);

            // Adina kalkulatu bi datetatik
            const calcAge = date => new Date().getFullYear() - date.getFullYear();

            const playerAge = calcAge(playerDate);
            const inputAge = calcAge(inputDate);

            if (playerAge === inputAge) {
                result = 'correct';
            } else if (playerAge > inputAge) {
                result = 'higher';
            } else {
                result = 'lower';
            }
        }

        // Gainerako atributuentzat konparaketa orokorra
        else if (player[theKey] === theValue) {
            result = 'correct';
        } else {
            result = 'incorrect';
        }

        return result;
    }

    function unblur(outcome) {
        return new Promise( (resolve, reject) =>  {
            setTimeout(() => {
                document.getElementById("mistery").classList.remove("hue-rotate-180", "blur")
                document.getElementById("combobox").remove()
                let color, text
                if (outcome=='success'){
                    color =  "bg-blue-500"
                    text = "Awesome"
                } else {
                    color =  "bg-rose-500"
                    text = "The player was " + game.solution.name
                }
                document.getElementById("picbox").innerHTML += `<div class="animate-pulse fixed z-20 top-14 left-1/2 transform -translate-x-1/2 max-w-sm shadow-lg rounded-lg pointer-events-auto ring-1 ring-black ring-opacity-5 overflow-hidden ${color} text-white"><div class="p-4"><p class="text-sm text-center font-medium">${text}</p></div></div>`
                resolve();
            }, "2000")
        })
    }

    function setContent(guess) {

    const solutionAge = getAge(game.solution.birthdate);
    const guessAge = getAge(guess.birthdate);

    let ageDisplay = `${guessAge}`;

    if (guessAge < solutionAge) {
        ageDisplay = `${higher} ${guessAge}`;
    } else if (guessAge > solutionAge) {
        ageDisplay = `${lower} ${guessAge}`;
    }

    return [
        `<img src="https://playfootball.games/media/nations/${guess.nationality.toLowerCase()}.svg" alt="" style="width: 60%;">`,
        `<img src="https://playfootball.games/media/competitions/${leagueToFlag(guess.leagueId)}.png" alt="" style="width: 60%;">`,
        `<img src="https://cdn.sportmonks.com/images/soccer/teams/${guess.teamId % 32}/${guess.teamId}.png" alt="" style="width: 60%;">`,
        `${guess.position}`,
        ageDisplay
    ];

    }

    function showContent(content, guess) {
        let fragments = '', s = '';
        for (let j = 0; j < content.length; j++) {
            s = "".concat(((j + 1) * delay).toString(), "ms")
            fragments += `<div class="w-1/5 shrink-0 flex justify-center ">
                            <div class="mx-1 overflow-hidden w-full max-w-2 shadowed font-bold text-xl flex aspect-square rounded-full justify-center items-center bg-slate-400 text-white ${check(attribs[j], guess[attribs[j]]) == 'correct' ? 'bg-green-500' : ''} opacity-0 fadeInDown" style="max-width: 60px; animation-delay: ${s};">
                                ${content[j]}
                            </div>
                         </div>`

        }

        let child = `<div class="flex w-full flex-wrap text-l py-2">
                        <div class=" w-full grow text-center pb-2">
                            <div class="mx-1 overflow-hidden h-full flex items-center justify-center sm:text-right px-4 uppercase font-bold text-lg opacity-0 fadeInDown " style="animation-delay: 0ms;">
                                ${guess.name}
                            </div>
                        </div>
                        ${fragments}`

        let playersNode = document.getElementById('players')
        playersNode.prepend(stringToHTML(child))
    }

    function resetInput(){
        // YOUR CODE HERE
    }

    let getPlayer = function (playerId) {
        // YOUR CODE HERE
        // game.players array-an bilatu ID hori duen jokalaria
        playerId = Number(playerId);
        const player = game.players.find(p => p.id === playerId);

        // Jokalaria aurkitzen bada itzuli, bestela null
        return player || null;
    }

    function gameEnded(lastGuess){
        // YOUR CODE HERE
    }


    resetInput();

    return /* addRow */ function (playerId) {

        let guess = getPlayer(playerId)
        console.log(guess)

        let content = setContent(guess)

        game.guesses.push(playerId)
        updateState(playerId)

        resetInput();

        if (gameEnded(playerId)) {
            // updateStats(game.guesses.length);

            if (playerId == game.solution.id) {
                success();
            }

            if (game.guesses.length == 8) {
                gameOver();
            }
        }

        showContent(content, guess)
    }

}
export { setupRows };
