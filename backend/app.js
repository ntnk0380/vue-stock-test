const express = require('express');
const app = express();
const cors = require('cors');

app.use(express.json());
app.use(cors());

const materialData = require('./materialData.json');
app.post('/master/material/get', function (req, res) {
  let materialTextSearch = (req.body.Material || '').toLowerCase();
  const filters = materialData.find(e => materialTextSearch === e.Material.toLowerCase());
  console.log(materialTextSearch, filters);
  res.header("Content-Type",'application/json');
  res.send(JSON.stringify(filters));
});

const stockData = require('./stockData.json');
app.get('/stock', function (req, res) {
  res.header("Content-Type",'application/json');
  res.send(JSON.stringify(stockData));
  // res.json(stockData);
});

app.listen(3000, function(req, res) { 
  // npm run dev
  console.log("Server is running at port 3000"); 
}); 