import conexion from "../mySql_conector.js"

//Obtener todas las carreras

export const getRaces = async(req, res)=>{
    try {
    const [result] = await conexion.query('SELECT * FROM carreras');
    console.log(result);
    res.status(200).json(result);
    } catch (error) {
       res.status(500).json({
        message:'Error en el servidor'
       })
    }
};

//Obtener carrera por id

export const getRace = async(req, res)=>{
    try {
        console.log(req.params);
        const [result] = await conexion.query('SELECT * FROM carreras WHERE id=?',[req.params.id]);
        console.log(result);
        res.status(200).json(result[0]); //La respuesta que devuelve el servidor
    } catch (error) {
        res.status(500).json({
            message:'Error en el servidor'
           });
    }
  };

  //Obtener carreras por si está anotada o no

  export const getRacesNotedTour = async(req, res)=>{
    try {
        console.log(req.params);
        const [result] = await conexion.query('SELECT * FROM carreras WHERE id_torneo=? AND anotado=?',[req.params.id_torneo,req.params.anotado]);
        console.log(result);
        res.status(200).json(result); //La respuesta que devuelve el servidor
    } catch (error) {
        res.status(500).json({
            message:'Error en el servidor'
           });
    }
  };

  //Obtener carreras dependiendo de torneo

  export const getRacesTour = async(req, res)=>{
    try {
        console.log(req.params);
        const [result] = await conexion.query('SELECT * FROM carreras WHERE id_torneo=?',[req.params.id_torneo]);
        console.log(result);
        res.status(200).json(result); //La respuesta que devuelve el servidor
    } catch (error) {
        res.status(500).json({
            message:'Error en el servidor'
           });
    }
  };

  //Obtener carreras dependiendo de circuito

  export const getRacesCircuit = async(req, res)=>{
    try {
        console.log(req.params);
        const [result] = await conexion.query('SELECT * FROM carreras WHERE id_circuito=?',[req.params.id_circuito]);
        console.log(result);
        res.status(200).json(result); //La respuesta que devuelve el servidor
    } catch (error) {
        res.status(500).json({
            message:'Error en el servidor'
           });
    }
  };

  //Obtener carreras por anotador

  export const getRacesAnnotator = async(req, res)=>{
    try {
        console.log(req.params);
        const [result] = await conexion.query('SELECT * FROM carreras WHERE id_anotador=?',[req.params.id_anotador]);
        console.log(result);
        res.status(200).json(result); //La respuesta que devuelve el servidor
    } catch (error) {
        res.status(500).json({
            message:'Error en el servidor'
           });
    }
  };

  //Obtener carreras por fecha

  export const getRacesDate = async(req, res)=>{
    try {
        console.log(req.params);
        const [result] = await conexion.query('SELECT * FROM carreras WHERE fecha=?',[req.params.fecha]);
        console.log(result);
        res.status(200).json(result); //La respuesta que devuelve el servidor
    } catch (error) {
        res.status(500).json({
            message:'Error en el servidor'
           });
    }
  };

  //Crear nueva carrera

  export const addRace=async(req,res)=>{
    try {
        console.log(req.body);
    const {id_torneo,id_circuito} = req.body;
    const [result] = await conexion.query('INSERT INTO carreras (id_torneo,id_circuito,anotado) VALUES (?,?,0)',[id_torneo,id_circuito]);
    console.log(result);
    res.status(201).json({id:result.insertId});
    } catch (error) {
        res.status(500).json({
            message:'Error en el servidor'
           });
    }
 }

 //Editar carrera

 export const updateRace=async(req,res)=>{
    try {
        const {id_torneo,id_circuito,anotado} = req.body;
    const [result] = await conexion.query('UPDATE carreras SET id_torneo=IFNULL(?,id_torneo),id_circuito=IFNULL(?,id_circuito),anotado=IFNULL(?,anotado) WHERE id=?' , [id_torneo,id_circuito,anotado,req.params.id]);
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

 //Borrar carrera

 export const deleteRace = async(req,res)=>{
    try {
        const [result] = await conexion.query('DELETE FROM carreras WHERE id=?',[req.params.id]);
         res.status(200).json(result);
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
