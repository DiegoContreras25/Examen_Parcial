import express from "npm:express@4.18.2";
import mongoose from "npm:mongoose@7.6.3";

import getProducts from "./getProducts.ts";
import getClient from "./getClient.ts";
import getInvoice from "./getInvoice.ts";
import deleteProducts from "./deleteProducts.ts";
import deleteClient from "./deleteClient.ts";
import addProducts from "./addProducts.ts";
import addClient from "./addClient.ts";
import addInvoice from "./addInvoice.ts";

import { load } from "https://deno.land/std@0.204.0/dotenv/mod.ts";

const env = await load();
const mongo_usr: string = env["MONGO_USR"];
const mongo_pwd: string = env["MONGO_PWD"];
const mongo_uri: string = env["MONGO_URI"];
const db_name: string = env["DB_NAME"];

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
  .get("/getProducts", getProducts)
  .get("/getClient", getClient)
  .get("/getInvoice/:id", getInvoice)
  //no furulan los deletes
  .delete("/deleteProducts/", deleteProducts)
  .delete("/deleteClient/", deleteClient)
  .post("/addClient", addClient)
  //no pilla datos opcionales, revisar contructor
  .post("/addProducts", addProducts)
  .post("/addInvoice", addInvoice);
app.listen(3000, () => {
  console.log("Server listening on port 3000");
});
