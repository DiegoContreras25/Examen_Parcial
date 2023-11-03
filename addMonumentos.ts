import { Request, Response } from "npm:express@4.18.2";
import monumentModel from "./monumentos.ts";

const addMonumentos = async (req: Request, res: Response) => {
  try {
    const { name, description, postal_code, ISO } = req.body;
    if (!name || !description || !postal_code || !ISO) {
      res.status(500).send(
        "Name, description, postal_code and iso are required",
      );
      return;
    }

    const alreadyExists = await monumentModel.findOne({ name }).exec();
    if (alreadyExists) {
      res.status(400).send("monument already exists");
      return;
    }

    const newMonument = new monumentModel({
      name,
      description,
      postal_code,
      ISO,
    });
    await newMonument.save();

    res.status(200).send({
      name: newMonument.name,
      description: newMonument.description,
      postal_code: newMonument.postal_code,
      ISO: newMonument.ISO,
    });
  } catch (error) {
    res.status(501).send(error.message);
    return;
  }
};

export default addMonumentos;
