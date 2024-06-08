import {Router} from 'express';

import {getCircuits,getCircuit,addCircuit,deleteCircuit,updateCircuit} from '../controllers/circuit.controller.js'

const router = Router();

router.get('/circuitos',getCircuits);
router.get('/circuito/:id',getCircuit);
router.post('/circuito',addCircuit);
router.patch('/circuito/:id',updateCircuit);
router.delete('/circuito/:id',deleteCircuit);

export default router; //Exportamos

