import express from 'express';
import cors from 'cors';
import config from './config.js';

import productRoute from './routes/productRoute.js';

const app = express();

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'));
app.get("/", (_, res) => res.send('Backend server running')); 
app.get("/test", (_, res) => res.json(["Hello world"]));

//routes
app.use('/api', productRoute);

const PORT = config.port;//gets its stuff from the config.js which in from .env
const HOST = config.host;
app.listen(PORT, ()=> console.log(`Server running @ http://${HOST}:${PORT}`));