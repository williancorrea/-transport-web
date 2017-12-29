const express = required('express');
const app = express();

app.use(express.static(__dirname + '/dist'));
app.get('/*', function(req, resp){
  res.sendFile(__dirname + '/dist/index.html');
});

app.listen(process.env.PORT || 4200);
