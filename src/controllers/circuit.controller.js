import conexion from "../mySql_conector.js"

//Obtener todos los circuitos

export const getCircuits = async(req, res)=>{
    try {
    const [result] = await conexion.query('SELECT * FROM circuitos');
    console.log(result);
    res.status(200).json(result);
    } catch (error) {
       res.status(500).json({
        message:'Error en el servidor'
       })
    }
};

//Obtener circuito por id

export const getCircuit = async(req, res)=>{
    try {
        console.log(req.params);
        const [result] = await conexion.query('SELECT * FROM circuitos WHERE id=?',[req.params.id]);
        console.log(result);
        res.status(200).json(result[0]); //La respuesta que devuelve el servidor
    } catch (error) {
        res.status(500).json({
            message:'Error en el servidor'
           });
    }
  };

//Crear circuito

export const addCircuit=async(req,res)=>{
    try {
        console.log(req.body);
    const {distancia,nombre,localizacion,imagen,imagen_trazado,descripcion,descripcion_en} = req.body;
    const [result] = await conexion.query('INSERT INTO circuitos (distancia,nombre,localizacion,imagen,imagen_trazado,descripcion,descripcion_en) VALUES (?,?,?,?,?,?,?)',[distancia,nombre,localizacion,imagen,imagen_trazado,descripcion,descripcion_en]);
    console.log(result);
    res.status(201).json({id:result.insertId});
    } catch (error) {
        res.status(500).json({
            message:'Error en el servidor'
           });
    }
 }

 //Editar circuito

 export const updateCircuit=async(req,res)=>{
        try {
            const {distancia,nombre,localizacion,imagen,imagen_trazado,descripcion,descripcion_en} = req.body;
        const [result] = await conexion.query('UPDATE circuitos SET distancia=IFNULL(?,distancia),nombre=IFNULL(?,nombre),localizacion=IFNULL(?,localizacion),imagen=IFNULL(?,imagen),imagen_trazado=IFNULL(?,imagen_trazado),descripcion=IFNULL(?,descripcion),descripcion_en=IFNULL(?,descripcion_en) WHERE id=?' , [distancia,nombre,localizacion,imagen,imagen_trazado,descripcion,descripcion_en,req.params.id]);
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

 //Borrar circuito

 export const deleteCircuit = async(req,res)=>{
    try {
        const [result] = await conexion.query('DELETE FROM circuitos WHERE id=?',[req.params.id]);
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