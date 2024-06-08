import {Router} from 'express';
import {getRaces,getRace,getRacesNotedTour,getRacesTour,getRacesAnnotator,getRacesCircuit,getRacesDate,addRace,deleteRace,updateRace} from '../controllers/race.controller.js'

const router = Router();

 router.get('/carreras',getRaces);
 router.get('/carrera/:id',getRace);
 router.get('/carrerasAnotada/:id_torneo/:anotado',getRacesNotedTour);
 router.get('/carrerasTorneo/:id_torneo',getRacesTour);
 router.get('/carrerasAnotador/:id_anotador',getRacesAnnotator);
 router.get('/carrerasCircuito/:id_circuito',getRacesCircuit);
 router.get('/carrerasFecha/:fecha',getRacesDate);
 router.post('/carrera',addRace);
 router.patch('/carrera/:id',updateRace);
 router.delete('/carrera/:id',deleteRace);

 export default router; //Exportamos