console.log('hello from index.js')

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

const acousticnessChart = document.getElementsByClassName('acousticness')[0]
const danceabilityChart = document.getElementsByClassName('danceability')[0]
const energyChart = document.getElementsByClassName('energy')[0]
const valenceChart = document.getElementsByClassName('valence')[0]
const instrumentalnessChart = document.getElementsByClassName('instrumentalness')[0]
const livenessChart = document.getElementsByClassName('liveness')[0]
const popularityChart = document.getElementsByClassName('popularity')[0]

const livenessValue = () => {
    if (liveness.checked == true) {
        liveness.value = 1
    } else {
        liveness.value = 0
    }
}

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

    livenessValue()
    // make sure this calls properly. scope is cool and stuff
    
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

const connectFilterInputs = (...inputsAndCharts) => {
    inputsAndCharts.forEach(inputAndChart => {

        let input = inputAndChart[0]
        let chart = inputAndChart[1]

        console.log('not live', input, chart)

        input.addEventListener('input', () => {
            event.preventDefault()
            chart.value = input.value/10
        })

        chart.addEventListener('input', () => {
            event.preventDefault()
            input.value = chart.value*10
        })
    })
}

connectFilterInputs([acousticness, acousticnessChart], [danceability, danceabilityChart], [energy, energyChart], [instrumentalness, instrumentalnessChart], [popularity, popularityChart], [valence, valenceChart])

input.addEventListener('change', () => {
    event.preventDefault()

    if (input.checked === true) {
        chart.value = 10
    }
    if (input.checked === false) {
        chart.value = 0
    }
})

chart.addEventListener('input', () => {
    event.preventDefault()

    if (chart.value === 10) {
        input.checked = true
    }
    if (chart.value === 0) {
        input.checked === false
    }
})

// danceability.addEventListener('input', () => {
//     event.preventDefault()
//     danceabilityChart.value = danceability.value
// })