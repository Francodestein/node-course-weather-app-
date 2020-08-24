const request = require("request")

const geocode = (location, callback) => {

    const url = "https://api.mapbox.com/geocoding/v5/mapbox.places/" + decodeURIComponent(location) + ".json?access_token=pk.eyJ1IjoiY29uc2llZmUiLCJhIjoiY2tlMWUxb2N6MGFldzJycDR2cDZ3dHYyNSJ9.CXP2ISchUsp06xHqbUlXOg&limit=1"

    request({ url, json: true }, (error, { body } = {}) => {
        if (error) {
            callback("Unable to establish connection to location service!", undefined)
        } else if (body.features === undefined || body.features.length === 0) {
            callback("Unable to find location! Try another search.", undefined)
        } else {
            callback(undefined, {
                latitude: body.features[0].center[1],
                longitude: body.features[0].center[0],
                location: body.features[0].place_name
            })
        }
    })
}

module.exports = geocode