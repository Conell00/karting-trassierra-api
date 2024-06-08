
import {Router} from 'express';
import {getUsers,getUser,getUsersRol,getUserLogin,getUserRegister,getAllUsersTopPoints,getUsersTopPoints,getUsersTopTournaments,getUsersTopRaces,getUsersPodiums,addUser,updateUser,deleteUser} from '../controllers/user.controller.js';

const router = Router();

 router.get('/usuarios',getUsers);
 router.get('/usuario/:id',getUser);
 router.get('/usuarios/:rol',getUsersRol);
 router.get('/usuario/:email/:contra',getUserLogin);
 router.get('/usuarioEmail/:email',getUserRegister);
 router.get('/usuariosAllPoints',getAllUsersTopPoints);
 router.get('/usuariosPoints',getUsersTopPoints);
 router.get('/usuariosTours',getUsersTopTournaments);
 router.get('/usuariosRaces',getUsersTopRaces);
 router.get('/usuariosPodiums',getUsersPodiums);
 router.post('/usuario',addUser);
 router.patch('/usuario/:id',updateUser);
 router.delete('/usuario/:id',deleteUser);

export default router; //Exportamos