// backend/controllers/chargingController.js
const db = require("../db");

exports.getChargingStatus = (req, res) => {
  db.all("SELECT * FROM charging_status", (err, rows) => {
    if (err) {
      return res.status(500).json({ message: "Erro ao consultar status de recarga" });
    }
    res.json(rows);
  });
};

exports.getEnergySources = (req, res) => {
  db.all("SELECT * FROM energy_sources", (err, rows) => {
    if (err) {
      return res.status(500).json({ message: "Erro ao consultar fontes de energia" });
    }
    res.json(rows);
  });
};