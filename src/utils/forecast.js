const request = require("request")

const weatherAPI = (latitude, longitude, callback) => {

    const url = "http://api.weatherstack.com/current?access_key=4a55c81b152c71af934b461b3245be4d&query=" + latitude + "," + longitude

    request({ url, json: true }, (error, { body } = {}) => {
        if (error) {
            callback("Unable to connect to weather service!", undefined)
        } else if (body.error) {
            callback("Unable to find the location! Try another search.", undefined)
        } else {
            callback(undefined, {
                forecast: body.current.weather_descriptions[0],
                temperature: body.current.temperature,
                feelslike: body.current.feelslike
            })
        }
    })
}

module.exports = weatherAPI