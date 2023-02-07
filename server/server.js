const express = require('express')
const cors = require('cors')
const axios = require('axios').default
const path = require('path')
const qs = require('querystring');
const app = express()
require('dotenv').config();

app.use(express.json())
app.use(cors())

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../client/index.html'))
})

app.get('/js', (req, res) => {
    res.sendFile(path.join(__dirname, '../client/index.js'))
})

app.get('/styles', (req, res) => {
    res.sendFile(path.join(__dirname, '../client/styles.css'))
})

let songRecommendation

app.post('/songRec', async (req, res) => {
    try {
        songRecommendation = await getSongRecommendation(req.body.filters)
        res.status(200).send(JSON.stringify(songRecommendation))
    }
    catch (err) {
        console.log('There was an error with /songRec endpoint==>:', err)
    }
})

const spotifyRecsBaseURL = 'https://api.spotify.com/v1/recommendations/'

////Authorization//////

const client_id = 'f8a2526a0dc7469884edac2d88b21ccd';
const client_secret = 'e2d91181ac5d4d58a884d1758a01bf1f';

const tokenURL = 'https://accounts.spotify.com/api/token'
const data = qs.stringify({'grant_type':'client_credentials'});
const authOptions = {
    headers: {
      'Authorization': 'Basic ' + (new Buffer(client_id + ':' + client_secret).toString('base64'))
    },
    form: {
      grant_type: 'client_credentials'
    },
    json: true
  };

let token = 'not declared yet'

let retried = false

const getSongRecommendation = ({ genre, acousticness, danceability, energy, instrumentalness, popularity, valence }) => {
    
    const generateVariant = () => {
        let val = 1
        if (Math.random() < .5) { // this if block deterines whether variant will be positive or negative
            val = -1 
        }
        return Math.round(val*25*Math.random())/100
    }

    let parameters = `?limit=1`

    if (genre) parameters += `&seed_genres=${genre.toLowerCase()}`
    
    if (acousticness) parameters += `&target_acousticness=${acousticness+generateVariant()}`
    
    if (danceability) parameters += `&target_danceability=${danceability+generateVariant()}`

    if (energy) parameters += `&target_energy=${energy+generateVariant()}`

    if (instrumentalness) parameters += `&target_instrumentalness=${instrumentalness+generateVariant()}`

    if (popularity) parameters += `&target_popularity=${popularity+(100*generateVariant())}`

    if (valence) parameters += `&target_valence=${valence+generateVariant()}`

    console.log(parameters)
    
    const requestConfiguration = {
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        }}

    return new Promise((resolve, reject) => {
        axios.get(`${spotifyRecsBaseURL}${parameters}`, requestConfiguration)
            .then(res => {
            const trackName = res.data.tracks[0].name
            const artistName = res.data.tracks[0].artists[0].name
            const albumName = res.data.tracks[0].album.name
            const trackLink = res.data.tracks[0].external_urls.spotify
            const albumCover = res.data.tracks[0].album.images[1].url
            const sampleLink = res.data.tracks[0].preview_url
            
            resolve ({trackName, artistName, albumName, trackLink, albumCover, sampleLink})
            })
            .catch(async err => {
                console.log('Error getting song recommendation ==>', err.response.status)
                if (err.response.status === 401 && !retried) {
                    // get new token below on fail
                    try {
                        const tokenRes = await axios.post(tokenURL, data, authOptions) 
                        token = tokenRes.data.access_token
                    }
                    catch(err){
                        console.log('err ', err)
                    }
                    if (token !== 'not declared yet') {
                        const retriedSongRecommendation = await getSongRecommendation({genre, acousticness, danceability, energy, instrumentalness, popularity, valence})
                        resolve (retriedSongRecommendation)
                    } else {console.log('something went wrong')}
                }
            })
            .finally(() => {
                retried = false
            })
    })
}

const port = process.env.PORT || 4444

app.listen(port, () => {
    console.log(`Listening on port ${port}`)
  })