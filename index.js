var express = require('express');
var app = express();
var cors = require('cors')
var dotenv = require('dotenv');
dotenv.load();

var sid = process.env.SID;
var token = process.env.Token;
var twilio_number = process.env.number;
var bodyParser = require('body-parser');
var client = require('twilio')(sid, token);

app.use(cors());

app.use(bodyParser.json());

app.set('port', (process.env.PORT || 5000));

app.use(express.static(__dirname + '/public'));

// views is directory for all template files
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

app.get('/', function(request, response) {
  response.send('<h1>This is server page</h1>');
});

app.post('/sendSMS',function(req,res){
    console.log("send SMS request");

    var details=req.body;
    client.messages.create({
        to: details.number,
        from: twilio_number,
        body: details.message
    }, function(err, message) {
        console.log(message.sid);
        res.send("success");
    });
});




app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});
