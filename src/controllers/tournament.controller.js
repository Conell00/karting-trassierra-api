import conexion from "../mySql_conector.js"

//Obtener todos los torneos

export const getTournaments = async(req, res)=>{
    try {
    const [result] = await conexion.query('SELECT * FROM torneos');
    console.log(result);
    res.status(200).json(result);
    } catch (error) {
       res.status(500).json({
        message:'Error en el servidor'
       })
    }
};

//Obtener torneo por id

export const getTournament = async(req, res)=>{
    try {
        console.log(req.params);
        const [result] = await conexion.query('SELECT * FROM torneos WHERE id=?',[req.params.id]);
        console.log(result);
        res.status(200).json(result[0]); //La respuesta que devuelve el servidor
    } catch (error) {
        res.status(500).json({
            message:'Error en el servidor'
           });
    }
  };

//Obtener torneos por fecha

export const getTournamentDate = async(req, res)=>{
    try {
        console.log(req.params);
        const [result] = await conexion.query('SELECT * FROM torneos WHERE fecha=?',[req.params.fecha]);
        console.log(result);
        res.status(200).json(result); //La respuesta que devuelve el servidor
    } catch (error) {
        res.status(500).json({
            message:'Error en el servidor'
           });
    }
  };

//Obtener torneo por nombre

export const getTournamentName = async(req, res)=>{
    try {
        console.log(req.params);
        const [result] = await conexion.query('SELECT * FROM torneos WHERE nombre=?',[req.params.nombre]);
        console.log(result);
        res.status(200).json(result[0]); //La respuesta que devuelve el servidor
    } catch (error) {
        res.status(500).json({
            message:'Error en el servidor'
           });
    }
  };

  //Obtener torneos ya realizados

  export const getTournamentsBeforeToday = async(req, res)=>{
    try {
    const [result] = await conexion.query('SELECT * FROM torneos WHERE fecha < CURDATE() OR (fecha = CURDATE() AND hora < CURTIME());');
    console.log(result);
    res.status(200).json(result);
    } catch (error) {
       res.status(500).json({
        message:'Error en el servidor'
       })
    }
};

export const getTournamentsAfterToday = async(req, res)=>{
    try {
    const [result] = await conexion.query('SELECT * FROM torneos WHERE fecha > CURDATE() OR (fecha = CURDATE() AND hora > CURTIME());');
    console.log(result);
    res.status(200).json(result);
    } catch (error) {
       res.status(500).json({
        message:'Error en el servidor'
       })
    }
};

//Crear torneo

export const addTournament=async(req,res)=>{
    try {
        console.log(req.body);
    const {nombre,fecha,hora,descripcion,descripcion_en,imagen} = req.body;
    const [result] = await conexion.query('INSERT INTO torneos (nombre,fecha,hora,descripcion,descripcion_en,imagen) VALUES (?,?,?,?,?,?)',[nombre,fecha,hora,descripcion,descripcion_en,imagen]);
    console.log(result);
    res.status(201).json({id:result.insertId});
    } catch (error) {
        res.status(500).json({
            message:'Error en el servidor'
           });
    }
 }

 //Editar torneo

 export const updateTournament=async(req,res)=>{
    try {
        const {nombre,fecha,hora,descripcion,descripcion_en,imagen} = req.body;
    const [result] = await conexion.query('UPDATE torneos SET nombre=IFNULL(?,nombre),fecha=IFNULL(?,fecha),hora=IFNULL(?,hora),descripcion=IFNULL(?,descripcion),descripcion_en=IFNULL(?,descripcion_en),imagen=IFNULL(?,imagen) WHERE id=?' , [nombre,fecha,hora,descripcion,descripcion_en,imagen,req.params.id]);
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

 //Borrar Torneo

 export const deleteTournament = async(req,res)=>{
    try {
        const [result] = await conexion.query('DELETE FROM torneos WHERE id=?',[req.params.id]);
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

