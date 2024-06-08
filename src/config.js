import { config } from "dotenv";
config(); //Leer variables de entorno.

//Para leer las variables de entorno se utiliza el objeto procces de node.js
//Utilizar la propiedad env, donde se almacena las variables del dispositivo
// console.log(process.env.PORT);
// console.log(process.env.DB_USER);
// console.log(process.env.DB_HOST);
// console.log(process.env.DB_PORT);
// console.log(process.env.DB_PASSWORD);
// console.log(process.env.DB_DATABASE);

/**
 * LO CORRECTO SERÍA:
 */

export const PORT = process.env.PORT || 3000
export const DB_PORT = process.env.DB_PORT || 3306
export const DB_HOST = process.env.DB_HOST || 'localhost'
export const DB_USER= process.env.DB_USER || 'root'
export const DB_PASSWORD= process.env.DB_PASSWORD || ''
export const DB_DATABASE= process.env.DB_DATABASE || 'karting'
export const SECRET= process.env.SECRET ||"ejemploJwt2024"





