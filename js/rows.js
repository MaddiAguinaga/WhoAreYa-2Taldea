//1.getAge(dateString)

//2.check(theKey, theValue)

//3.getPlayer(playerId)

//4.leagueToFlag(leagueId)
export function leagueToFlag(leagueId) {

    // mapearen bidez lortu bakoitzaren flg-a
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

