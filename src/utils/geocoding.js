const request = require('postman-request');
require('dotenv').config()

const geocode = (location, callback) =>{
    let token =   process.env.GEOCODE_TOKEN
    location = encodeURIComponent(location)
    let url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${location}.json?access_token=${token}&limit=1`
   
    request({url, json: true}, (error, { body }) =>{
        if(error)
            callback('Unable to connect the server and find the location!')
        else if(body.message === 'Not Found' || !body.features[0])
            callback('Location not found! Check if you\'ve misspelled the name of the city or leaved the input field empty and try another search!')
        else{
            
            callback(undefined, { 
                latitude:  body.features[0].center[1],
                longitude: body.features[0].center[0]
            })
        }  
    })
}

module.exports = geocode