module.exports ={
    calculate  : function(weatherData) {
        var array=[];
        array.push(add("High/Low", weatherData.main.temp_max.toString()+"℃/"+weatherData.main.temp_min.toString()+"℃"));
        array.push(add("Humidity", weatherData.main.humidity.toString()+"%"));
        array.push(add("Pressure", weatherData.main.pressure.toString()+"mB"));
        array.push(add("Visibility", Math.round(weatherData.visibility/1000).toString()+"KM"));
        array.push(add("Wind", weatherData.wind.speed.toString()+"kmph"));
        array.push(add("Clouds", weatherData.clouds.all.toString()+"%"));
        return array;
    }
};

function add(one, two) {
    var array=[one,two];
    return array;
}