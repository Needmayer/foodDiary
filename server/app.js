import express from 'express';
import expressValidator from 'express-validator';
import mongoose from 'mongoose';
import morgan from 'morgan';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import path from 'path';
import sessionMangementConfig from './configurations/sessionManagementConfig.js';
import { getMongoConnection } from './configurations/serverSettings.js';
import router from './api';
import reload from 'reload';
import cors from 'cors';

const port = (process.env.PORT || 3000);
const app = express();
const mongoLink = getMongoConnection();

mongoose.Promise = global.Promise;
mongoose.set('useCreateIndex', true);
mongoose.set('useFindAndModify', false);
mongoose.connect(mongoLink, { useNewUrlParser: true });
let db = mongoose.connection;
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(expressValidator());
sessionMangementConfig(app, db);

const corsOptions = {
  origin: ['http://localhost:8080'],
  methods: ['GET', 'POST', 'PUT'],
  credentials: true
};


app.use(cors(corsOptions));
app.use('/api', router);
app.use(express.static(path.resolve(__dirname, '../static')));

app.use(morgan('dev'));

app.use(function (req, res, next) {
  const err = new Error('Not Found');
  err.status = 404;
  res.json(err);
});

db.on('error', console.error.bind(console, 'connection error:'))
db.once('open', function () {
  console.log('Connected to MongoDB')

  app.listen(port, function (err) {
    if (err) {
      console.log(err);
    } else {
      console.log("App listening on port " + port);
    }
  });
})

reload(app);
