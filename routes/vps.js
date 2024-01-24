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
        command.update_source_code();
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