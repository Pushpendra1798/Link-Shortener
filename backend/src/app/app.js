import express from "express";
import urlRoute from "../routes/url.route.js";
import { redirectToOriginalUrl } from "../controller/url.controller.js";
import cors from "cors";

const app = express();

app.use(express.json());

app.use(
    cors({
        origin: "https://link-shortener-one-ivory.vercel.app",
    })
);

app.use("/api/url", urlRoute);
app.get("/:shortCode", redirectToOriginalUrl);

export default app;