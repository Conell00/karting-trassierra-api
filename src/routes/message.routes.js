import {Router} from 'express';
import {getAllMessage,getMessagesUser,addMessage,deleteMessage} from '../controllers/message.controller.js'

const router = Router();

 router.get('/mensajes',getAllMessage);
 router.get('/mensajes/:id_participante',getMessagesUser);
 router.post('/mensaje',addMessage);
 router.delete('/mensaje/:id',deleteMessage);

 export default router; //Exportamos