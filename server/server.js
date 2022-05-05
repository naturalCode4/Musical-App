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

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../client/index.html'))
})

app.get('/styles', (req, res) => {
    res.sendFile(path.join(__dirname, '/styles.js'))
})

app.get('/js', (req, res) => {
    res.sendFile(path.join(__dirname, '/index.js'))
})

const OAuthToken = 'Bearer BQBkkB8UPLpOX36RnPQKxhFh8XTpEFb-b1zPHckuu0sWHA6qQyMQs3ReGkQPQNGcK6eSldvfBCjXIwkBf55FMIwIwE_x3CuMdxBh3D-nEletNeE6Ud1I4EoUKtB73DNY78A0f7724nGjuW8GRvOyq1WY-JsA4ggY75w'
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
    
    // personal decision: probably want to write in min and max values instead of target.
    // could just do add .1 on either side of target rather than intake min and max values

    let params = `?limit=1`

    if (genre) params += `&seed_genres=${genre.toLowerCase()}`
    
    if (acousticness) params += `&target_acousticness=${acousticness}`
    
    if (danceability) params += `&target_danceability=${danceability}`

    if (energy) params += `&target_energy=${energy}`

    if (instrumentalness) params += `&target_instrumentalness=${instrumentalness}`

    if (liveness) params += `&target_liveness=${liveness}`

    if (popularity) params += `&target_popularity=${popularity}`

    if (valence) params += `&target_valence=${valence}`

    // if (speechiness) params += `&target_speechiness=${speechiness}`

    // if (tempo) params += `&target_tempo=${tempo}`



    // if (genre) {
    //     params += `&seed_genres=${genre.toLowerCase()}`
    // }
    // if (acousticness) {
    //     params += `&min_acousticness=${Math.round(100*(acousticness-.12))/100}&max_acousticness=${Math.round(100*(acousticness+.12))/100}`
    // }
    // if (danceability) {
    //     params += `&min_danceability=${Math.round(100*(danceability-.2))/100}&max_danceability=${Math.round(100*(danceability+.2))/100}`
    // }
    // if (energy) {
    //     params += `&min_energy=${Math.round(100*(energy-.15))/100}&max_energy=${Math.round(100*(energy+.15))/100}`
    // }
    // if (instrumentalness) {
    //     params += `&min_instrumentalness=${Math.round(100*(instrumentalness-.2))/100}&max_instrumentalness=${Math.round(100*(instrumentalness+.2))/100}`
    // }
    // if (liveness) {
    //     params += `&min_liveness=${Math.round(liveness-25)}&max_liveness=${Math.round(liveness+25)}` //binary. Can probably take math.round out later if you set input up correctly
    // }
    // if (popularity) {
    //     //fix popularity range later
    //     params += `&min_popularity=${popularity-20}&max_popularity=${Number(popularity)+20}`
    // }
    // if (speechiness) {
    //     params += `&min_speechiness=${Math.round(100*(speechiness-.25))/100}&max_speechiness=${Math.round(100*(speechiness+.25))/100}`
    // }
    // if (tempo) {
    //     params += `&target_tempo=${tempo}` //tempo exact
    // }
    // if (valence) {
    //     params += `&min_valence=${Math.round(100*(valence-.18))/100}&max_valence=${Math.round(100*(valence+.18))/100}`
    // }

    console.log(params)

    const reqConfig = {
        headers: {
            //later we're going to retreive OAuthToken to front-end to be received by user and passed into header of request
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
            
            //wrapping these items in curly braces makes them an object, where each value has key of same value. i.e. trackname: trackname
            // resolve (JSON.stringify({trackName, artistName, albumName, trackLink, albumCover}))
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