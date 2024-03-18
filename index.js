import Express, { json } from "express";
import path from "path";
import pdfRouter from "./routes/pdfRoutes.js";

const __dirname = path.dirname('/');

const app = Express();
app.use(Express.static(path.join(__dirname, "public")))
app.use(Express.json())

app.use('/', pdfRouter)

app.listen(process.env.PORT, (err)=> {
    if (err) console.log(err);
    console.log("Server running at port : ", process.env.PORT)
})