import conexion from "../mySql_conector.js"

//Obtener todas los mensajes

export const getAllMessage = async(req, res)=>{
    try {
    const [result] = await conexion.query('SELECT * FROM mensajes');
    console.log(result);
    res.status(200).json(result);
    } catch (error) {
       res.status(500).json({
        message:'Error en el servidor'
       })
    }
};

//Obtener los mensajes de un usuario

export const getMessagesUser = async(req, res)=>{
        try {
            console.log(req.params);
            const [result] = await conexion.query('SELECT * FROM mensajes WHERE id_participante=?',[req.params.id_participante]);
            console.log(result);
            res.status(200).json(result); //La respuesta que devuelve el servidor
        } catch (error) {
            res.status(500).json({
                message:'Error en el servidor'
               });
        }
      };

  //Añadir mensaje

  export const addMessage=async(req,res)=>{
    try {
        console.log(req.body);
    const {id_participante,cuerpo,cuerpo_en} = req.body;
    const [result] = await conexion.query('INSERT INTO mensajes (id_participante,cuerpo,cuerpo_en) VALUES (?,?,?)',[id_participante,cuerpo,cuerpo_en]);
    console.log(result);
    res.status(201).json({id:result.insertId});
    } catch (error) {
        res.status(500).json({
            message:'Error en el servidor'
           });
    }
 }

 //Borrar mensaje

 export const deleteMessage = async(req,res)=>{
    try {
        const [result] = await conexion.query('DELETE FROM mensajes WHERE id=?',[req.params.id]);
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