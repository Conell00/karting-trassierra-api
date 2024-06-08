import {Router} from 'express';
import {getTournaments,getTournament,getTournamentDate,getTournamentName,getTournamentsBeforeToday,getTournamentsAfterToday,addTournament,updateTournament,deleteTournament} from '../controllers/tournament.controller.js'

const router = Router();

 router.get('/torneos',getTournaments);
 router.get('/torneo/:id',getTournament);
 router.get('/torneoFecha/:fecha',getTournamentDate);
 router.get('/torneoNombre/:nombre',getTournamentName);
 router.get('/torneosTerminados',getTournamentsBeforeToday);
 router.get('/torneosPorTerminar',getTournamentsAfterToday);
 router.get('/torneos',getTournaments);
 router.post('/torneo',addTournament);
 router.patch('/torneo/:id',updateTournament);
 router.delete('/torneo/:id',deleteTournament);

 export default router; //Exportamos
