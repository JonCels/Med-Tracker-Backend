module.exports = app => {
    const sheets = require("../controllers/tutorial.controller.js");

    var router = require("express").Router();

    //Create a new Sheet
    router.post("/", sheets.create);

    router.get("/", sheets.getAll);

    router.get("/:date", sheets.getByDate);

    router.get("/:comments", sheets.getByComments);

    router.get("/:BW", sheets.getByBW);

    router.put("/:id", sheets.updateById);

    router.delete("/:id", sheets.deleteById);

    router.delete("/:date", sheets.deleteByDate);

    app.use('/api/tutorials', router);
};