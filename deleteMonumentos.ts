import { Request, Response } from "npm:express@4.18.2";
import monumentModel from "./monumentos.ts";

const deleteMonument = async (req: Request, res: Response) => {
  try {
    const { name } = req.params;
    const monument = await monumentModel.findOneAndDelete({ name }).exec();
    if (!monument) {
      res.status(404).send("monument not found");
      return;
    }
    res.status(200).send("monument deleted");
  } catch (error) {
    res.status(404).send(error.message);
    return;
  }
};

export default deleteMonument;
