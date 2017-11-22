const yargs = require('yargs')
const request = require('request')

const geocode = require('./geocode/geocode')
const geoWeather = require('./geoweather/geoweather')

const argv = yargs
    .options({
        a: {
            demand: true,
            alias: 'address',
            describe: 'Address to fetch weather for',
            string: true
        }
    })
    .help()
    .alias('help', 'h')
    .argv

geocode.geocodeAddress(argv.address, (errorMessage, results) => {
    if (errorMessage){
        console.log(errorMessage)
    } else {
        console.log('-----------------------------------------------------')        
        console.log(`Current Weather at ${results.address}`)
        console.log('-----------------------------------------------------')
        geoWeather.getWeather(results.latitude, results.latitude, (errorMessage, weatherResults) => {
            if (errorMessage){
                console.log(errorMessage)
            } else {
                console.log(`Summary: ${weatherResults.summary}`)
                console.log(`Temperature: ${weatherResults.temperature}°F`)
                console.log(`Wind Speed: ${weatherResults.windSpeed}m/s`)
                console.log(`Wind Bearing: ${weatherResults.windBearing}°`)

            }
        })
    }
})
