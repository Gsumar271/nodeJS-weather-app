const request = require('request')

const forecast = (latitude, longitude, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=224b2714834de2eabff25c3e5c627dde&query='+ latitude +','+ longitude + '&units=f'

    request({url, json: true}, (error, {body}) => {

        if (error) {
            callback("Unable to connect to location services", undefined) 
        } else if(body.error) {
            callback('Unable to find location, Try another search', undefined)
        } else {
            const data = body.current.weather_descriptions[0] + '. It is curently ' + body.current.temperature + ' degrees. It feels like '+ body.current.feelslike + ' degrees.' 
            callback (undefined, data)
       }  
    })
}

module.exports = forecast
