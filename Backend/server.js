
const { exec } = require("child_process");
const express = require("express");
const cors = require("cors");
const path = require("path");
const fs = require("fs");

const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});

app.post("/search", (req, res) => {
  const url = req.body.url;

  if (!url) {
    return res.status(400).json({ message: "URL is required" });
  }

  console.log(`Received URL: ${url}`);
  const sanitizedUrl = url.replace(/\/+$/, ""); // Remove trailing slashes

  // Validate URL
  try {
    new URL(sanitizedUrl);
    console.log(`Sanitized URL: ${sanitizedUrl}`);
  } catch (e) {
    console.error("URL validation failed:", e);
    return res.status(400).json({ message: "Invalid URL format" });
  }

  const wordlistPath = path.join(__dirname, "wordlist.txt");
  const outputFilePath = path.join(__dirname, "output.json");

  // Check if wordlist exists
  if (!fs.existsSync(wordlistPath)) {
    console.error(`Wordlist not found at path: ${wordlistPath}`);
    return res.status(500).json({ message: "Wordlist not found" });
  }

  // Construct FFuf command
  const ffufCommand = `ffuf -w ${wordlistPath} -u ${sanitizedUrl}/FUZZ -t 40 -mc 200-499 -of json -o ${outputFilePath}`;

  console.log(`Executing FFuf command: ${ffufCommand}`);

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

