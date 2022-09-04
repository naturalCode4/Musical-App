const express = require('express')
const cors = require('cors')
const axios = require('axios')
const path = require('path')
const request = require('request');
const { response } = require('express');
const app = express()
require('dotenv').config();

//this below line of code routes frontend to backend. useful for getting things to log in terminal
// const frontEnd = require('../client/index.js')

app.use(express.json())
app.use(cors())

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../client/index.html'))
})

app.get('/js', (req, res) => {
    console.log('trying to hit index.js')
    res.sendFile(path.join(__dirname, '../client/index.js'))
})

app.get('/styles', (req, res) => {
    console.log('trying to hit styles')
    res.sendFile(path.join(__dirname, '../client/styles.css'))
})

let songRec

app.post('/songRec', async (req, res) => {
    console.log('11111')
    try {
    console.log(req.body.filters)
    songRec = await getSongRec(req.body.filters)
    console.log('22222')

    // .json (vs .send) makes it a json file. you need to send http requests in json form. if data was already in json you could .send it // could also either of 2 below:
    res.status(200).send(JSON.stringify(songRec))
    // res.status(200).json(songRec)

    console.log('33333')

    }
    catch (err) {
        console.log('There was an error ==>:', err)
    }
})

const spotifyRecsBaseURL = 'https://api.spotify.com/v1/recommendations/'

////Authorization//////

const client_id = 'f8a2526a0dc7469884edac2d88b21ccd';
const client_secret = 'e2d91181ac5d4d58a884d1758a01bf1f';

const authOptions = {
  url: 'https://accounts.spotify.com/api/token',
  headers: {
    'Authorization': 'Basic ' + (new Buffer(client_id + ':' + client_secret).toString('base64'))
  },
  form: {
    grant_type: 'client_credentials'
  },
  json: true
};

let token = 'not declared yet'

////End of Authorization segment of code//////

let retried = false

const getSongRec = ({ genre, acousticness, danceability, energy, instrumentalness, popularity, valence }) => {
    
    console.log('getSongRec function called on server')

    const generateVariant = () => {
        let val = 1
        if (Math.random() < .5) { // this if block deterines whether variant will be positive or negative
            val = -1 
        }
        return Math.round(val*25*Math.random())/100
    }

    let params = `?limit=1`

    if (genre) params += `&seed_genres=${genre.toLowerCase()}`
    
    if (acousticness) params += `&target_acousticness=${acousticness+generateVariant()}`
    
    if (danceability) params += `&target_danceability=${danceability+generateVariant()}`

    if (energy) params += `&target_energy=${energy+generateVariant()}`

    if (instrumentalness) params += `&target_instrumentalness=${instrumentalness+generateVariant()}`

    if (popularity) params += `&target_popularity=${popularity+(100*generateVariant())}`

    if (valence) params += `&target_valence=${valence+generateVariant()}`

    console.log(params)
    
    const reqConfig = {
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        }}

    return new Promise((resolve, reject) => {
        axios.get(`${spotifyRecsBaseURL}${params}`, reqConfig)
            .then(res => {
            const trackName = res.data.tracks[0].name
            const artistName = res.data.tracks[0].artists[0].name
            const albumName = res.data.tracks[0].album.name
            const trackLink = res.data.tracks[0].external_urls.spotify
            const albumCover = res.data.tracks[0].album.images[1].url
            const sampleLink = res.data.tracks[0].preview_url

            console.log('track:', trackName, ', artist:', artistName, ', album:', albumName)
            console.log('trackLink:', trackLink)
            console.log('albumCover:', albumCover)
            console.log('sampleLink:', sampleLink)
            
            //wrapping these items in curly braces makes them an object, where each value has key of same value. e.g. trackname: trackname
            // resolve already as JSON format so dont need JSON.stringify({trackName, artistName, albumName, trackLink, albumCover}))


            resolve ({trackName, artistName, albumName, trackLink, albumCover, sampleLink})

            })
            .catch(async err => {
                console.log('ERROR: here ==>', err.response.status)
                if (err.response.status === 401 && !retried) {
                    retried = true
                    console.log('touch')
                    // get new token vv
                    request.post(authOptions, function(error, response, body) {
                        if (!error && response.statusCode === 200) {
                            console.log(response.statusCode)
                            token = body.access_token;
                            console.log('token... ', token)
                        }
                    })
                    // await getSongRec({genre, acousticness, danceability, energy, instrumentalness, popularity, valence})
                }
            })
            .finally(() => {
                console.log('finally')
                retried = false
            })
    })
}

const port = process.env.PORT || 4444

app.listen(port, () => {
    console.log(`Listening on port ${port}`)
  })