// import { Sequelize } from "./db/database";

const Discord = require("discord.js");
const client = new Discord.Client({autoReconnect:true});
const config = require("./config.json");

client.on("ready", () => {
  //Console stuff
  console.log("Marvin gaat er weer voor!");
});

client.on("message", message => {
  if (message.author.bot) return;
  let textMessage = message.content.toLowerCase();
  let arguments = message.content.slice(config.prefix.length).trim().split(/ +/g);
  const command = arguments.shift().toLowerCase();
  var random;

  try {

      if (message.isMentioned(client.user)) {
        message.channel.send("au");
      }
  
      if (!message.content.startsWith(config.prefix)) return;
  
      if (command === 'ping') {
        message.channel.send('owo');
      }
  
      if (command === "avatar") {
        message.reply(message.author.avatarURL);
      }
  
      if (command === "bestenummer") {
        message.channel.send('https://open.spotify.com/track/2374M0fQpWi3dLnB54qaLX?si=UxTPgKJrR9i8kELKmUaaog');
      }
  
      if (command === "stuurselfie") {
        message.channel.send("Ik zit gewoon effe lekker te bakken op de maan, ja. Kusjes en een zelfje",
            {"files": ["https://i.pinimg.com/originals/26/cf/26/26cf26b1e1e98ae0eb49bf5e58736cb2.jpg"]});
      }
      if (command === "coolboi") {
        let rng = Math.floor(Math.random() * 101);
        if (rng === 69) {
          message.channel.send(`haha seks <:huehuehuehuehuehue:438031814641057792>`);
        } else {
          message.channel.send(`Nou nou, heb jij een leuke command ontdekt die nog geen nuttige functie heeft? Goed bezig hoor, wat mij betreft is jouw coolheidsniveau ongeveer ${rng}. Lekker bezig, Pik!`);
        }
      }
      if (command === "rook") {
        message.channel.send(`Godnondejantje, ${message.author} wordt nog een partijtje hoger. Gaan jullie ook mee op deze ruimtereis?`)
      }
      if (command === "drink") {
        message.channel.send(`Het ziet er naar uit dat ${message.author} een heerlijke drankje gevonden heeft, het beste medicijn om je problemen mee weg te drinken!`)
      }
      if (command === "draai") {
        message.channel.send(`${message.author} gaat een baapje voorbereiden om even flink te klappen, doe jij ook mee?`)
      }
      if (command === "anaal") {
        message.reply("digitaal")
      }
      if (command === "help") {
        message.channel.send(`Hallo ${message.author}, het ziet er naar uit dat jij wilt weten wat ik kan. Vooraf een mededeling alvast dat mijn eigenaar een lui kutkind is dat echt eens een keer wat moois met mij moet maken.`);
        message.channel.send(`Hoe dan ook, mijn commands zijn:
      -"rook" om te laten weten dat je gaat smonken
      -"1-10" om op te scheppen over hoe erg je jezelf verneukt hebt op dit moment
      -"avatar" om alle seizoenen van Avatar: The Last Airbender automatisch te bestellen
      -"bestenummer" voor als je wilt weten hoe het voelt als je een OORgasme krijgt
      -"help" als je mij mist
      En er zijn nog een paar commando's die elk even nutteloos zijn, probeer wat uit of treiter Haan ervoor!`);
      }
      if (command === "geefmuziek") {
        random = Math.floor((Math.random()*5)+1);
        switch (random){
          case 1:
          message.channel.send(`Neem wat retegeile retrogolf`);
          message.channel.send(`https://open.spotify.com/playlist/4P9XPZnVWPE86wvo9bJQCs?si=g2Zwj2e0RTyJPstXSQ5uHw`);
          break;
          case 2:
          message.channel.send(`Retrogolf uit de ruimte? Klinkt als muziek in de oren als je geluid kon horen in de ruimte`);
          message.channel.send(`https://open.spotify.com/playlist/7jUtg7Cn7MKsghs8iU3ZOc?si=tPZxfVJdSO-ibfxVNMs0mw`);
          break;
          case 3:
          message.channel.send(`Als we het over ruimtemuziek willen hebben, dan is er niks meer ruimte dan dit`);
          message.channel.send(`https://open.spotify.com/playlist/37i9dQZF1DX0i61tT0OnnK?si=GXbzZoc5TTKTYQBFf8ZK6A`);
          break;
          case 4:
          message.channel.send(`Deze lijst is ideaal als je brein al zo kaduuk is dat langer dan 3 tellen nadenken moeilijk is`);
          message.channel.send(`https://open.spotify.com/playlist/34khadXVRdkxmUBXrVfiGn?si=_9grckSdR8ybo1HzDzfEeQ`);
          break;
          case 5:
          message.channel.send(`Variatie mag er ook zijn, daarom is hier een lijstje van chille lo-fi hiphop biets om op te studeren/relaxen/slapen`);
          message.channel.send(`https://open.spotify.com/playlist/5PBESEtt02HG3n3irwBIc5?si=dxlQ5WB5TJG_di9SalN3kQ`);
          break;
        }
      }
      
      //nutteloos lijstje van hoe high ik ben
      switch (command) {
        case "0":
          random = Math.floor((Math.random()*2)+1);
          if(random === 1){
            message.channel.send(`${message.author} is nog op planneet Aarde en verlangd nu simpelweg naar een reis in het universum.`);
          } else {
            message.channel.send(`Wat doet het toch pijn om compleet nuchter te zijn, zo voelt ${message.author} zich vast ook.`)
          }
          break;
        case "1":
          message.channel.send(`${message.author} is net van de grond maar zit nog wel in de atmosfeer van de Aarde, maar de reis is pas net begonnen en wie weet waar het heen zal gaan lopen! `);
          break;
        case "2":
          message.channel.send(`${message.author} is net uit de atmosfeer betreed nu het heelal, de reis gaat van start maar we zijn er nog lang niet!`);
          break;
        case "3":
          message.channel.send(`Langzaamaan zwevend door het heelal streeft ${message.author} nu net onze Maan voorbij. Een kleine rook voor ${message.author}, een grote rook voor de mensheid!`);
          break;
        case "4":
          message.channel.send(`Het gaat al erg lekker, ${message.author} zoeft nu flink door ons zonnestelsel. Net de ringen van Saturnus ontwijkend gaan we verder!`);
          break;
        case "5":
          message.channel.send(`Wauw! ${message.author} gaat al verder dan de mensheid bereikt heeft. Mokersnel en mokerlekker vliegend al diep de ruimte in, net voorbij de ~~planeet~~ Pluto!`);
          break;
        case "6":
          message.channel.send(`Nondeju, wat gaat dit vlug. ${message.author} dendert al door onze intergalaktische buurt heen en racet langs allerlei verschillende zonnestelsels. Die zit nu al echt dik ver in het heelal, netjes!`);
          break;
        case "7":
          message.channel.send(`Het is op dit punt dat je gaat merken dat tijd echt relatief is. ${message.author} gaat al hard genoeg dat uren minuten lijken en minuten zomaar uren kunnen worden. Een eeuw lijkt lang maar zo diep in het heelal is het maar een kleine hoeveelheid`);
          break;
        case "8":
          message.channel.send(`Het is op dit punt dat communicatie ook een moeilijke opgave wordt, ${message.author} is namelijk al zo ver weg heen. Racend door het heelal scheurt ${message.author} onze Melkweg uit. Wie had gedacht dat een mens zo hard kon gaan.`);
          break;
        case "9":
          message.channel.send(`Godnondetering, het gaat nu zo verdomd hard. Onaanspreekbaar, vaag als de neten maar wel vliegensvlug. Dat is ${message.author} in een notendop nu deze voorbij alle superclusters heen ramt. Het universum is nu van jou.`);
          break;
        case "10":
          message.channel.send(`Tering. Op dit punt reist ${message.author} niet meer door het universum maar is ${message.author} nu het universum. Alles ligt nu binnen handbereik, alles is mogelijk. We komen nu tot de diepste hoeken, de verste planeten en mooiste nebula's. Dit is een met het universum zijn op zijn piek, lekker!`);
          break;
        case "11":
          message.channel.send(`Oef. ${message.author} ging zo hard dat deze recht in een zwart gat gevlogen is. Het was leuk je gekend te hebben.`);
          break;
        case "69":
          message.channel.send('haha, 69 is het seksgetal, ik snap hem. Heel grappig, hoor.');
          break;
        case "420":
          message.channel.send(`Krijg, nou, de sodetering. Deze malle man deed het gewoon, hij vulde het wietgetal in. Het. Wiet. Getal. Wat een ongelooflijke held is ${message.author} ook`);
          break;
        case "1337":
          message.channel.send(`w0w, d17 15 3ch7 33n 3p15ch3 5p3l3rm0m3n7. kunn3n w3 h13rv00r 33n d3p kr1j63n?!`);
          break;
      }
  
    // Admin commands
    // commands for Haan#0420 only
    if(message.author.id !== config.ownerID) return;

    if (command === "zeg") {
      message.delete(1);
      var string = message.content;
      string = string.replace('🚀 zeg', '');
      message.channel.send(string);
    }

    if (command === "zuighetlol"){
        message.delete(1);
        var interval = setInterval (function () {
          message.channel.send("j")
          .catch(console.error);
        }, 1 * 3000);
    }

  } 
  catch (error) {
    console.error('Whoops, something went wrong!');
  }

});
client.login(config.token);