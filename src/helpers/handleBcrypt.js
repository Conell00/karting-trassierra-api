import bycrypt from 'bcryptjs';

//Encriptar contraseña

export const encrypt = async(contra)=>{
    const hash = await bycrypt.hash(contra,10)
    return hash
}

export const compare = async(contra,hashContra)=>{
    return await bycrypt.compare(contra,hashContra)
}