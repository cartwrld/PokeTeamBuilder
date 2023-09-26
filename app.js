const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const hbs = require('hbs');

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const pokedexRouter = require('./routes/pokedex'); // using the pokedex.js file

const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

// registering the views/partials folder to keep track of components
hbs.registerPartials(path.join(__dirname, 'views', 'partials'));

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/pokedex', pokedexRouter); // This is what determines the path name

// bootswatch styles
app.use('/bw', express.static(__dirname + '/node_modules/bootswatch/dist'));

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

// Discord Bot Added?


// Discord Bot Integration
const {Client, GatewayIntentBits} = require('discord.js');
const bodyParser = require('body-parser');
require('dotenv').config();

const client = new Client({
  intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages],
});

app.use(bodyParser.json());

client.login(process.env.DISCORD_BOT_TOKEN);

// Replace 'YOUR_DISCORD_CHANNEL_ID' with the actual channel ID
const targetChannelId = process.env.DISCORD_CHANNEL_ID;

app.post('/github-webhook', (req, res) => {
  const {body} = req;

  if (body && body.ref === 'refs/heads/main') {
    const repoName = body.repository.full_name;
    const commitMessage = body.commits[0].message;

    // Get the Discord channel by ID
    const targetChannel = client.channels.cache.get(targetChannelId);
    console.log(targetChannel);
    if (targetChannel && targetChannel.isText()) {
      // Send the message to the specified Discord channel
      targetChannel.send(`New commit to ${repoName}: ${commitMessage}`);
    }
  }
  // ? // //
  res.sendStatus(200);
});

client.once('ready', () => {
  console.log(`Logged in as ${client.user.tag}`);
});

// ////

module.exports = app;
