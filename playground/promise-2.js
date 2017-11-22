const request = require('request')

var geocodeAddress = (address) => {
    return new Promise ((resolve, reject) => {
        request({
            url: `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(address)}`,
            json: true
        }, (error, response, body) => {
            if (error){
                reject('unable to connect')
            }else if (body.status ==='ZERO_RESULTS'){
                reject('cannot find this address')
            }else if (body.status === 'OK'){
                resolve({
                    address: `${body.results[0].formatted_address}`,
                    latitude: `${body.results[0].geometry.location.lat}`,
                    longtitude: `${body.results[0].geometry.location.lng}`
                })
            }
        })
    })
}

geocodeAddress('Baustrasse 5, Hamburg').then((location) => {
    console.log('Address with coordinates')
    console.log(location)
}, (errorMessage) => {
    console.log(errorMessage)
})