import express from "express";
import router from "./router.js";
import "dotenv/config";

// App init
const app = express();

// Urlencoded & JSON
app.use(express.urlencoded({extended: true}));
app.use(express.json());

// Router
app.use("/mailer", router);

app.listen(process.env.PORT, () => {
    console.log("Mailing service startup successfull ✨");
});