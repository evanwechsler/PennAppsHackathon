const express = require("express");
const cors = require("cors");

const PORT = 8080;
const app = new express();

app.use(cors({ origin: "*" }));

app.get("/user", (req, res) => {
    res.status(200).send("Hello");
});

app.listen(PORT, () => {
    console.log(`Express app started on ${PORT}`);
});