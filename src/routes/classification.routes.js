import {Router} from 'express';
import {getAllClassification,getClassificationRace,getClassificationsUser,getClassificationTourUser,addClassification,updateClassification,deleteClassification} from '../controllers/classification.controller.js'

const router = Router();

router.get('/clasificaciones',getAllClassification);
router.get('/clasificacionCarrera/:id_carrera',getClassificationRace);
router.get('/clasificacionesParticipante/:id_participante',getClassificationsUser);
router.get('/clasificacionCarreraParticipante/:id_carrera/:id_participante',getClassificationTourUser);
router.post('/clasificacion',addClassification);
router.patch('/clasificacion/:id',updateClassification);
router.delete('/clasificacion/:id',deleteClassification);

export default router; //Exportamos
