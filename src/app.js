const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocoding')
const getTemp = require('./utils/getTemp')
const app = express()

let port =  process.env.PORT || 3000
app.use(express.static(path.join(__dirname, '../public')))
app.set('view engine', 'hbs')
app.set('views', path.join(__dirname, '../templates/views'))
hbs.registerPartials(path.join(__dirname, '../templates/partials'))

app.get('', (req, res)=>{

    res.render('index', {
        title: "Weather App"
    })
})


app.get('/about', (req, res)=>{

    res.render('about', {
        title: "About Me", 

    })
})

app.get('/help', (req, res)=>{

    res.render('help', {
        title: "Help"
    })
})
app.get('/help/*', (req, res)=>{
    res.render('error', {
        title: "Error",
        errormsg:"This article do not exists!"
    })
})
app.get('/weather', (req, res)=>{
    if( !req.query.address ){
        return res.send({title: "Sorry", error: "No address has been provided"})
    }
    
    var address = req.query.address
    geocode(address, (error, data = {}) =>{
        if( error ){        
            console.log(error)
            return res.send({title: "Sorry", error: error})
        }
            
        getTemp(data, (err, temperatureData)=>{
            if(err){
                console.log(err)
                return res.send({title: "Sorry", error: err})
            }
                
            res.send({title: `${address} Weather Conditions`, msg: temperatureData})
        })
    })

})
app.get('*', (req, res)=>{
    res.render('error',{
        title: 'Error',
        errormsg: '404 ERROR: This page does not exist'})
})
app.listen(port, ()=>{
    console.log('running on port ' + port)
})