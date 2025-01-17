const express = require("express");
const fs = require("fs");
const path = require("path");
const app = express();

// Middleware to parse JSON data
app.use(express.json());
app.use(express.static("public"));

// Route to handle saving data
app.post("/save", (req, res) => {
    const newData = req.body;

    const filePath = path.join(__dirname, "data.json");

    // Read the existing data.json file
    fs.readFile(filePath, "utf8", (err, fileData) => {
        let currentData = [];
        if (!err && fileData) {
            currentData = JSON.parse(fileData); // Parse existing JSON data
        }

        currentData.push(newData); // Add the new data

        // Write updated data to data.json
        fs.writeFile(filePath, JSON.stringify(currentData, null, 2), (err) => {
            if (err) {
                console.error("Error saving data:", err);
                return res.status(500).send("Error saving data");
            }
            res.status(200).send("Data saved successfully");
        });
    });
});

// Start the server
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);});