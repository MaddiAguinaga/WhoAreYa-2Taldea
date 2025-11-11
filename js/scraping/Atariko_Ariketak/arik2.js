import fs from 'fs';

// Datuak lortu, competitions.json fitxategian gorde string moduan eta 'plan = TIER_ONE' eta 'area.name = Spain' duten objektuak bistaratu
fetch('http://api.football-data.org/v4/competitions')
    .then(
        r => r.json())
    .then(
        data => {
            // Lortutako json-a competitions.json fitxategian gorde string moduan
            fs.writeFileSync('competitions.json', JSON.stringify(data, null, 2));
            console.log('competitions.json fitxategia gordeta.');

            // 'plan = TIER_ONE' duten objektuak bilatu
            const competitions_planTIER_ONE = data.competitions.filter(c => c.plan === "TIER_ONE");

            // 'area.name = Spain' duten objektuak bilatu
            const competitions_planTIER_ONE_espainiakoLiga = competitions_planTIER_ONE.filter(c => c.area.name === "Spain");

            // 'plan = TIER_ONE' eta 'area.name = Spain' duten objektuak bistaratu
            console.log('TIER_ONE eta Espainiako ligakoak diren objektuak:');
            console.log(competitions_planTIER_ONE_espainiakoLiga);
        }
    )


