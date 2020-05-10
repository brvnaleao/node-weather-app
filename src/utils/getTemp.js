const request = require('postman-request')
require('dotenv').config()

const getTemp = ( { latitude, longitude } = {}, callback ) =>{
    let apiToken = process.env.WEATHERSTACK_TOKEN
    let url = `http://api.weatherstack.com/current?access_key=${apiToken}&query=${latitude},${longitude}`

    request({url, json: true}, ( error, { body } ) => {
        if(error)
            callback("Unable to connect Weather Server!")
        else if(body.error || !body.current)
            callback("Unable to find location!")
        else
            var temp = body.current
            callback(undefined, `${temp.weather_descriptions[0]}. It's currently ${temp.temperature} degrees, it feels like ${temp.feelslike} `)    
    });
}

module.exports = getTemp