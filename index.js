const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

// Root route to check server is alive
app.get("/", (req, res) => {
  res.send("Binance Proxy is Live");
});

// POST endpoint for indicator data from Pipedream
app.post("/indicator", (req, res) => {
  const { price, rsi, macd } = req.body;

  console.log("Received data from Pipedream:");
  console.log("Price:", price);
  console.log("RSI:", rsi);
  console.log("MACD Line:", macd.line);
  console.log("MACD Signal:", macd.signal);

  // Logic to determine trading action
  if (rsi < 35 && macd.line > macd.signal) {
    res.json({ action: "BUY", reason: "RSI low and MACD bullish" });
  } else if (rsi > 65 && macd.line < macd.signal) {
    res.json({ action: "SELL", reason: "RSI high and MACD bearish" });
  } else {
    res.json({ action: "HOLD", reason: "No clear signal" });
  }
});

// Start server on dynamic port (for Render)
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
