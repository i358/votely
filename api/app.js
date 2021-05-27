var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const socket = require("socket.io");
const Discord = require('discord.js')
const client = global.client = new Discord.Client()
const http = require('http')
var app = express();
var server = http.createServer(app);
const io = socket(server);
client.login(global.config.CLIENT.TOKEN).catch(console.error)
var apiRouter = require('./routes/api');

app.set('view engine', 'ejs')
app.set('views', __dirname+"/views");
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');
    next();
}); 

io.on("connection", (socket)=>{

  client.on("voiceStateUpdate", (oldState, newState) => {
    var server = client.guilds.resolve(oldState.guild.id);
    const voiceChannels = server.channels.cache.filter(c => c.type === "voice");
    var count = 0
    for (const [id, voiceChannel] of voiceChannels){
        count += voiceChannel.members.size
    }
    var dt =  {gid:oldState.guild.id, newCount:count}
    console.log("New Voice Update ",dt)
    socket.broadcast.emit("updateVoice", dt)
  
})
}) 

app.use('/api', apiRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

server.listen(3300);

module.exports = app;
