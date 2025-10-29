import fs from 'fs';

// Datuak lortu, competitions.json fitxategian gorde string moduan eta id=2014 dutenak bistaratu
fetch('http://api.football-data.org/v4/competitions')
    .then(
        r => r.json())
    .then(
        data => {
            // Lortutako json-a competitions.json fitxategian gorde string moduan
            fs.writeFileSync('competitions.json', JSON.stringify(data, null, 2));
            console.log('competitions.json fitxategia gordeta.');

            // 'id = 2014' duen objektua bilatu
            const competitions_id2014 = data.competitions.filter(c => c.id === 2014);

            // 'id = 2014' duen objektua bistaratu
            console.log('id=2014 duen objektua:');
            console.log(competitions_id2014);
        }
    )


