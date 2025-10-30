import fs from 'fs';

// Datuak lortu, competitions.json fitxategian gorde string moduan eta ESP, ENG, ITA, FRA herrialdeetako TIER_ONE ligak lortu
fetch('http://api.football-data.org/v4/competitions')
    .then(
        r => r.json())
    .then(
        data => {
            // Lortutako json-a competitions.json fitxategian gorde string moduan
            fs.writeFileSync('competitions.json', JSON.stringify(data, null, 2));
            console.log('competitions.json fitxategia gordeta.');

            // 'plan = TIER_ONE' duten objektuak bilatu
            const competitions_TIER_ONE = data.competitions.filter(c => c.plan === "TIER_ONE");

            // ESP, ENG, ITA, FRA herrialdeetakoak lortu
            const competitions_TIER_ONE_ESP_ENG_ITA_FRA = competitions_TIER_ONE.filter(c => ["Spain", "Italy", "England", "France"].includes(c.area.name));

            console.log('ESP, ENG, ITA, FRA herrialdeetako TIER_ONE ligak lortu:');
            console.log(competitions_TIER_ONE_ESP_ENG_ITA_FRA);
            console.log(competitions_TIER_ONE_ESP_ENG_ITA_FRA.length); // 5
        }
    )


