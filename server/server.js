const express = require('express')
const axios = require('axios')
const path = require('path')

const app = express()

app.use(express.json())

app.use('/static', express.static(path.join(__dirname, 'client')))

const spotifyRecsBaseURL = 'https://api.spotify.com/v1/recommendations/'

let filters = {
    genre: 'french',
    acousticness: .85,
    danceability: .5,
    energy: null,
    instrumentalness: null,
    liveness: null, //binary
    popularity: 10,
    speechiness: .1, //questionable whether this works
    tempo: null, //exact tempo narrows down too much
    valence: .8
    //year wasnt included in spotify's get recommendations
}

const {genre, acousticness, danceability, energy, instrumentalness, liveness, popularity, speechiness, tempo, valence} = filters

// https://api.spotify.com/v1/recommendations
// ?limit=1&market=US&seed_genres=classical&
// target_acousticness=.5&target_danceability=.6&
// target_energy=.7&target_valence=.8

// https://api.spotify.com/v1/recommendations
// ?limit=1&market=US&seed_genres=classical&
// min_acousticness=.2&max_acousticness=.8&min_danceability=.3&
// max_danceability=.7&target_danceability=.5

const getFilteredMusic = (genre, acousticness, danceability, energy, instrumentalness, liveness, popularity, speechiness, tempo, valence) => {
    
    // personal decision: probably want to write in min and max values instead of target.
    // could just do add .1 on either side of target rather than intake min and max values
    let params = `?limit=1&market=US`
    if (genre) {
        params += `&seed_genres=${genre.toLowerCase()}`
    }
    if (acousticness) {
        params += `&min_acousticness=${Math.round(100*(acousticness-.15))/100}&max_acousticness=${Math.round(100*(acousticness+.15))/100}`
    }
    if (danceability) {
        params += `&min_danceability=${Math.round(100*(danceability-.2))/100}&max_danceability=${Math.round(100*(danceability+.2))/100}`
    }
    if (energy) {
        params += `&min_energy=${Math.round(100*(energy-.15))/100}&max_energy=${Math.round(100*(energy+.15))/100}`
    }
    if (instrumentalness) {
        params += `&min_instrumentalness=${Math.round(100*(instrumentalness-.2))/100}&max_instrumentalness=${Math.round(100*(instrumentalness+.2))/100}`
    }
    if (liveness) {
        params += `&target_liveness=${Math.round(liveness)}` //binary. Can probably take math.round out later if you set input up correctly
    }
    if (popularity) {
        params += `&min_popularity=${popularity-20}&max_popularity=${popularity+20}`
    }
    if (speechiness) {
        params += `&min_speechiness=${Math.round(100*(speechiness-.25))/100}&max_speechiness=${Math.round(100*(speechiness+.25))/100}`
    }
    if (tempo) {
        params += `&target_tempo=${tempo}` //tempo exact
    }
    if (valence) {
        params += `&min_valence=${Math.round(100*(valence-.18))/100}&max_valence=${Math.round(100*(valence+.18))/100}`
    }

    console.log(params)

    const reqConfig = {
        headers: {
            'Authorization': 'Bearer BQArh1AoKKWMlutDHR4lxwh2yQG9-uZvAMnVWUMbUdh9vVzMYV8U03LD5Ap6SVqkYanYZSFW1Nfa1_7OaTB5LdbmGhKFfJqyd-FwwIr536d6gM9jrMdQ6pOKFFdJjS1b2A5QAlDVpO_hx2Wi9LvXvs7nKBod1Wfir0E',
            'Content-Type': 'application/json'
        }}
    
    axios.get(`${spotifyRecsBaseURL}${params}`, reqConfig)
        .then(res => {
        const trackName = res.data.tracks[0].name
        const artistName = res.data.tracks[0].artists[0].name
        const albumName = res.data.tracks[0].album.name
        const trackLink = res.data.tracks[0].external_urls.spotify
        const albumCover = res.data.tracks[0].album.images[1].url
        // const sampleLink
        console.log('track:', trackName, ', artist:', artistName, ', album:', albumName)
        console.log('trackLink:', trackLink)
        console.log('albumCover:', albumCover)
        // console.log('sampleLink:', sampleLink)
        // console.log(res.data)
        
        })
        .catch(err => {
            console.log('ERROR: something went wrong ==>', err.message)
        })
}

// getFilteredMusic('?limit=1&market=ES&seed_artists=4NHQUGzhtTLFvgF5SZesLK&seed_genres=classical%2Ccountry&seed_tracks=0c6xIDDpzE81m2q797ordA')
getFilteredMusic(genre, acousticness, danceability, energy, instrumentalness, liveness, popularity, speechiness, tempo, valence)

const port = process.env.PORT || 4444

app.listen(port, () => {
    console.log(`Listening on port ${port}`)
  })