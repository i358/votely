var express = require('express');
var router = express.Router();
const Discord = require('discord.js');
const client = new Discord.Client();
var jwt = require('jsonwebtoken');
/* GET home page. */
router.get('/', function (req, res, next) {
    res.status(200).json({ status: "OK", message: "Hello " + global.config.SERVER_NAME })
});

router.post("/servers",(req, res) => {
    var Authorization = req.headers["authorization"]
    if (!Authorization) return res.status(502).send({ code: 502, message: "Token malformed or missing." })

    var [tokenType, token] = Authorization.split(" ")
    if (tokenType === "Bearer") {
        client.login(token).catch(console.error)
        var servers = client.guilds.cache;
        var serverList = []
        try {
            servers.map((s) => {
                var server = client.guilds.resolve(s);
                const voiceChannels = server.channels.cache.filter(c => c.type === "voice");
                var count = 0
                for (const [id, voiceChannel] of voiceChannels){
                    count += voiceChannel.members.size
                }
           
                    serverList.push({ "id": s.id, "name": s.name, "voiceUp": count, "icon": "https://cdn.discordapp.com/icons/" + s.id + "/" + s.icon})
                
            })
        } catch (e) { console.error(e) } finally {
          
            res.status(200).send(serverList)
        }

    } else { res.status(502).send({ code: 502, message: "Sadece Bearer Token desteklenmektedir." }) }


})

module.exports = router;