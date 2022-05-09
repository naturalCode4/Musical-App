const songSection = document.getElementById('song-section')
const trackName = document.getElementById('track-name')
const artistName = document.getElementById('artist-name')
const albumName = document.getElementById('album-name')
const albumCover = document.getElementById('album-cover')
const trackLink = document.getElementById('track-link')
const sampleLink = document.getElementById('sample-link')
const sampleLinkP = document.getElementById("sample-link-p")

// these pertain to the inputs for each filter
const genre = document.getElementById('genre')
const acousticness = document.getElementById('acousticness')
const danceability = document.getElementById('danceability')
const energy = document.getElementById('energy')
const instrumentalness = document.getElementById('instrumentalness')
const liveness = document.getElementById('liveness')
const popularity = document.getElementById('popularity')
const valence = document.getElementById('valence')

const acousticnessLeverInput = document.querySelector("form#acousticness-lever input")
const danceabilityLeverInput = document.querySelector('form#danceability-lever input')
const energyLeverInput = document.querySelector('form#energy-lever input')
const instrumentalnessLeverInput = document.querySelector('form#instrumentalness-lever input')
const livenessLeverInput = document.querySelector('form#liveness-lever input')
const popularityLeverInput = document.querySelector('form#popularity-lever input')
const valenceLeverInput = document.querySelector('form#valence-lever input')

let genreChart = document.getElementsByClassName('genre')[0]
let acousticnessChart = document.getElementsByClassName('acousticness')[0]
let danceabilityChart = document.getElementsByClassName('danceability')[0]
let energyChart = document.getElementsByClassName('energy')[0]
let instrumentalnessChart = document.getElementsByClassName('instrumentalness')[0]
let livenessChart = document.getElementsByClassName('liveness')[0]
let popularityChart = document.getElementsByClassName('popularity')[0]
let valenceChart = document.getElementsByClassName('valence')[0]

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

addLeverFunctionality([acousticness, acousticnessLeverInput], [danceability, danceabilityLeverInput], [energy, energyLeverInput], [instrumentalness, instrumentalnessLeverInput], [liveness, livenessLeverInput], [popularity, popularityLeverInput], [valence, valenceLeverInput])

danceability.addEventListener('input', () => {
    event.preventDefault()
    danceabilityChart.value = danceability.value
})