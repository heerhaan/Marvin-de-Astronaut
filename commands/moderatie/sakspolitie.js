const common = require("../../common.js");
const fs = require('node:fs');

module.exports = {
    name: "as",
    description: "Automagische Spanjolering voor de luie stadt. Gebruik j of n om aan of uit te zetten voor dit kanaal.",
    usage: '[j/n/w]',
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
        let addWarn = args[0].toLowerCase().trim() === "w";

        for (let i = 0; i < kanalen.length; i++)
        {
            if (kanalen[i].id == message.channel.id)
                kanalen.splice(i, 1);
        }

        if (add)
        {
            kanalen.push({ id: message.channel.id, straf: true });
            message.reply('Art1kel zal strict gehandhaafd worden.');
        }
        else if (addWarn)
        {
            kanalen.push({ id: message.channel.id, straf: false });
            message.reply('Ik zal ze enkel waarschuwen!');
        }
        else
        {
            message.reply('Ik zal saks door de vingers zien in dit kanaal.');
        }

        fs.writeFile("./autospanjoolkanalen.json", JSON.stringify(kanalen), function (err)
        {
            if (err)
            {
                console.log(err);
            }

            console.log(`Auto-spanjool gegevens opgeslagen. ${message.channel.id} is ${(add || addWarn) ? "toegevoegd" : "verwijderd"}.`);
        });
    }
};