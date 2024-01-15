const express = require('express');
const Vps = require('../models/Vps');
const command = require('./command');
const { CONFIG_ROOT } = require('../const');
const request = require('request');
const router = express.Router();
const fs = require('fs');
router.get('/reset_ngrok', async (req, res) => {
    try {
        await command.reset();
        return res.status(200).send({
            code: "1000",
            message: "OK"
        });
    }
    catch (e) {
        console.log('Error', e);
        return res.status(400).json({
            code: "9999",
            message: "FAILED",
            reason: "Lỗi bất định"
        });
    }
});
router.get('/update_source_code', async (req, res) => {
    try {
        // const { fileUrl } = req.body;
        // console.log('fileUrl', fileUrl);
        const fileUrl = `https://github.com/trungtt123/zip-tool-vps/raw/master/tool-vps.zip`
        // console.log(CONFIG_ROOT);
        const output = CONFIG_ROOT + "\\tool-vps.zip";
        console.log('output', output);
        request({ url: fileUrl, encoding: null }, function (err, resp, body) {
            if (err) throw err;
            fs.writeFile(output, body, function (err) {
                console.log("file written!");
            });
        });
        return res.status(200).send({
            code: "1000",
            message: "OK"
        });
    }
    catch (e) {
        console.log('Error', e);
        return res.status(400).json({
            code: "9999",
            message: "FAILED",
            reason: "Lỗi bất định"
        });
    }
});
module.exports = router;