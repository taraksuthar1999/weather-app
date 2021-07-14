const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')
const app = express()
const port = process.env.PORT || 3080

//define paths for express config
const viewsPath = path.join(__dirname,'../templates/views')
const partialsPath = path.join(__dirname,'../templates/partials')
// setup handlebars engine and views location
app.set('view engine','hbs')
app.set('views',viewsPath)
hbs.registerPartials(partialsPath)

//setup static 
app.use(express.static(path.join(__dirname,'../public')))

app.get('/',(req, res)=>{
    res.render('index',{
        title: 'Weather',
        name: 'tarak'
    })

})
app.get('/about',(req, res)=>{
    res.render('about',{
        title: 'About',
        name: 'tarak'
    })

})
app.get('/help',(req,res)=>{
    res.render('help',{
        title: 'Help',
        name: 'tarak'
    })
})
app.get('/weather',(req,res)=>{
    if(!req.query.address){
        return res.send({
            error: 'You must provide on address'
        })

    }
    geocode(req.query.address, (error,{latitude, longitude, location}={})=>{
        if(error){
            return res.send({error})
        }
        forecast(latitude,longitude,(error, forecastData)=>{
            if(error){
                return res.send({error})
            }
        
            res.send({
                forecast: forecastData,
                location,
                address: req.query.address

            })
        })
    })
    // res.send({
    //     address: req.query.address
    // })
})
app.listen(port,()=>{
    console.log('server is up on port '+ port)
})