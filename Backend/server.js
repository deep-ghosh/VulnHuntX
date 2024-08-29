
const { exec } = require("child_process");
const express = require("express");
const cors = require("cors");
const path = require("path");
const fs = require("fs");

const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());

// Serve the HTML file (if you have a static frontend file)
app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

app.post("/search", (req, res) => {
  const url = req.body.url;

  if (!url) {
    return res.status(400).json({ message: "URL is required" });
  }

  console.log(`Received URL: ${url}`);

  // Construct the FFuf command
  const ffufCommand = `ffuf -w /path/to/wordlist.txt -u ${url}/FUZZ -t 40 -mc 200`;

  // Execute the FFuf command using exec
  exec(ffufCommand, (error, stdout, stderr) => {
    if (error) {
      console.error(`FFuf command failed: ${stderr}`);
      return res.status(500).json({
        message: "FFuf command failed",
        error: stderr || `FFuf exited with code ${error.code}`,
      });
    }

    // Check if the output file was created
    if (!fs.existsSync(outputFilePath)) {
      return res.status(500).json({
        message: "FFuf scan completed but no output was generated",
      });
    }

    // Read the JSON output file
    fs.readFile(outputFilePath, "utf8", (readError, data) => {
      if (readError) {
        console.error("Failed to read FFuf output file:", readError);
        return res.status(500).json({
          message: "Failed to read FFuf output file",
          error: readError.message,
        });
      }

      try {
        const results = JSON.parse(data);
        res.json({
          message: "Scan completed successfully!",
          result: results,
        });
      } catch (parseError) {
        console.error("Failed to parse FFuf output:", parseError);
        res.status(500).json({
          message: "Failed to parse FFuf output",
          error: parseError.message,
          output: data, // Send raw output in case of parsing failure
        });
      }
    });
  });
});

app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`);
});

