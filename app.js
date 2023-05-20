//jshint esversion:6

const express= require("express");
const app=express();
const bodyParser=require("body-parser");
const https= require("https");

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static("public"));

app.get("/", function(req, res) {
    res.render('index');
})

app.post("/", function(req, res) {
    const cityName=req.body.cityName;
    console.log(cityName);
    if(cityName=="") {
        res.redirect("/");
    }
    const apiKey="";
    const url="https://api.openweathermap.org/data/2.5/weather?q="+cityName+"&appid="+ apiKey+ "&units=metric";
    https.get(url, function(response) {
        response.on("data", function(data) {
            const weatherData=JSON.parse(data);
            res.render('output',{weatherData: weatherData});
            console.log(weatherData);
        })
    }) 
})

app.listen(3000, function() {
    console.log("The server started on port 3000");
})