import { fileURLToPath } from "url";
import { dirname } from "path";
const __fileName = fileURLToPath(import.meta.url); // obtiene la url de donde se esta ejecutando el archivo
const __dirname = dirname(__fileName); // obtiene el directorio de donde se esta ejecutando el archivo

export default __dirname;
