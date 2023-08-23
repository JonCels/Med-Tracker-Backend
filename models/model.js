const sql = require("./db.js");

//Constructor for a sheet
const Sheet = function(sheet) {
    this.firstname = sheet.firstname;
    this.lastname = sheet.lastname;
    this.date = sheet.date;
    this.edaravone = sheet.edaravone;
    this.edaravone_comments = sheet.edaravone_comments;
    this.edaravone_change = sheet.edaravone_change;
    this.bipap_nighttime = sheet.bipap_nighttime;
    this.bipap_nighttime_hours = sheet.bipap_nighttime_hours;
    this.bipap_daytime = sheet.bipap_daytime;
    this.bipap_daytime_hours = sheet.bipap_daytime_hours;
    this.bipap_comments = sheet.bipap_comments;
    this.sleep = sheet.sleep;
    this.bowel_movement = sheet.bowel_movement;
    this.bowel_movement_comments = sheet.bowel_movement_comments;
    this.urine_output = sheet.urine_output;
    this.urine_morning = sheet.urine_morning;
    this.urine_daily_volume = sheet.urine_daily_volume;
    this.urine_comments = sheet.urine_comments;
    this.medication_rx_change = sheet.medication_rx_change;
    this.medication_routine_change = sheet.medication_routine_change;
    this.morning_shake_via_pump = sheet.morning_shake_via_pump;
    this.gtube_other_comments = sheet.gtube_other_comments;
    this.dinner_oral_feed_comments = sheet.dinner_oral_feed_comments;
    this.pain_discomfort = sheet.pain_discomfort;
    this.pain_discomfort_source = sheet.pain_discomfort_source;
    this.pain_discomfort_comments = sheet.pain_discomfort_comments;
    this.suction_machine = sheet.suction_machine;
    this.aoc_followup_comments = sheet.aoc_followup_comments;
    this.important_notes = sheet.important_notes;
    this.combined_comments = sheet.edaravone_comments.concatenate(sheet.bipap_comments, 
        sheet.sleep, sheet.bowel_movement_comments, sheet.urine_comments, sheet.medication_rx_change, 
        sheet.medication_routine_change, sheet.gtube_other_comments, sheet.dinner_oral_feed_comments, 
        sheet.pain_discomfort_source, sheet.pain_discomfort_comments, sheet.aoc_followup_comments, 
        sheet.important_notes);
};

Sheet.create = (newSheet, result) => {
    sql.query("INSERT INTO daily SET ?", newSheet, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }

        console.log("created daily tracker sheet: ", { id: res.insertId, ...newSheet });
        result(null, { id: res.insertId, ...newSheet });
    });
};

Sheet.getAll = (result) => {
    sql.query("SELECT * FROM daily", (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }
      
        console.log("All sheets: ", res);
        result(null, res);
    });
};

Sheet.searchDate = (date, result) => {
    sql.query("SELECT * FROM daily WHERE date = ?", date, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }

        console.log("Search results: ", res);
        result(null, res);
    });
}

Sheet.searchComments = (searchInput, result) => {
    sql.query(`SELECT * FROM daily WHERE combined_comments LIKE '%${searchInput}'`, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }

        console.log("Search results: ", res);
        result(null, res);
    });
}

Sheet.filterBW = (bw_flag, result) => {
    sql.query("SELECT * FROM daily WHERE bowel_movement = ?", bw_flag, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }

        console.log("Search results: ", res);
        result(null, res);
    });
}

Sheet.deleteById = (id, result) => {
    sql.query("DELETE FROM daily WHERE id = ?", id, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }

        console.log("Deleted sheet with id ", id);
        result(null, res);
    });
}

Sheet.deleteByDate = (date, result) => {
    sql.query("DELETE FROM daily WHERE date = ?", date, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }

        console.log("Deleted sheet with id ", id);
        result(null, res);
    });
}

module.exports = Sheet;