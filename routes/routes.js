module.exports = app => {
    const sheets = require("../controllers/controller.js");

    var router = require("express").Router();

    //Create a new Sheet
    router.post("/", sheets.createSheet);

    router.get("/", sheets.findAll);

    router.get("/date", sheets.findByDate);

    router.get("/comments", sheets.findByComments);

    router.get("/BW", sheets.findByBW);

    router.put("/:id", sheets.updateWithId);

    router.delete("/:id", sheets.deleteWithId);

    router.delete("/date", sheets.deleteWithDate);

    app.use('/api/sheets', router);
};