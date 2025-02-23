const express = require("express")
const router = express.Router()

app.head('/', (req, res) => {
    console.log("HEAD request received at:", new Date().toISOString());
    res.status(200).end();
});

app.get('/', (req, res) => {
    console.log("GET request received at:", new Date().toISOString());
    res.status(200).send('OK');
});
module.exports = router