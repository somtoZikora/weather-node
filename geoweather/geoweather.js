const request = require('request')

var getWeather = (latitude, longtitude, callback) => {
    request({
        url: `https://api.darksky.net/forecast/5b320aa1eef605a07befa8df7ee9ef89/${latitude},${longtitude}`,
        json: true
    }, (error, response, body) => {
        if(error || response.statusCode !== 200) {
            callback('unable to fetch')        
        } else{
            callback(undefined, {
                summary: body.currently.summary,
                temperature: body.currently.temperature,
                windSpeed: body.currently.windSpeed,
                windBearing: body.currently.windBearing
            })       
         }
    })
}

module.exports = {
    getWeather
}