const express = require('express');
const http = require('http');
const path = require('path');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const { JWTStrategy } = require('./utils/jwt');
const passport = require('passport');
const cors = require('cors');
const compression = require('compression');
const helmet = require('helmet');
const log4js = require('log4js');
const app = express();

require('dotenv').config();
require('./utils/mongoose-connect');
passport.use(JWTStrategy);


const { LOGS_PATH: logsPath, LOGS_FILE: logsFile } = process.env;

log4js.configure({
  appenders: {
    console: { type: 'console' },
    file: { type: 'file', filename: `${path.join(__dirname, logsPath, logsFile)}` },
    tasksLogFile: { type: 'file', filename: `${path.join(__dirname, logsPath, 'task_logs.log')}` },

  },
  categories: {
    api: { appenders: ['file'], level: 'all' },
    tasks: { appenders: ['tasksLogFile'], level: 'all' },
    default: { appenders: ['console'], level: 'info' }
  }
});

const logger = log4js.getLogger('default');

const port = 8000;

app.set('port', port);
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(log4js.connectLogger(logger, { level: 'info' }));

app.get('/', function (req, res) {
  res.send("hello success");
})

app.use(helmet());
app.use(compression());
app.use(express.static(path.join(__dirname, 'public')));
app.use(
  cors({
    origin: '*',
    methods: 'GET, HEAD, PUT, PATCH, POST, DELETE',
  }),
);

app.use(passport.initialize());
    //this.express.use(rateLimiterMiddleware);

// app.use(bodyParser.json({limit: '500mb'}));
// app.use(bodyParser.urlencoded({limit: '500mb', extended: true}));
app.use(bodyParser.json({limit: '900mb', type:'application/json'}));
app.use(bodyParser.urlencoded({ limit: '900mb', extended: true }));
app.use(cookieParser());

const router = require ('./routers');
const ioAllowedOrigins = ["http://localhost:3000"];

var corsOptions = {
  origin: function (origin, callback) {
    if (ioAllowedOrigins.indexOf(origin) !== -1) {
      callback(null, true)
    } else {
      callback(new Error('Not allowed by CORS'))
    }
  }
}

// app.use('/api', cors(corsOptions), router);
// test api postman
app.use(function (req, res, next) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Credentials", "true");
  res.setHeader("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE,PATCH,OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers");
  next();
});

app.use('/', router);
app.listen(port, function () {
  console.log(`Server is listening on ${port}`);
});

