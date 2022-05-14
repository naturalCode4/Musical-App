const express = require('express')
const cors = require('cors')
const axios = require('axios')
const path = require('path')
const app = express()

//this line of code routes frontend to backend. useful for getting things to log in terminal
// const frontEnd = require('../client/index.js')

app.use(express.json())
app.use(cors())

app.use('/static', express.static(path.join(__dirname, 'client')))

// app.get('/', (req, res) => {
//     res.sendFile(path.join(__dirname, '../client/index.html'))
// })

// app.get('/styles', (req, res) => {
//     res.sendFile(path.join(__dirname, '/styles.css'))
// })

app.get('/styles', (req, res) => {
    res.sendFile(path.join(__dirname, '/styles.scss'))
})

app.get('/js', (req, res) => {
    res.sendFile(path.join(__dirname, '/index.js'))
})

const OAuthToken = 'Bearer BQChZbfjXEbQauvkxI06aPZGunP1BXKkRgB9YlZiyJxFA5ghLWKNL4jGT0gllWBzgRbz3-rAj8YaAexDzYeGRr8w776thJrWkWk56et1Elf3d4hmxQVHgNiA-55UH-iAzoGjG7jMGdHjKYn4EzJbcAFlZHEWNoHQjuk'
const spotifyRecsBaseURL = 'https://api.spotify.com/v1/recommendations/'

app.post('/songRec', async (req, res) => {
    console.log('songRec endpoint hit on server')
    try {
    console.log(req.body.filters)
    const songRec = await getSongRec(req.body.filters)
    //.json (vs .send) makes it a json file. you need to send http requests in json form.
    //if data was already in json you could .send it
    //could also either of 2 below:
    res.status(200).send(JSON.stringify(songRec))
    // res.status(200).json(songRec)
    }
    catch (err) {
        console.log('There was an error ==>:', err)
    }
})


const getSongRec = ({ genre, acousticness, danceability, energy, instrumentalness, liveness, popularity, speechiness, tempo, valence }) => {
   
    console.log('getSongRec function called on server')

    const generateVariant = () => {
        let val = 1
        if (Math.random() < .5) { // this if block deterines whether variant will be positive or negative
            val = -1 
        }
        return variant = Math.round(val*25*Math.random())/100
    }

    let params = `?limit=1`

    if (genre) params += `&seed_genres=${genre.toLowerCase()}`
    
    if (acousticness) params += `&target_acousticness=${acousticness+generateVariant()}`
    
    if (danceability) params += `&target_danceability=${danceability+generateVariant()}`

    if (energy) params += `&target_energy=${energy+generateVariant()}`

    if (instrumentalness) params += `&target_instrumentalness=${instrumentalness+generateVariant()}`

    if (liveness) params += `&target_liveness=${liveness}`

    if (popularity) params += `&target_popularity=${popularity+(100*generateVariant())}`

    if (valence) params += `&target_valence=${valence+generateVariant()}`

    console.log(params)

    const reqConfig = {
        headers: {
            'Authorization': OAuthToken,
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
            .catch(err => {
                console.log('ERROR: something went wrong ==>', err.message, err.data)
            })
    })
}

const port = process.env.PORT || 4444

app.listen(port, () => {
    console.log(`Listening on port ${port}`)
  })