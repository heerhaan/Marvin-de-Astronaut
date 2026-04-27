const defaultPrefix = require("../../config.json");
const fs = require('node:fs');

module.exports = {
    name: "pf",
    description: "Omt uwe eigen voorzetsel aan te passen (heel vet). Laat leeg om terug te gaan naar de standaard.",
    usage: '[voorzetsel]',
    admin: true,
    async execute(message, args) {
        let nieuweVoorzetsel = '';
        return message.channel.send(`jo, is goed baas. ik heb het aangepast naar ${nieuweVoorzetsel}`);
    }
}

function slaGegevensOp (data)
{
    console.log("Opslaan...");
    try
    {
        if (data != null)
        {
            fs.writeFile("./voorzetsels.json", JSON.stringify(data), function (err)
            {
                if (err)
                {
                    console.log(err);
                }

                console.log("Opgeslagen.");
            });
        }
        else
        {
            console.log("Opslaan niet gelukt: data is null");
        }
    }
    catch (ex)
    {
        console.log("Opslaan niet gelukt door onverwachte fout!");
        console.log(ex);
    }
}

function geefGegevens ()
{
    fs.readFile('./voorzetsels.json', function read (err, data) 
    {
        if (err) 
        {
            console.error("Fout bij lezen; :(");
            data = "{}";
        }

        try
        {
            voorzetselData = JSON.parse(data);

            if (Array.isArray(voorzetselData))
                voorzetselData = {};
        }
        catch (e)
        {
            if (data == null || data == "")
            {
                console.error("Geheugen stuk, auwie");
                voorzetselData = {};
            }
        }
    });
}