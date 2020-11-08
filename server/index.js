let express = require('express');
let app = express();
let bodyParser = require('body-parser');
const cors = require('cors');
app.use(bodyParser.json())
app.use(cors());
 
require('./routes/weather.routes.js')(app);

let host = 'localhost'|| '0.0.0.0';
let port = process.env.PORT || 3030;

app.listen(port,host, function () {
 
  console.log("App listening at http://%s:%s", host, port)
 
}); 