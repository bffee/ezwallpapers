const { response } = require('express');
const {Users} = require('../models/users');
const {Wallpapers} = require('../models/wallpapers');
const sharp = require('sharp')

// async function getAspectRatio(file) {
//     if (!file || !file.path) {
//         throw new Error("Invalid file object");
//     }

//     try {
//         const metadata = await sharp(file.path).metadata();
//         const { width, height } = metadata;

//         if (!width || !height) {
//             throw new Error("Unable to determine image dimensions");
//         }

//         return `${width}/${height}`;
//     } catch (error) {
//         console.error("Error calculating aspect ratio:", error);
//         return null;
//     }
// }

async function getWidthHieght(file) {
    if (!file || !file.path) {
        throw new Error("Invalid file object");
    }

    try {
        const metadata = await sharp(file.path).metadata();
        const { width, height } = metadata;

        if (!width || !height) {
            throw new Error("Unable to determine image dimensions");
        }
        return {width, height}
    } catch (error) {
        console.error("Error calculating aspect ratio:", error);
        return null;
    }
}

async function addWallpaperEntry(req){
    try{
        const imageWidthHieght = await getWidthHieght(req.file);
        if(imageWidthHieght?.width && imageWidthHieght?.height){
            const wallpaper = new Wallpapers({
                title: req.body.title,
                source: `/images/wallpapers/${req.user.username}/${req.user?.upload ? req.user.upload + 1 : 1}_${req.file.originalname}`,
                creator: req.user.username,
                aspect_ratio: `${imageWidthHieght.width}/${imageWidthHieght.height}`,
                downloads: 0,
                size: req.file.size,
                keywords: JSON.parse(req.body.tags)
            })
            return wallpaper.save()
        }else{
            throw new Error("unable to extract the width and height of an image")
        }
    }
    catch (error){
        return `error occured while adding wallpaper into the database ${error}`
    }
}

async function handlePostUploadAPI(req, res){
      if (!req.file) return res.status(400).json({ error: "No file uploaded" });

      const result = await addWallpaperEntry(req)

      if(result instanceof Error) return res.status(400).json({error: result.message})

      await Users.updateOne({username: req.user.username}, {$inc : {upload: 1}})
      res.json({ message: "Upload successful!", file: req.file.filename });
}

module.exports = {handlePostUploadAPI}