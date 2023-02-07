document.body.style.zoom = "40%"

const songSection = document.getElementById('song-section')
const trackName = document.getElementById('track-name')
const artistName = document.getElementById('artist-name')
const albumName = document.getElementById('album-name')
const albumCover = document.getElementById('album-cover')
const trackLink = document.getElementById('track-link')
const sampleLink = document.getElementById('sample-link')
const sampleLinkP = document.getElementById("sample-link-p")

// inputs for each filter
const genre = document.getElementById('genre')
const acousticness = document.getElementById('acousticness')
const danceability = document.getElementById('danceability')
const energy = document.getElementById('energy')
const instrumentalness = document.getElementById('instrumentalness')
const popularity = document.getElementById('popularity')
const valence = document.getElementById('valence')

// levers
const acousticnessLeverInput = document.querySelector("form#acousticness-lever input")
const danceabilityLeverInput = document.querySelector('form#danceability-lever input')
const energyLeverInput = document.querySelector('form#energy-lever input')
const instrumentalnessLeverInput = document.querySelector('form#instrumentalness-lever input')
const popularityLeverInput = document.querySelector('form#popularity-lever input')
const valenceLeverInput = document.querySelector('form#valence-lever input')

// chart filters
const acousticnessChart = document.getElementsByClassName('acousticness')[0]
const danceabilityChart = document.getElementsByClassName('danceability')[0]
const energyChart = document.getElementsByClassName('energy')[0]
const valenceChart = document.getElementsByClassName('valence')[0]
const instrumentalnessChart = document.getElementsByClassName('instrumentalness')[0]
const popularityChart = document.getElementsByClassName('popularity')[0]

const displaySongInfo = (songInfo) => {

    trackName.textContent = "TRACK: " + songInfo.trackName
    artistName.textContent = "ARTIST: " + songInfo.artistName
    albumName.textContent = "ALBUM: " + songInfo.albumName
    albumCover.src = songInfo.albumCover
    albumCover.alt = "Couldn't get album cover"
    trackLink.innerHTML = `<a href="${songInfo.trackLink}" target="_blank">
    Listen on Spotify</a>`

    if (songInfo.sampleLink != null) {
        sampleLinkP.hidden = true
        sampleLink.src = songInfo.sampleLink
    } else {
        sampleLinkP.hidden = false
    }
}

const requestNewSong = async (filters) => {
    try {
        const res = await axios.post('/songRec', {filters})
        displaySongInfo(res.data)
    } catch (err) {
        console.log('There was an error ==>:', err)
    }
}
    
document.getElementById('filters-button').addEventListener('click', () => {
    console.log('Getting new song!')
    let filters = {
        genre: genre.disabled ? null: genre.value,
        acousticness: acousticness.disabled ? null: acousticness.value/100,
        danceability: danceability.disabled ? null: danceability.value/100,
        energy: energy.disabled ? null: energy.value/100,
        instrumentalness: instrumentalness.disabled ? null: instrumentalness.value/100,
        popularity: popularity.disabled ? null: +popularity.value,
        valence: valence.disabled ? null: valence.value/100,
    }

    requestNewSong(filters)
})

// lever animation js//
const giveLeverJavascriptFunctionality = (...filtersLeversAndCharts) => {
    filtersLeversAndCharts.forEach(filterLeverAndChart => {

    let filter = filterLeverAndChart[0]
    let lever = filterLeverAndChart[1]
    let chart = filterLeverAndChart[2]

    lever.addEventListener('change', () => {
        event.preventDefault()

        if (lever.checked === true) {
            filter.disabled = false
            chart.disabled = false
        }
        if (lever.checked === false) {
            filter.disabled = true
            chart.disabled = true
        }

        lever.classList.remove("pristine");

        let ac = "aria-checked";
        lever.setAttribute(ac, lever.getAttribute(ac) == "true" ? "false" : "true");
        })
    })
}

giveLeverJavascriptFunctionality([acousticness, acousticnessLeverInput, acousticnessChart], [danceability, danceabilityLeverInput, danceabilityChart], [energy, energyLeverInput, energyChart], [instrumentalness, instrumentalnessLeverInput, instrumentalnessChart], [popularity, popularityLeverInput, popularityChart], [valence, valenceLeverInput, valenceChart])

const connectSliderAndChartFilters = (...inputsAndCharts) => {
    inputsAndCharts.forEach(inputAndChart => {

        let input = inputAndChart[0]
        let chart = inputAndChart[1]

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

connectSliderAndChartFilters([acousticness, acousticnessChart], [valence, valenceChart], [danceability, danceabilityChart], [energy, energyChart], [instrumentalness, instrumentalnessChart], [popularity, popularityChart])  

const dropdownContent = document.getElementsByClassName('dropdown-content')[0]

dropdownContent.addEventListener('mouseover', toggleDisplayDropdownContentOnMouseoverAndMouseout)
dropdownContent.addEventListener('mouseout', toggleDisplayDropdownContentOnMouseoverAndMouseout)
genre.addEventListener('mouseover', toggleDisplayDropdownContentOnMouseoverAndMouseout)
genre.addEventListener('mouseout', toggleDisplayDropdownContentOnMouseoverAndMouseout)

function toggleDisplayDropdownContentOnMouseoverAndMouseout() {
    console.log('entered toggledisplay')
    if (dropdownContent.style.display === "block") {
        dropdownContent.style.display = "none"
    } else {
        dropdownContent.style.display = "block"
    }
}

let genreItems = document. querySelectorAll(".dropdown-content div")
for (let i=0; i<genreItems.length; i++) {
    genreItems[i].addEventListener("click", () => {genre.value=genreItems[i].innerHTML})
}