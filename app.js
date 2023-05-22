//jshint esversion:6

const express= require("express");
const app=express();
const bodyParser=require("body-parser");
const https= require("https");
const tools=require("./cal.js")

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
    const apiKey="5fab81c200587a0ba844deb55cb3a4fc";
    const url="https://api.openweathermap.org/data/2.5/weather?q="+cityName+"&appid="+ apiKey+ "&units=metric";
    https.get(url, function(response) {
        console.log(response.statusCode);
        if(response.statusCode===404){
            res.send("fail");
        }
        else {
            response.on("data", function(data) {
                const weatherData=JSON.parse(data);
                res.render('output',{weatherData: weatherData, list: tools.calculate(weatherData)});
                console.log(tools.calculate(weatherData));
            })
        }
    }) 
})

app.listen(3000, function() {
    console.log("The server started on port 3000");
})