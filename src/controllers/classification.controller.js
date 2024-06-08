import conexion from "../mySql_conector.js"

//Obtener todas las clasificaciones

export const getAllClassification = async(req, res)=>{
    try {
    const [result] = await conexion.query('SELECT * FROM clasificaciones');
    console.log(result);
    res.status(200).json(result);
    } catch (error) {
       res.status(500).json({
        message:'Error en el servidor'
       })
    }
};

//Obtener la clasificación de un torneo

export const getClassificationRace = async(req, res)=>{
        try {
            console.log(req.params);
            const [result] = await conexion.query('SELECT * FROM clasificaciones WHERE id_carrera=? ORDER BY posicion ASC;',[req.params.id_carrera]);
            console.log(result);
            res.status(200).json(result); //La respuesta que devuelve el servidor
        } catch (error) {
            res.status(500).json({
                message:'Error en el servidor'
               });
        }
      };
 //Obtener la clasificación de un usuario en una determinada carrera
export const getClassificationTourUser = async(req, res)=>{
    try {
        console.log(req.params);
        const [result] = await conexion.query('SELECT * FROM clasificaciones WHERE id_carrera=? AND id_participante=?',[req.params.id_carrera,req.params.id_participante]);
        console.log(result);
        res.status(200).json(result[0]) //La respuesta que devuelve el servidor
    } catch (error) {
        res.status(500).json({
            message:'Error en el servidor'
               });
        }
      };

//Obtener todas las clasificaciones de un participante

export const getClassificationsUser = async(req, res)=>{
    try {
        console.log(req.params);
        const [result] = await conexion.query('SELECT * FROM clasificaciones WHERE id_participante=? ORDER BY posicion ASC;',[req.params.id_participante]);
        console.log(result);
        res.status(200).json(result); //La respuesta que devuelve el servidor
    } catch (error) {
        res.status(500).json({
            message:'Error en el servidor'
           });
    }
  };

  //Añadir participación de un participante

  export const addClassification=async(req,res)=>{
    try {
        console.log(req.body);
    const {id_carrera,id_participante} = req.body;
    const [result] = await conexion.query('INSERT INTO clasificaciones (id_carrera,id_participante,posicion) VALUES (?,?,NULL)',[id_carrera,id_participante]);
    console.log(result);
    res.status(201).json({id:result.insertId});
    } catch (error) {
        res.status(500).json({
            message:'Error en el servidor'
           });
    }
 }
 //Actualizar resultados de la carrera
 export const updateClassification=async(req,res)=>{
    try {
        const {id_carrera,id_participante,posicion} = req.body;
    const [result] = await conexion.query('UPDATE clasificaciones SET id_carrera=IFNULL(?,id_carrera),id_participante=IFNULL(?,id_participante),posicion=IFNULL(?,posicion) WHERE id=?' , [id_carrera,id_participante,posicion,req.params.id]);
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

 //Borrar participación de un participante

 export const deleteClassification = async(req,res)=>{
    try {
        const [result] = await conexion.query('DELETE FROM clasificaciones WHERE id=?',[req.params.id]);
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