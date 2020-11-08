let express = require('express');
let app = express();
let bodyParser = require('body-parser');
const cors = require('cors');
app.use(bodyParser.json())
app.use(cors());
 
require('./routes/weather.routes.js')(app);

app.listen(3030, function () {
 
  let host = 'localhost';
  let port = process.env.PORT || 3030;
 
  console.log("App listening at http://%s:%s", host, port)
 
});