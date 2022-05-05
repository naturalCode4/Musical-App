console.log('Hello. client/index.js reporting here')

let sampleFilters = {
    genre: 'jazz',
    acousticness: .7,
    danceability: null,
    energy: null,
    instrumentalness: .75,
    liveness: 0, //binary
    popularity: null, // 0 to 100
    // speechiness: null, //questionable whether this works
    // tempo: null, //exact tempo narrows down too much
    valence: null
    //year wasnt included in spotify's get recommendations
}

const genre = document.getElementById('genre')
const acousticness = document.getElementById('acousticness')
const danceability = document.getElementById('danceability')
const energy = document.getElementById('energy')
const instrumentalness = document.getElementById('instrumentalness')
const liveness = document.getElementById('liveness')
const popularity = document.getElementById('popularity')
// const speechiness = document.getElementById('speechiness')
// tempo = document.getElementById('tempo')
const valence = document.getElementById('valence')

const genreToggle = document.getElementById('genre-toggle')
const acousticnessToggle = document.getElementById('acousticness-toggle')
const danceabilityToggle = document.getElementById('danceability-toggle')
const energyToggle = document.getElementById('energy-toggle')
const instrumentalnessToggle = document.getElementById('instrumentalness-toggle')
const livenessToggle = document.getElementById('liveness-toggle')
const popularityToggle = document.getElementById('popularity-toggle')
const valenceToggle = document.getElementById('valence-toggle')
// const speechinessToggle = document.getElementById('speechiness-toggle')
// tempoToggle = document.getElementById('tempo-toggle')

// const songSection = document.getElementById('song-section')
const trackName = document.getElementById('track-name')
const artistName = document.getElementById('artist-name')
const albumName = document.getElementById('album-name')
const albumCover = document.getElementById('album-cover')
const trackLink = document.getElementById('track-link')
const sampleLink = document.getElementById('sample-link')


genreToggle.addEventListener('click', () => {
    event.preventDefault()
    if (genre.disabled === false) {
        genre.disabled = true
    } else {
        genre.disabled = false
    }
})

acousticnessToggle.addEventListener('click', () => {
    event.preventDefault()
    if (acousticness.disabled === false) {
        acousticness.disabled = true
    } else {
        acousticness.disabled = false
    }
})

danceabilityToggle.addEventListener('click', () => {
    event.preventDefault()
    if (danceability.disabled === false) {
        danceability.disabled = true
    } else {
        danceability.disabled = false
    }
})

energyToggle.addEventListener('click', () => {
    event.preventDefault()
    if (energy.disabled === false) {
        energy.disabled = true
    } else {
        energy.disabled = false
    }
})

instrumentalnessToggle.addEventListener('click', () => {
    event.preventDefault()
    if (instrumentalness.disabled === false) {
        instrumentalness.disabled = true
    } else {
        instrumentalness.disabled = false
    }
})

livenessToggle.addEventListener('click', () => {
    event.preventDefault()
    if (liveness.disabled === false) {
        liveness.disabled = true
    } else {
        liveness.disabled = false
    }
})

popularityToggle.addEventListener('click', () => {
    event.preventDefault()
    if (popularity.disabled === false) {
        popularity.disabled = true
    } else {
        popularity.disabled = false
    }
})

valenceToggle.addEventListener('click', () => {
    event.preventDefault()
    if (valence.disabled === false) {
        valence.disabled = true
    } else {
        valence.disabled = false
    }
})

const displaySongInfo = (songInfo) => {
    console.log(songInfo.sampleLink)

    trackName.textContent = "Track: " + songInfo.trackName
    artistName.textContent = "Artist: " + songInfo.artistName
    albumName.textContent = "Album: " + songInfo.albumName
    albumCover.src = songInfo.albumCover
    albumCover.alt = "Couldn't get album cover"
    trackLink.innerHTML = `<a href="${songInfo.trackLink}" target="_blank">
    Listen on Spotify</a>`
    sampleLink.innerHTML = `<source src="${songInfo.sampleLink}">`
    sampleLink.hidden = false
    if (songInfo.sampleLink == null) {
        sampleLink.innerHTML = `<source src="${songInfo.sampleLink}">`
    } else {
    sampleLink.alt = "Spotify doesn't have a sample for this track"
    }
}

//asynchronous function making post request to back end
const requestSongUsingFilters = async (filters) => {
    try {
        console.log('request function logging', filters)
        // console.log('from the request', filters)
        // use await keyword as in 'await a promise'. await and .then are the same thing -- just a convenient keyword
        //second argument of axios.post request is body
        const res = await axios.post('http://localhost:4444/songRec', {filters})
        // console.log(res.data)
        displaySongInfo(res.data)
    } catch (err) {
        console.log('Here was the error ==>:', err)
    }
}
    
document.getElementById('filters-button').addEventListener('click', () => {
    console.log('button clicked')

    if (liveness.checked == true) {
        liveness.value = 1
    } else {
        liveness.value = 0
    }
    
    let filters = {
        genre: genre.disabled ? null: genre.value,
        acousticness: acousticness.disabled ? null: acousticness.value/100,
        danceability: danceability.disabled ? null: danceability.value/100,
        energy: energy.disabled ? null: energy.value/100,
        instrumentalness: instrumentalness.disabled ? null: instrumentalness.value/100,
        liveness: liveness.disabled ? null: liveness.value,
        popularity: popularity.disabled ? null: popularity.value,
        valence: valence.disabled ? null: valence.value/100,
        // speechiness: speechiness.disabled ? null: speechiness.value/100,
        // tempo: tempo.disabled ? null: tempo.value,
    }

    requestSongUsingFilters(filters)

})