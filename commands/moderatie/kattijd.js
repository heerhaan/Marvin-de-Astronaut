module.exports = {
	name: 'kattijd',
    description: 'Als er een hoop katten gepaald moeten worden',
    admin: true,
	execute(message) {
        const catchErr = err => {console.log(err)}
        function randomIntFromInterval(min, max) { // min and max included 
            return Math.floor(Math.random() * (max - min + 1) + min)
        }
        const katalogus = [
            "https://cdn.discordapp.com/attachments/498824337755996170/894640896161763399/breinvries.mp4",
            "https://cdn.discordapp.com/attachments/498824337755996170/894640889706729572/boulangerie.webm",
            "https://cdn.discordapp.com/attachments/498824337755996170/894640884140879963/boop.mp4",
            "https://cdn.discordapp.com/attachments/498824337755996170/894640877023158322/BONSBONSBONSBONS.mp4",
            "https://cdn.discordapp.com/attachments/498824337755996170/894640872023531550/bonk.mp4",
            "https://cdn.discordapp.com/attachments/498824337755996170/894640867355262976/boes.mp4",
            "https://cdn.discordapp.com/attachments/498824337755996170/894640864100483222/boep.mp4",
            "https://cdn.discordapp.com/attachments/498824337755996170/894640858610155550/blub.mp4",
            "https://cdn.discordapp.com/attachments/498824337755996170/894640853316931664/blijfleven.mp4",
            "https://cdn.discordapp.com/attachments/498824337755996170/894640852377419786/bendepoes.mov",
            "https://cdn.discordapp.com/attachments/498824337755996170/894640841774206986/avatarbeesten.mp4",
            "https://cdn.discordapp.com/attachments/498824337755996170/894640836481003640/1617326553639.webm",
            "https://cdn.discordapp.com/attachments/498824337755996170/894640827043823646/194547459_319757646405328_6768921071048538317_n.mp4",
            "https://cdn.discordapp.com/attachments/498824337755996170/894640813080981604/130096750_867035110773375_5527009745532096109_n.mp4",
            "https://cdn.discordapp.com/attachments/498824337755996170/894640808886693948/118467111_201787821285757_7508734905028802584_n.mp4",
            "https://cdn.discordapp.com/attachments/498824337755996170/894640779933392966/worstel2.mp4",
            "https://cdn.discordapp.com/attachments/498824337755996170/894640774216548402/worstel.mp4",
            "https://cdn.discordapp.com/attachments/498824337755996170/894640769149833236/wie_kan_het_zijn_nu.mp4",
            "https://cdn.discordapp.com/attachments/498824337755996170/894640763021971456/weeewooo.mp4",
            "https://cdn.discordapp.com/attachments/498824337755996170/894640756353011752/wanneerjeeet.mp4",
            "https://cdn.discordapp.com/attachments/498824337755996170/894640741991743549/vrachtwagen.mp4",
            "https://cdn.discordapp.com/attachments/498824337755996170/894640736534933604/video0-143.mp4",
            "https://cdn.discordapp.com/attachments/498824337755996170/894640730243493958/video0.mp4",
            "https://cdn.discordapp.com/attachments/498824337755996170/894640724824428624/video0.mov",
            "https://cdn.discordapp.com/attachments/498824337755996170/894640716913995787/video01.mp4",
            "https://cdn.discordapp.com/attachments/498824337755996170/894640707199963206/stuiterbal.webm",
            "https://cdn.discordapp.com/attachments/498824337755996170/894640702699503697/SQUISH_THAT_CAT.mp4",
            "https://cdn.discordapp.com/attachments/498824337755996170/894640690217246781/smacc.mov",
            "https://cdn.discordapp.com/attachments/498824337755996170/894640696298979449/So_I_saw_my_cat_outside....mp4",
            "https://cdn.discordapp.com/attachments/498824337755996170/894640680335458344/pratende_kat_-_versta_hem_nie_ma_ben_er_mee_eens.mp4",
            "https://cdn.discordapp.com/attachments/498824337755996170/894640675730116678/poeslekkerwaterhmm.mp4",
            "https://cdn.discordapp.com/attachments/498824337755996170/894640670818598942/paardihe.mp4",
            "https://cdn.discordapp.com/attachments/498824337755996170/894640665873485834/ohnocringearab.mp4",
            "https://cdn.discordapp.com/attachments/498824337755996170/894640646671974471/mlemmlemmlem.mov",
            "https://cdn.discordapp.com/attachments/498824337755996170/894640635401863218/mioef.mp4",
            "https://cdn.discordapp.com/attachments/498824337755996170/894640630259667014/miew.mp4",
            "https://cdn.discordapp.com/attachments/498824337755996170/894640618842759208/miaaaauw.mov",
            "https://cdn.discordapp.com/attachments/498824337755996170/894640610164744193/laserkattakresal.mp4",
            "https://cdn.discordapp.com/attachments/498824337755996170/894640604527591495/kot.webm",
            "https://cdn.discordapp.com/attachments/498824337755996170/894640599628664874/kom_hier.mp4",
            "https://cdn.discordapp.com/attachments/498824337755996170/894640590313095228/katvibreer.mp4",
            "https://cdn.discordapp.com/attachments/498824337755996170/894640582985670697/K97K9c1.mp4",
            "https://cdn.discordapp.com/attachments/498824337755996170/894640572579577987/ik_na_10m_rennen.mp4",
            "https://cdn.discordapp.com/attachments/498824337755996170/894640549968105532/hoogvijf.mp4",
            "https://cdn.discordapp.com/attachments/498824337755996170/894640547849961532/hiherbert.mp4",
            "https://cdn.discordapp.com/attachments/498824337755996170/894640542376398908/final_5f3aed6219aac400155aa3d9_875513.mp4",
            "https://cdn.discordapp.com/attachments/498824337755996170/894640535397081168/f3001e2f999659ab63715b3c5b37dda6e3e639882.mp4",
            "https://cdn.discordapp.com/attachments/498824337755996170/894640533832617994/eten.mp4",
            "https://cdn.discordapp.com/attachments/498824337755996170/894640531001462814/DierenKruispunt.mp4",
        ];

        const videoAmount = 5;
        for (let i = 0; i < videoAmount; i++) {
            let rndInt = randomIntFromInterval(0, katalogus.length - 1);
            message.channel.send(katalogus[rndInt]);
        }
	},
};