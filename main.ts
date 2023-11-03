import express from "npm:express@4.18.2";
import mongoose from "npm:mongoose@7.6.3";

import getMonumentos from "./getMonumentos.ts";
import deleteMonumentos from "./deleteMonumentos.ts";
import addMonumentos from "./addMonumentos.ts";

import { load } from "https://deno.land/std@0.204.0/dotenv/mod.ts";

const env = await load();
const mongo_usr: string = env["MONGO_USR"];
const mongo_pwd: string = env["MONGO_PWD"];
const mongo_uri: string = env["MONGO_URI"];
const db_name: string = env["DB_NAME"];

//https://wide-tuna-41-8xd2vsmsg0ah.deno.dev/
//CTRL+SHIF+P ->deno initialize
//CTRL+SHIF+P ->deno initialize
if (!mongo_usr || !mongo_pwd || !mongo_uri || !db_name) {
  console.log("Missing env values");
  Deno.exit(1);
}

await mongoose.connect(
  `mongodb+srv://${mongo_usr}:${mongo_pwd}@${mongo_uri}/${db_name}?retryWrites=true&w=majority`,
);

const app = express();

app.use(express.json());
app
  .get("/getMonumentos", getMonumentos)
  .delete("/deleteMonumentos/", deleteMonumentos)
  .post("/addMonumentos", addMonumentos);

app.listen(3000, () => {
  console.log("Server listening on port 3000");
});
