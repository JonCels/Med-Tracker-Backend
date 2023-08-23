const Sheet = require("../models/model.js");

exports.createSheet = (req, res) => {
    if (!req.body) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
    }

    const sheet = new Sheet({
        firstname: req.body.firstname, 
        lastname: req.body.lastname, 
        date: req.body.date, 
        edaravone: req.body.edaravone, 
        edaravone_comments: req.body.edaravone_comments, 
        edaravone_change: req.body.edaravone_change, 
        bipap_nighttime: req.body.bipap_nighttime, 
        bipap_nighttime_hours: req.body.bipap_nighttime_hours, 
        bipap_daytime: req.body.bipap_daytime, 
        bipap_daytime_hours: req.body.bipap_daytime_hours, 
        bipap_comments: req.body.bipap_comments, 
        sleep: req.body.sleep, 
        bowel_movement: req.body.bowel_movement, 
        bowel_movement_comments: req.body.bowel_movement_comments, 
        urine_output: req.body.urine_output, 
        urine_morning: req.body.urine_morning, 
        urine_daily_volume: req.body.urine_daily_volume, 
        urine_comments: req.body.urine_comments, 
        medication_rx_change: req.body.medication_rx_change, 
        medication_routine_change: req.body.medication_routine_change, 
        morning_shake_via_pump: req.body.morning_shake_via_pump, 
        gtube_other_comments: req.body.gtube_other_comments, 
        dinner_oral_feed_comments: req.body.dinner_oral_feed_comments, 
        pain_discomfort: req.body.pain_discomfort, 
        pain_discomfort_source: req.body.pain_discomfort_source, 
        pain_discomfort_comments: req.body.pain_discomfort_comments, 
        suction_machine: req.body.suction_machine, 
        aoc_followup_comments: req.body.aoc_followup_comments, 
        important_notes: req.body.important_notes,
        combined_comments: req.body.combined_comments
    });

    Sheet.create(sheet, (err, data) => {
        if (err) {
            res.status(500).send({
                message: err.message || "Error occurred with sheet creation."
            });
        }
        else {
            res.send(data);
        }
    });
};

exports.findAll = (req, res) => {
    Sheet.getAll((err, data) => {
        if (err) {
            res.status(500).send({
                message: err.message || "Error occurred with search."
            });
        }
        else {
            res.send(data);
        }
    });
};

exports.findByDate = (req, res) => {
    const date = req.query.date;
    Sheet.getByDate(date, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: 'Sheet with given date not found.'
                });
            }
            else {
                res.status(500).send({
                    message: err.message || "Error occurred with date search."
                });
            }
        }
        else {
            res.send(data);
        }
    });
};

exports.findByComments = (req, res) => {
    const searchInput = req.query.combined_comments;
    Sheet.getByComments(searchInput, (err, data) => {
        if (err) {
            res.status(500).send({
                message: err.message || "Error occurred with comment search."
            });
        }
        else {
            res.send(data);
        }
    });
};

exports.findByBW = (req, res) => {
    const BW = req.query.bowel_movement;
    Sheet.getByBW(BW, (err, data) => {
        if (err) {
            res.status(500).send({
                message: err.message || "Error occurred with BW filter."
            });
        }
        else {
            res.send(data);
        }
    });
};

exports.updateWithId = (req, res) => {
    if (!req.body) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
    }
    console.log(req.body);

    Sheet.updateById(
        req.params.id,
        new Sheet(req.body), (err, data) => {
            if (err) {
                if (err.kind === "not_found") {
                    res.status(404).send({
                        message: 'Sheet with given id not found.'
                    });
                }
                else {
                    res.status(500).send({
                        message: err.message || "Error occurred with id update."
                    });
                }
            }
            else {
                res.send(data);
            }
        }
    );
};

exports.deleteWithId = (req, res) => {
    Sheet.deleteById(req.params.id, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: 'Sheet with given id not found.'
                });
            }
            else {
                res.status(500).send({
                    message: err.message || "Error occurred with id deletion."
                });
            }
        }
        else {
            res.send({ message: "Sheet deleted successfully"});
        }
    });
};

exports.deleteWithDate = (req, res) => {
    const date = req.query.date;
    Sheet.deleteByDate(date, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: 'Sheet with given date not found.'
                });
            }
            else {
                res.status(500).send({
                    message: err.message || "Error occurred with date deletion."
                });
            }
        }
        else {
            res.send({ message: "Sheet deleted successfully"});
        }
    });
};