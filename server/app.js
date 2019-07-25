import path from 'path';
import express from 'express';
import bodyParser  from 'body-parser';
import cors from 'cors';

import routes from './routes';
import models from './models';

require('dotenv').config({ silent: true });
const history = require('connect-history-api-fallback')

const app = express();
const router = express.Router();

routes(router);

const headers1 = 'Origin, X-Requested-With, Content-Type, Accept';
const headers2 = 'Authorization, Access-Control-Allow-Credentials, x-access-token';

const whitelist = [process.env.CLIENT_URL, process.env.PROD_CLIENT_URL];
const corsOptionsDelegate = (req, callback) => {
  let corsOptions;
  if (whitelist.indexOf(req.header('Origin')) !== -1) {
    corsOptions = { origin: true };
  } else if (process.env.NODE_ENV === 'production') {
    corsOptions = { origin: true };
  } else {
    corsOptions = { origin: false };
  }
  callback(null, corsOptions);
};

const publicPath = path.join(__dirname + '/../dist');

app.use(express.static(publicPath))
app.use(history())
app.use(express.static(publicPath))

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const clientHeaderOrigin = process.env.CLIENT_URL;
app.use(cors(corsOptionsDelegate));
app.use((req, res, next) => {
  const origin = req.headers.origin;
  res.header('Access-Control-Allow-Origin', clientHeaderOrigin);
  res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.header('Access-Control-Allow-Headers', `${headers1},${headers2}`);
  res.header('Access-Control-Allow-Credentials', 'true');
  next();
});

app.use('/api', router);
app.get('/', function(req, res) {
  res.render(path.join(__dirname + '/../dist/index.html'));
});

const port = process.env.PORT || 5600;

models.sequelize.sync().then(() => {
  console.log('Database server synced');
}).catch((error) => {
  console.log(error)
  console.log('Database server could not be synced');
})

app.listen(port, () => {
  console.log(`App started on port: ${port}`)
});

export default app;