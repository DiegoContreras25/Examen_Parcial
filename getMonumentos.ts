import { Request, Response } from "npm:express@4.18.2";
import monumentModel from "./monumentos.ts";

const getMonumentos = async (req: Request, res: Response) => {
  try {
    // Puedes obtener todos los monumentos en lugar de uno solo
    const monumentos = await monumentModel.find().exec();

    if (!monumentos || monumentos.length === 0) {
      res.status(404).send("Productos no encontrados");
      return;
    }

    // Devuelve la lista de productos
    const monumentData = monumentos.map((monument) => ({
      name: monument.name,

      ISO: monument.ISO,
    }));

    res.status(200).json(monumentData);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

export default getMonumentos;
