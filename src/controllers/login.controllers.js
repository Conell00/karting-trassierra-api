import { SECRET } from "../config.js";
SECRET
import jwt from 'jsonwebtoken';

export const postLogin=(req, res)=>{
    //recoger el body (username y password)
    //
    const {username, password}=req.body;
    //conexión y verifica que usuario y contraseña están en la tabla usuarios
        //crear el payLoad para el token
        const payload={
            usuario:username
        }
        //generar el token
        const token=jwt.sign(payload,SECRET,{expiresIn:'1h'});
        res.status(200).json(token)

}
