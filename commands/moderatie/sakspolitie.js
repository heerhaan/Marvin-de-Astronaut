const common = require("../../common.js");

module.exports = {
    name: "as",
    description: "Automagische Spanjolering voor de luie stadt. Gebruik j of n om aan of uit te zetten voor dit kanaal.",
    usage: '[j/n]',
    admin: true,
    execute (message, args)
    {
        const kanalen = require("./autospanjoolkanalen.json") || [];

        let add = args[0].toLowerCase().trim() === "j";

        if (add && !kanalen.includes(message.channel))
        {
            kanalen.push(message.channel);
        }
        else if (!add && kanalen.includes(message.channel))
        {
            kanalen.splice(kanalen.indexOf(message.channel), 1);
        }

        fs.writeFile("./autospanjoolkanalen.json", JSON.stringify(data), function (err)
        {
            if (err)
            {
                console.log(err);
            }

            console.log(`Auto-spanjool gegevens opgeslagen. ${message.channel} is ${add ? "toegevoegd" : "verwijderd"}.`);
        });
    }
};