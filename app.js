const express = require('express');

const https = require('https');
const bodyParser = require('body-parser');
const app = express();

app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static(__dirname + '/public'));
app.get('/', function (req, res) {
  res.sendFile(__dirname + '/index.html');
});

app.post('/', function (req, res) {
  // console.log(req.body.cityname)
  const query = req.body.cityname;
  const appkey = 'ebdaa3150595b4a2b6823dc69fcdeb14';
  const unit = 'metric';

  const url =
    'https://api.openweathermap.org/data/2.5/weather?q=' +
    query +
    '&appid=' +
    appkey +
    '&units=' +
    unit;

  https.get(url, function (response) {
    console.log(response.statusCode);

    response.on('data', function (data) {
      const wetherData = JSON.parse(data);
      // console.log(wetherData);
      const temp = wetherData.main.temp;
      const weartherDescp = wetherData.weather[0].description;
      const place = wetherData.name;
      const icon = wetherData.weather[0].icon;
      const imgeUrl = 'http://openweathermap.org/img/wn/' + icon + '@2x.png';
      res.write(
        '<div style="text-align: center; background-color: #0072ff; height: 100vh"><h1 style="font-size: 4rem; color: #fefefe">The weather in' +
          place +
          ' is ' +
          temp +
          '</h1><h1 style="font-size: 3rem; color: #fefefe">The weather description is ' +
          weartherDescp +
          '</h1><img style="height: 300px"src=' +
          imgeUrl +
          '><button style="font-size:1.4rem; border-radius: 15px"><a style="text-decoration: none"href="/">Home</a></button></div>'
      );
      res.send();
    });
  });
});

app.listen(3000, function () {
  console.log('server is runnind at port 3000');
});
