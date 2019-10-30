const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')
const app = express()

//Define paths for Express conig
const homePath = path.join(__dirname, '../public/')
const viewsPath = path.join(__dirname, '../templates/views') //default is views
const partialsPath = path.join(__dirname, '../templates/partials') //default is views

//setup handlebars and views path
app.set('view engine','hbs')
app.set('views',viewsPath) //only needed if not views
hbs.registerPartials(partialsPath) //only needed if not views

//setup static dir to serve
app.use(express.static(homePath))

app.get('',(req, res) => {
    res.render('index',{
        title: 'Node Express Weather Application :: Home',
        name: 'John Chase'
    })
})
app.get('/about',(req, res) => {
    res.render('about',{
        title: 'Node Express Weather Application :: About Me',
        name: 'John Chase'
    })
})
app.get('/help',(req, res) => {
    res.render('help',{
        title: "Node Express Weather Application :: Help",
        name: "John Chase",
        message: 'To use this app, make sure you have a decent internet connection.'
    })
})
app.get('/weather',(req, res) => {
    if(!req.query.address) {
        return res.send({error: 'You must provide an address...'})
    }
    geocode(req.query.address, (error , {latitude, longitude, location}={}) => {
        if(error){
            return res.send({error})
        }
        // console.log('\n'+latitude, longitude+'\n');
        forecast(latitude, longitude, (error, forecastData) => {
            if(error){
                return res.send({error})
            }
            res.send({forecast: forecastData, location, address: req.query.address})
        })
    })
})
app.get('/help/*',(req, res) => {
    res.render('404',{
        errorMsg: '404: Help article not found.',
        route: '/help'
    })
})
app.get('*',(req, res) => {
    res.render('404',{
        errorMsg: '404: File not found.',
        route: '/'
    })
})
app.listen(3000, () => {
    console.log('Server started on port 3000.');
})