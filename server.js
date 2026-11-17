import express from 'express';
import clientroutes from './src/routes/clientroutes.js';
import userroutes from "./src/routes/userroutes.js";
import 'dotenv/config';
import {testConnection} from './src/config/db.js'

const app= express();
app.use(express.json());
const port= process.env.PORT;

//define routes from clients routes
app.use('/clients',clientroutes)
/* check DB first (this top-leve await works
in ES6 modules) */

//define routes from users routes
app.use('/users',userroutes)


await testConnection();
app.listen(port,()=>{
    console.log(`our server is running at http://localhost:${port}`);
});