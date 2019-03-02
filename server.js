const express = require('express');
const app = express();

app.use(express.static(__dirname + '/dist'));

app.get('/*', function(req, res) {
  res.sendFile(__dirname + '/dist/index.html');
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
});

app.listen(process.env.PORT || 4200);
