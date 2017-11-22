const request = require('request')

var geocodeAddress = (address, callback) => {
    request({
        url: `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(address)}`,
        json: true
    }, (error, response, body) => {
        if (error){
            callback('unable to connect')
        }else if (body.status ==='ZERO_RESULTS'){
            callback('cannot find this address')
        }else if (body.status === 'OK'){
            callback(undefined, {
                address: `${body.results[0].formatted_address}`,
                latitude: `${body.results[0].geometry.location.lat}`,
                longtitude: `${body.results[0].geometry.location.lng}`
            })
        }
    })
}

module.exports = {
    geocodeAddress
}