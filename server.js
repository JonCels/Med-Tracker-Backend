const express = require('express'); //build REST APIs
const cors = require('cors'); //middleware for express
const app = express();

var corsOptions = {
    origin: "http://localhost:8085"
};

app.use(cors(corsOptions));
app.use(express.json()); //requests of type application/json
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => { //Simple get route
    res.json({
        message: "Welcome"
    });
});

//require("./routes/routes.js")(app);

const PORT = process.env.PORT || 8081;
app.listen(PORT, () => { //Listen on port 8081
  console.log(`Server is running on port ${PORT}.`);
});