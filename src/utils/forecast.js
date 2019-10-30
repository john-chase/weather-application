const request = require('request')

const forecast = (latitude, longitude, callback) => {
    const url = 'https://api.darksky.net/forecast/8c87a54a83dfbf223681163541d4983c/'+latitude+','+longitude+'?units=us&lang=en'
    request({url, json: true}, (error, {body}) => {
        if (error) { //low level OS error
            callback("Weather Service unreachable...", undefined)
        } else if (body.error) { //api error
            callback("Unable to find location...", undefined);
        } else {
            callback(undefined,
                'It is currently ' + body.currently.temperature + ' degrees out. ' +
                body.daily.data[0].summary + ' There is ' + body.currently.precipProbability*100 + '% chance of ' + (body.currently.precipProbability===0?'precipitation':body.currently.precipType) + '.'
                
            )
        }
    })
}

module.exports = forecast 