console.log('Hello. client/index.js reporting here')

let sampleFilters = {
    genre: 'jazz',
    acousticness: .7,
    danceability: null,
    energy: null,
    instrumentalness: .75,
    liveness: 0, //binary
    popularity: null, // 0 to 100
    valence: null
    // speechiness: null, //questionable whether we want this
    // tempo: null, //exact tempo narrows down too much
    //year wasnt included in spotify's get recommendations
}

const songSection = document.getElementById('song-section')
const trackName = document.getElementById('track-name')
const artistName = document.getElementById('artist-name')
const albumName = document.getElementById('album-name')
const albumCover = document.getElementById('album-cover')
const trackLink = document.getElementById('track-link')
const sampleLink = document.getElementById('sample-link')
const sampleLinkP = document.getElementById("sample-link-p")

const genre = document.getElementById('genre')
const acousticness = document.getElementById('acousticness')
const danceability = document.getElementById('danceability')
const energy = document.getElementById('energy')
const instrumentalness = document.getElementById('instrumentalness')
const liveness = document.getElementById('liveness')
const popularity = document.getElementById('popularity')
const valence = document.getElementById('valence')
// const speechiness = document.getElementById('speechiness')
// tempo = document.getElementById('tempo')

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

const addToggleButtonEventListener = (...filterAndToggles) => {
    filterAndToggles.forEach(filterAndToggle => {
        let filter = filterAndToggle[0]
        let toggle = filterAndToggle[1]
        toggle.addEventListener('click', () => {
            event.preventDefault()
            if (filter.disabled === false) {
                filter.disabled = true

            } else {
            filter.disabled = false
            }
        })
    })
}

addToggleButtonEventListener([genre, genreToggle], [acousticness, acousticnessToggle], [danceability, danceabilityToggle], [energy, energyToggle], [instrumentalness, instrumentalnessToggle], [liveness, livenessToggle], [popularity, popularityToggle], [valence, valenceToggle])

// const addToggleButtonEventListener = (...toggleButtons) => {
//     toggleButtons.forEach(toggleButton => {
//         toggleButton.addEventListener('click', () => {
//             event.preventDefault()
//             if (toggleButton.disabled === false) {
//                 toggleButton.disabled = true
//             } else {
//                 toggleButton.disabled = true
//             }
//         })
//     })
// }

// addToggleButtonEventListener(genreToggle, acousticnessToggle, danceabilityToggle, energyToggle, 
//     instrumentalnessToggle, livenessToggle, popularityToggle, valenceToggle)

// genreToggle.addEventListener('click', () => {
//     event.preventDefault()
//     if (genre.disabled === false) {
//         genre.disabled = true
//     } else {
//         genre.disabled = false
//     }
// })

// acousticnessToggle.addEventListener('click', () => {
//     event.preventDefault()
//     if (acousticness.disabled === false) {
//         acousticness.disabled = true
//     } else {
//         acousticness.disabled = false
//     }
// })

// danceabilityToggle.addEventListener('click', () => {
//     event.preventDefault()
//     if (danceability.disabled === false) {
//         danceability.disabled = true
//     } else {
//         danceability.disabled = false
//     }
// })

// energyToggle.addEventListener('click', () => {
//     event.preventDefault()
//     if (energy.disabled === false) {
//         energy.disabled = true
//     } else {
//         energy.disabled = false
//     }
// })

// instrumentalnessToggle.addEventListener('click', () => {
//     event.preventDefault()
//     if (instrumentalness.disabled === false) {
//         instrumentalness.disabled = true
//     } else {
//         instrumentalness.disabled = false
//     }
// })

// livenessToggle.addEventListener('click', () => {
//     event.preventDefault()
//     if (liveness.disabled === false) {
//         liveness.disabled = true
//     } else {
//         liveness.disabled = false
//     }
// })

// popularityToggle.addEventListener('click', () => {
//     event.preventDefault()
//     if (popularity.disabled === false) {
//         popularity.disabled = true
//     } else {
//         popularity.disabled = false
//     }
// })

// valenceToggle.addEventListener('click', () => {
//     event.preventDefault()
//     if (valence.disabled === false) {
//         valence.disabled = true
//     } else {
//         valence.disabled = false
//     }
// })

const displaySongInfo = (songInfo) => {
    console.log(songInfo.sampleLink)

    trackName.textContent = "Track: " + songInfo.trackName
    artistName.textContent = "Artist: " + songInfo.artistName
    albumName.textContent = "Album: " + songInfo.albumName
    albumCover.src = songInfo.albumCover
    albumCover.alt = "Couldn't get album cover"
    trackLink.innerHTML = `<a href="${songInfo.trackLink}" target="_blank">
    Listen on Spotify</a>`

    if (songInfo.sampleLink != null) {
        sampleLinkP.hidden = true // hide sample link if not hidden
        sampleLink.hidden = false //started hidden. When sample link exists, removes hidden attribute to display
        sampleLink.src = songInfo.sampleLink
    } else {
        sampleLink.hidden = true
        sampleLinkP.hidden = false //started hidden. When sample link is null, removes attribute to display
    }
}

//asynchronous function making post request to back end
const requestSongUsingFilters = async (filters) => {
    try {
        console.log('request function logging', filters)
        // use await keyword as in 'await a promise'. await and .then are the same thing -- just a convenient keyword
        //second argument of axios.post request is body
        const res = await axios.post('http://localhost:4444/songRec', {filters})
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