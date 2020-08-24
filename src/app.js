const path = require("path")
const express = require("express")
const hbs = require("hbs")
const geocode = require("./utils/geocode")
const weatherAPI = require("./utils/forecast")

const app = express()

// Define paths for Express config
const publicDirPath = path.join(__dirname, "../public")
const viewsPath = path.join(__dirname, "../templates/views")
const partialsPath = path.join(__dirname, "../templates/partials")

// Setup Handlebars Engine and views location
app.set("view engine", "hbs")
app.set("views", viewsPath)
hbs.registerPartials(partialsPath)

// Setup static directory to serve
app.use(express.static(publicDirPath))

app.get("", (req, res) => {
    res.render("index", {
        title: "Weather App",
        name: "Efe Baltacı"
    })
})

app.get("/about", (req, res) => {
    res.render("about", {
        title: "About me",
        name: "Efe Baltacı"
    })
})

app.get("/help", (req, res) => {
    res.render("help", {
        title: "Help",
        message: "Help is coming soon!",
        name: "Efe Baltacı"
    })
})

app.get("/weather", (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: "You must provide an address!"
        })
    }

    geocode(req.query.address, (error, { latitude, longitude, location } = {} ) => {
        if (error) {
            return res.send({ error })
        }
        weatherAPI(latitude, longitude, (error, { forecast, temperature, feelslike } = {}) => {
            if (error) {
                return res.send({ error })
            }
            res.send({
                forecast: forecast,
                location: location,
                address: req.query.address,
                temperature: temperature,
                feelslike: feelslike,
                latitude: latitude,
                longitude: longitude
            })
        })
    })
})

app.get("/help/*", (req, res) => {
    res.render("404", {
        title: "404",
        message: "Help article not found!",
        name: "Efe Baltacı"
    })
})

app.get("*", (req, res) => {
    res.render("404", {
        title: "404",
        message: "My 404 page",
        name: "Efe Baltacı"
    })
})

app.listen(3000, () => {
    console.log("Server is up on port 3000.")
})