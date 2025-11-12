const dayjs = require('dayjs');
const fs = require('node:fs');

module.exports = {
    name: 'controleer',
    description: 'Ter controle of er enkele spanjolen aan hun straf ontkomen zijn',
    admin: true,
    execute (message, args)
    {
        fs.readFile('./spanjoleringData.json', async function read (err, data) 
        {
            if (err) 
            {
                return; // geen bestand aangetroffen oid
            }

            if (args[0] == "rauw")
            {
                await message.channel.send({
                    content: 'Vertrouw je me niet? Kijk dan lekker zelf!!',
                    files: ['./spanjoleringData.json']
                });

                return;
            }

            let spanjoleringen = JSON.parse(data);

            if (!spanjoleringen) return;

            let huidigeSpanjolen = [];

            for (var sleutel of Object.keys(spanjoleringen))
            {
                let manIsSpanjool = spanjoleringen[sleutel].filter(s => s.ontjoolDatum > Date.now()).length > 0;

                if (manIsSpanjool)
                {
                    try
                    {
                        let spanjaard;

                        const member = message.guild.members.cache.find(member => member.id === sleutel);

                        if (!member) break;

                        spanjoleringen[sleutel]
                            .filter(s => s.ontjoolDatum > Date.now())
                            .forEach(element =>
                            {
                                if (!spanjaard || element.datum > spanjaard.datum)
                                {
                                    spanjaard = element;
                                }
                            });

                        huidigeSpanjolen.push(spanjaard);
                    } catch (err)
                    {
                        console.error(err);
                        return message.channel.send("auwie, dat deed pijn");
                    }
                }
            }

            if (huidigeSpanjolen.length === 0)
            {
                return message.channel.send("Er zijn momenteel geen actieve spanjolen!");
            } else
            {
                for (let i = 0; i < huidigeSpanjolen.length; i++)
                {
                    let sukkel = huidigeSpanjolen[i];
                    let leesbareTijd = dayjs(sukkel.ontjoolDatum).format("DD/MM/YYYY HH:mm");

                    message.channel.send(`${sukkel.gebruikerNaam} heeft nog ;${sukkel.rol} tot ${leesbareTijd}`);
                }
            }
        });
    },
};