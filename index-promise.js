const yargs = require('yargs')
const axios = require('axios')

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

var encodedAddress = encodeURIComponent(argv.address)
var geoCodeURL = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodedAddress}`

axios.get(geoCodeURL).then((response) => {
    if(response.data.status === 'ZERO_RESULTS'){
        throw new Error('Unable to find that address')
    }
    var latitude = response.data.results[0].geometry.location.lat
    var longtitude = response.data.results[0].geometry.location.lng
    console.log(latitude, longtitude)

    var weatherURL = `https://api.darksky.net/forecast/5b320aa1eef605a07befa8df7ee9ef89/${latitude},${longtitude}`
    //console.log(JSON.stringify(response.data, undefined, 2))
    return axios.get(weatherURL)
}).then((response) => {
    var temperature = response.data.currently.temperature
    var summary = response.data.currently.summary
    console.log(`Temperature: ${temperature}\nSummary: ${summary}`)
}).catch((e) => {
    if (e.code === 'ENOTFOUND'){
        console.log(e.code, ': Unable to connect to API servers')
    } else {
        console.log(e.message)
    }
    // console.log(e)
})