const request = require('request');
const forecast =(latitude,longitude,callback)=>{
    const url = 'https://api.weatherapi.com/v1/current.json?key=9513ee2dc235453083993351211007&q='+ latitude +','+longitude
    request({ url, json: true},(error, {body})=>{
        if(error){
            callback('Unable to connect to weather services!',undefined)
        }else if(body.error){
            callback('Unable to find location',undefined)
        }else{
            callback(undefined,body.current.condition.text+'. It is currently '+body.current.temp_c+ ' degrees outside. Feels Like '+body.current.feelslike_c+' degrees.')
        }
    })
}  
module.exports = forecast
