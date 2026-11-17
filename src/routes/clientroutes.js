import express from 'express';
import {createClient,getAllclients,getClientById,updateClient}from'../controllers/clientController.js'
const clientRoutes = express.Router();

clientRoutes.post("/create", createClient);
clientRoutes.get('/getAll',getAllclients);
clientRoutes.get('/:id',getClientById)
clientRoutes.put('./update',updateClient);
export default clientRoutes;