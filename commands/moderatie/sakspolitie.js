const common = require("../../common.js");
const fs = require('node:fs');

module.exports = {
    name: "as",
    description: "Automagische Spanjolering voor de luie stadt. Gebruik j of n om aan of uit te zetten voor dit kanaal.",
    usage: '[j/n]',
    admin: true,
    execute (message, args)
    {
        let kanalen = [];

        try
        {
            kanalen = JSON.parse(fs.readFileSync('./autospanjoolkanalen.json', 'utf8'));
        } catch (err)
        {
            console.error('Kon autospanjoolkanalen.json niet lezen, dus ik maak een nieuwe:', err);
        }

        let add = args[0].toLowerCase().trim() === "j";

        if (add && !kanalen.includes(message.channel.id))
        {
            kanalen.push(message.channel.id);
        }
        else if (!add && kanalen.includes(message.channel.id))
        {
            kanalen.splice(kanalen.indexOf(message.channel.id), 1);
        }

        fs.writeFile("./autospanjoolkanalen.json", JSON.stringify(kanalen), function (err)
        {
            if (err)
            {
                console.log(err);
            }

            console.log(`Auto-spanjool gegevens opgeslagen. ${message.channel.id} is ${add ? "toegevoegd" : "verwijderd"}.`);
        });
    }
};