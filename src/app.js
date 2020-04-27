const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

// console.log(__dirname)
// console.log(path.join(__filename, '../public'))

const app = express()

const port = process.env.PORT || 3000

//define paths for express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

//setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

//setup static directory to serve
app.use(express.static(publicDirectoryPath))


app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather App',
        name: 'Cool man'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About me',
        name: 'Cool man'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        message: 'Click here',
        title: 'Help',
        name: 'Cool man'
    })
})

app.get('/weather', (req, res) => {
   
    if(!req.query.address) {
       return res.send({
            error: 'You must provide address'
        })
    } else {
        geocode(req.query.address, (error, {longitude, latitude, location} = {}) => {
            if (error){
                return res.send({ error })
            }
        
            forecast(latitude, longitude, (error, forecastData) => {
                if (error){
                    return res.send({error})
                }
            
                res.send({
                    forecast: forecastData,
                    location, //shorthand syntax
                    address: req.query.address
                })
              })
        
        })
    }

})


app.get('/products', (req, res) => {
    if(!req.query.search) {
        return res.send({
            error: 'You must provide a search term'
        })
    }

    console.log(req.query.search)
    res.send({
        products: []
    })
})

app.get('/help/*', (req, res) => {
    res.render('error', {
        title: '404',
        name: 'Cool man',
        message: "Help article not found"
    })
})

app.get('*', (req, res) => {
    res.render('error', {
        title: '404',
        name: 'Cool man',
        message:'Page not found'
    })
})


app.listen(port, () => {
    console.log('Server is up on port ' + port)
})

// app.get('', (req, res) => {
//     res.send('Hi Express')
// })

// app.get('/help', (req, res) => {
//     res.send({
//         name: 'jonny',
//         age: 20
//     })
// })


// app.get('/about', (req, res) => {
//     res.send('<h1>About page</h1>')
// })

// app.get('/weather', (req, res) => {
   
//     if(!req.query.search) {
//        return res.send({
//             error: 'You must provide a search term'
//         })
//     }

//     res.send([{
//         forecast: '50 degrees',
//         location: 'Boston, Massachusets'
//     },{
//         forecast: '40 degrees',
//         location: 'Some, Maine'
//     }])
// })