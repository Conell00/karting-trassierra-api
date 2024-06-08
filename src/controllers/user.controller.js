import conexion from "../mySql_conector.js"
import {encrypt,compare} from "../helpers/handleBcrypt.js"
//Obtener todos los usuarios

export const getUsers = async(req, res)=>{
    try {
    const [result] = await conexion.query('SELECT * FROM usuarios');
    console.log(result);
    res.status(200).json(result);
    } catch (error) {
       res.status(500).json({
        message:'Error en el servidor'
       })
    }
};

//Obtener usuarios según su rol

export const getUsersRol = async(req, res)=>{
    try {
        console.log(req.params);
        const [result] = await conexion.query('SELECT * FROM usuarios WHERE rol=?',[req.params.rol]);
        console.log(result);
        res.status(200).json(result); //La respuesta que devuelve el servidor
    } catch (error) {
        res.status(500).json({
            message:'Error en el servidor'
           });
    }
  };

//Obtener usuario por id

export const getUser = async(req, res)=>{
    try {
        console.log(req.params);
        const [result] = await conexion.query('SELECT * FROM usuarios WHERE id=?',[req.params.id]);
        console.log(result);
        res.status(200).json(result[0]); //La respuesta que devuelve el servidor
    } catch (error) {
        res.status(500).json({
            message:'Error en el servidor'
           });
    }
  };

//Obtener usuario si email y contraseña coinciden (iniciar sesión)

export const getUserLogin = async(req, res)=>{
    try {
        console.log(req.params);
        const [resultEmail] = await conexion.query('SELECT * FROM usuarios WHERE email=?',[req.params.email]);
        if (resultEmail != '') {
        const checkContra = await compare(req.params.contra,resultEmail[0].contra)
        console.log(checkContra);
        if (checkContra) {
          res.status(200).json(resultEmail[0]) //La respuesta que devuelve el servidor
        }else{
            res.status(409).json({
                message:'contraseña incorrecta'
            })
        }
        }else{
            res.status(404).json({
                message:'Usuario no encontrado'
               });
        }
    } catch (error) {
        res.status(500).json({
            message:'Error en el servidor'
           });
    }
  };

  //Obtener usuario si email coincide (Comprobar que no existe antes de crear un nuevo usuario)

  export const getUserRegister = async(req, res)=>{
    try {
        console.log(req.params);
        const [result] = await conexion.query('SELECT * FROM usuarios WHERE email=?',[req.params.email]);
        console.log(result);
        res.status(200).json(result[0]); //La respuesta que devuelve el servidor
    } catch (error) {
        res.status(500).json({
            message:'Error en el servidor'
           });
    }
  };

  //Obtener todos los usuarios ordenados por puntos

  export const getAllUsersTopPoints = async(req, res)=>{
    try {
    const [result] = await conexion.query('SELECT * FROM usuarios WHERE rol = "participante" ORDER BY puntos DESC');
    console.log(result);
    res.status(200).json(result);
    } catch (error) {
       res.status(500).json({
        message:'Error en el servidor'
       })
    }
};

 //Obtener los 5 usuarios que más puntos tienen

 export const getUsersTopPoints = async(req, res)=>{
    try {
    const [result] = await conexion.query('SELECT * FROM usuarios WHERE rol = "participante" ORDER BY puntos DESC LIMIT 5;');
    console.log(result);
    res.status(200).json(result);
    } catch (error) {
       res.status(500).json({
        message:'Error en el servidor'
       })
    }
};

//Obtener los 5 usuarios que más torneos ganados tienen

export const getUsersTopTournaments = async(req, res)=>{
    try {
    const [result] = await conexion.query('SELECT * FROM usuarios WHERE rol = "participante" ORDER BY torneos_ganados DESC LIMIT 5;');
    console.log(result);
    res.status(200).json(result);
    } catch (error) {
       res.status(500).json({
        message:'Error en el servidor'
       })
    }
};


//Obtener los 5 usuarios que más carreras ganadas tienen

export const getUsersTopRaces = async(req, res)=>{
    try {
    const [result] = await conexion.query('SELECT * FROM usuarios WHERE rol = "participante" ORDER BY carreras_ganadas DESC LIMIT 5;');
    console.log(result);
    res.status(200).json(result);
    } catch (error) {
       res.status(500).json({
        message:'Error en el servidor'
       })
    }
};

//Obtener los 5 usuarios que más podios tienen

export const getUsersPodiums = async(req, res)=>{
    try {
    const [result] = await conexion.query('SELECT * FROM usuarios WHERE rol = "participante" ORDER BY podios DESC LIMIT 5;');
    console.log(result);
    res.status(200).json(result);
    } catch (error) {
       res.status(500).json({
        message:'Error en el servidor'
       })
    }
};

//Crear nuevo usuario

export const addUser=async(req,res)=>{
    try {
        console.log(req.body);
    const {nombre,email,contra,rol} = req.body;
    const contraHash = await encrypt(contra)
    const [result] = await conexion.query('INSERT INTO usuarios (nombre,email,contra,rol,torneos_ganados,puntos,podios,carreras_ganadas) VALUES (?,?,?,?,0,0,0,0)',[nombre,email,contraHash,rol]);
    console.log(result);
    res.status(201).json({id:result.insertId});
    } catch (error) {
        res.status(500).json({
            message:'Error en el servidor'
           });
    }
 }

 //Editar usuario

 export const updateUser=async(req,res)=>{
    try {
        const {nombre,email,contra,rol,torneos_ganados,puntos,podios,carreras_ganadas} = req.body;
        const contraHash = null;
        if (contra!=undefined) {
             contraHash = await encrypt(contra)
        }
    const [result] = await conexion.query('UPDATE usuarios SET nombre=IFNULL(?,nombre),email=IFNULL(?,email),contra=IFNULL(?,contra),rol=IFNULL(?,rol),torneos_ganados=IFNULL(?,torneos_ganados),puntos=IFNULL(?,puntos),podios=IFNULL(?,podios),carreras_ganadas=IFNULL(?,carreras_ganadas) WHERE id=?' , [nombre,email,contraHash,rol,torneos_ganados,puntos,podios,carreras_ganadas,req.params.id]);
    console.log(result);
    if (result.affectedRows < 1) {
        return res.status(400).json({
            message: 'No existe'
        })
    }else{
        return res.status(200).json({
            message: 'Ha sido actualizado'
        })
    }
    } catch (error) {
        res.status(500).json({
            message:'Error en el servidor'
           });
    }
 }


//Borrar usuario

export const deleteUser = async(req,res)=>{
        try {
            const [result] = await conexion.query('DELETE FROM usuarios WHERE id=?',[req.params.id]);
            console.log(result.affectedRows);
            if (result.affectedRows < 1) {
                return res.status(400).json({
                    message: 'No existe'
                })
            }else{
                return res.status(200).json({
                    message: 'Ha sido borrado'
                })
            }
        } catch (error) {
            res.status(500).json({
                message:'Error en el servidor'
               });
        }
     }

