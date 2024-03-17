import Express from "express";
import path from "path";

const __dirname = path.dirname('/');

const app = Express();


app.listen(process.env.PORT, (err)=> {
    if (err) console.log(err);
    console.log("Server running at port : ", process.env.PORT)
})