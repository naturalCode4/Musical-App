const express = require('express')
const axios = require('axios')
const path = require('path')

const app = express()

app.use(express.json())

app.use('/static', express.static(path.join(__dirname, 'client')))

const spotifyRecsBaseURL = 'https://api.spotify.com/v1/recommendations/'

let filterInfo = {
    genre: 'pop',
    acousticness: .5,
    danceability: .5,
}

const {genre, acousticness, danceability} = filterInfo
// https://api.spotify.com/v1/recommendations
// ?limit=1&market=US&seed_genres=classical&
// target_acousticness=.5&target_danceability=.6&
// target_energy=.7&target_valence=.8

// https://api.spotify.com/v1/recommendations
// ?limit=1&market=US&seed_genres=classical&
// min_acousticness=.2&max_acousticness=.8&min_danceability=.3&
// max_danceability=.7&target_danceability=.5

const getFilteredMusic = (genre, acousticness, danceability) => {
    
    // personal decision: probably want to write in min and max values instead of target.
    // could just do add .1 on either side of target rather than intake min and max values
    let params = `?limit=1&market=US`
    if (genre) {
        params += `&seed_genres=${genre}`
    }
    if (acousticness) {
        params += `&min_acousticness=${acousticness-.15}&max_acousticness=${acousticness+.15}`
    }
    if (danceability) {
        params += `&min_danceability=${danceability-.2}&max_danceability=${danceability+.2}`
    }

    console.log(params)

    const reqConfig = {
        headers: {
            'Authorization': 'Bearer BQB_eChRxfCkbqmsKObvDIzJSYptouFbosg3aU6LXV-pxzCRSXF-QfxyhkmrRlf6iJc8RsB9bVnGBN4SyGcZvwho9owAXp_CYI34IotBJGHczA3gjiuF1MtGUfMvbwtecvdgDiYjKBtetdDkrmFim4UfoWW2R7K4Ogg',
            'Content-Type': 'application/json'
        }}
    
    axios.get(`${spotifyRecsBaseURL}${params}`, reqConfig)
        .then(res => {
        const trackName = res.data.tracks[0].name
        const artistName = res.data.tracks[0].artists[0].name
        const albumName = res.data.tracks[0].album.name
        // const sampleLink
        // const spotifyLink
        // const albumCover
        console.log('success...', trackName, artistName, albumName)
        
        })
        .catch(err => {
            console.log('ERROR: something went wrong ==>', err.message)
        })
}

// getFilteredMusic('?limit=1&market=ES&seed_artists=4NHQUGzhtTLFvgF5SZesLK&seed_genres=classical%2Ccountry&seed_tracks=0c6xIDDpzE81m2q797ordA')
getFilteredMusic(genre, acousticness, danceability)


const port = process.env.PORT || 4444

app.listen(port, () => {
    console.log(`Listening on port ${port}`)
  })