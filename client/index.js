const songSection = document.getElementById('song-section')
const trackName = document.getElementById('track-name')
const artistName = document.getElementById('artist-name')
const albumName = document.getElementById('album-name')
const albumCover = document.getElementById('album-cover')
const trackLink = document.getElementById('track-link')
const sampleLink = document.getElementById('sample-link')
const sampleLinkP = document.getElementById("sample-link-p")

const test = document.getElementById('test')
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

const testLeverInput = document.querySelector("form#test-lever input")
const genreLeverInput = document.querySelector("form#genre-lever input")
const acousticnessLeverInput = document.querySelector("form#acousticness-lever input")
const danceabilityLeverInput = document.querySelector('form#danceability-lever input')
const energyLeverInput = document.querySelector('form#energy-lever input')
const instrumentalnessLeverInput = document.querySelector('form#instrumentalness-lever input')
const livenessLeverInput = document.querySelector('form#liveness-lever input')
const popularityLeverInput = document.querySelector('form#popularity-lever input')
const valenceLeverInput = document.querySelector('form#valence-lever input')

// let testLeverOnOff = () => testLeverInput.checked === true ? 'test lever is ON' : 'test lever is OFF'
// let genreLeverOnOff = () => genreLeverInput.checked === true ? 'genre lever is ON' : 'genre lever is OFF'

const addToggleButtonEventListener = (...filtersAndToggles) => {
    filtersAndToggles.forEach(filterAndToggle => {
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
        popularity: popularity.disabled ? null: +popularity.value,
        valence: valence.disabled ? null: valence.value/100,
        // speechiness: speechiness.disabled ? null: speechiness.value/100,
        // tempo: tempo.disabled ? null: tempo.value,
    }

    requestSongUsingFilters(filters)

})

// lever stuff

// adds event listener for disabling and javascript for animation
const addLeverFunctionality = (...filtersAndLevers) => {
    filtersAndLevers.forEach(filterAndLever => {

    let filter = filterAndLever[0]
    let lever = filterAndLever[1]

    lever.addEventListener('change', () => {
        event.preventDefault()

        if (lever.checked === true) {
            filter.disabled = false
        }
        if (lever.checked === false) {
            filter.disabled = true
        }

        lever.classList.remove("pristine");

        let ac = "aria-checked";
        lever.setAttribute(ac, lever.getAttribute(ac) == "true" ? "false" : "true");

        })
    })
}

addLeverFunctionality([test, testLeverInput], [genre, genreLeverInput], [acousticness, acousticnessLeverInput], [danceability, danceabilityLeverInput], [energy, energyLeverInput], [instrumentalness, instrumentalnessLeverInput], [liveness, livenessLeverInput], [popularity, popularityLeverInput], [valence, valenceLeverInput])


