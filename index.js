const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

app.get('/', (req, res) => {
  res.json({ studentId: "245103A", message: "Hello from Docker!" });
});

app.get('/health', (req, res) => {
  res.status(200).json({ status: "ok" });
});

app.listen(PORT, () => console.log(`Running on port ${PORT}`));