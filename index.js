const express = require("express");
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.get("/", (req, res) => {
 res.send("Binance Proxy is running!");
});

app.post("/indicator", (req, res) => {
 const { price, rsi, macd } = req.body;

 console.log("Received indicator data:", { price, rsi, macd });

 // Placeholder response — you'll replace this with strategy logic soon
 res.json({
   strategy: "hold",
   received: { price, rsi, macd }
 });
});

app.listen(PORT, () => {
 console.log(`Server running on port ${PORT}`);
});
