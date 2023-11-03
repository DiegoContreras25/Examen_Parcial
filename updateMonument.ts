import { Request, Response } from "npm:express@4.18.2";
import monumentModel from "./monumentos.ts";

const updateMonument = async (req: Request, res: Response) => {
  try {
    const { name } = req.params;
    const { description, postal_code, ISO } = req.body;
    if (!name || !description || !postal_code || !ISO) {
      res.status(400).send("Name description postal code y ISO are required");
      return;
    }

    const updateMonument = await monumentModel.findOneAndUpdate(
      { name },
      { description, postal_code, ISO },
      { new: true },
    ).exec();

    if (!updateMonument) {
      res.status(404).send("monument not found");
      return;
    }

    res.status(200).send({
      name: updateMonument.name,
      description: updateMonument.description,
      postal_code: updateMonument.postal_code,
      ISO: updateMonument.ISO,
    });
  } catch (error) {
    res.status(500).send(error.message);
    return;
  }
};

export default updateMonument;
