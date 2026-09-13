import urlModel from "../models/url.model.js";
import generateCode from "../utils/generateCode.js";

export const createShortUrl = async (req, res) => {
    try {
        const { originalUrl } = req.body;

        if (!originalUrl || !originalUrl.trim()) {
            return res.status(400).json({
                message: "Please enter a URL",
            });
        }

        if (originalUrl.length > 2048) {
            return res.status(400).json({
                message: "URL is too long",
            });
        }

        try {
            const url = new URL(originalUrl);

            if (url.protocol !== "http:" && url.protocol !== "https:") {
                return res.status(400).json({
                    message: "Please enter a valid URL starting with http:// or https://",
                });
            }
        } catch (error) {
            return res.status(400).json({
                message: "Please enter a valid URL starting with http:// or https://",
            });
        }



        let shortCode;
        let existingCode;

        do {
            shortCode = generateCode();
            existingCode = await urlModel.findOne({ shortCode });
        } while (existingCode);

        const newUrl = await urlModel.create({
            originalUrl,
            shortCode,
        });

        return res.status(201).json({
            message: "Short URL created successfully",
            shortCode: newUrl.shortCode,
            shortUrl: `http://localhost:3000/${newUrl.shortCode}`,
        });
        
    } catch (error) {
        return res.status(500).json({
            message: error.message,
        });
    }
};


export const getAllUrls = async (req, res)=> {
    try {
        const urls = await urlModel.find().sort({createdAt:-1});
        return res.status(200).json({
            message: "Urls fatched successfully!",
            urls,
        })
    } catch (error) {
        return res.status(500).json({
            message: error.message,
        })
    }
}

export const redirectToOriginalUrl  = async (req, res)=> {
    try {
        const { shortCode } = req.params;

        const url = await urlModel.findOne({ shortCode });

        if(!url) {
            return res.status(404).json({
                message: "Short Url not found"
            })
        }

        url.clicks += 1;
        await url.save();

        return res.redirect(url.originalUrl);

    } catch (error) {
        return res.status(500).json({
            message: error.message,
        })
    }
}

export const deleteShortUrl = async (req, res)=> {
    try {
        const { shortCode } = req.params;
        const deleteUrl = await  urlModel.findOneAndDelete({ shortCode })

        if(!deleteUrl) {
            res.status(404).json({
                message: "Short Url not found",
            })
        }

        res.status(200).json({
            message: "Short URL deleted successfully",
            deleteUrl,
        })
    } catch (error) {
        return res.status(500).json({
            message: error.message,
        });
    }
}