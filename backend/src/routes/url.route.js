import express from "express";
import { createShortUrl, getAllUrls, deleteShortUrl } from "../controller/url.controller.js";

const router = express.Router();

router.post("/create", createShortUrl);

router.get("/getAll", getAllUrls);

router.delete("/:shortCode", deleteShortUrl);


export default router;