document.body.style.zoom = "40%"

console.log('Here are the valid genres:\nacoustic, afrobeat, alt-rock, alternative, ambient, anime, black-metal, bluegrass, blues, bossanova, brazil, breakbeat, british, cantopop, chicago-house, children, chill, classical, club, comedy, country, dance, dancehall, death-metal, deep-house, detroit-techno, disco, disney, drum-and-bass, dub, dubstep, edm, electro, electronic, emo, folk, forro, french, funk, garage, german, gospel, goth, grindcore, groove, grunge, guitar, happy, hard-rock, hardcore, hardstyle, heavy-metal, hip-hop, holidays, honky-tonk, house, idm, indian, indie, indie-pop, industrial, iranian, j-dance, j-idol, j-pop, j-rock, jazz, k-pop, kids, latin, latino, malay, mandopop, metal, metal-misc, metalcore, minimal-techno, movies, mpb, new-age, new-release, opera, pagode, party, philippines-opm, piano, pop, pop-film, post-dubstep, power-pop, progressive-house, psych-rock, punk, punk-rock, r-n-b, rainy-day, reggae, reggaeton, road-trip, rock, rock-n-roll, rockabilly, romance, sad, salsa, samba, sertanejo, show-tunes, singer-songwriter, ska, sleep, songwriter, soul, soundtracks, spanish, study, summer, swedish, synth-pop, tango, techno, trance, trip-hop, turkish, work-out, world-music')

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
const popularity = document.getElementById('popularity')
const valence = document.getElementById('valence')

const acousticnessLeverInput = document.querySelector("form#acousticness-lever input")
const danceabilityLeverInput = document.querySelector('form#danceability-lever input')
const energyLeverInput = document.querySelector('form#energy-lever input')
const instrumentalnessLeverInput = document.querySelector('form#instrumentalness-lever input')
const popularityLeverInput = document.querySelector('form#popularity-lever input')
const valenceLeverInput = document.querySelector('form#valence-lever input')

const acousticnessChart = document.getElementsByClassName('acousticness')[0]
const danceabilityChart = document.getElementsByClassName('danceability')[0]
const energyChart = document.getElementsByClassName('energy')[0]
const valenceChart = document.getElementsByClassName('valence')[0]
const instrumentalnessChart = document.getElementsByClassName('instrumentalness')[0]
const popularityChart = document.getElementsByClassName('popularity')[0]

const displaySongInfo = (songInfo) => {
    console.log(songInfo.trackLink)

    trackName.textContent = "TRACK: " + songInfo.trackName
    artistName.textContent = "ARTIST: " + songInfo.artistName
    albumName.textContent = "ALBUM: " + songInfo.albumName
    albumCover.src = songInfo.albumCover
    albumCover.alt = "Couldn't get album cover"
    trackLink.innerHTML = `<a href="${songInfo.trackLink}" target="_blank">
    Listen on Spotify</a>`

    if (songInfo.sampleLink != null) {
        sampleLinkP.hidden = true // hide sample link if not hidden
        sampleLink.src = songInfo.sampleLink
    } else {
        sampleLinkP.hidden = false //started hidden. When sample link is null, removes attribute to display
    }
}

// const testOrGetToken = () => {

//     //try catch -->
//     //if 200 success, follow through, get song
//     //if 401 err, get new token, try again (once)

// }

//asynchronous function making post request to back end
const requestSongUsingFilters = async (filters) => {
    try {
        //second argument of axios.post request is body
        const res = await axios.post('/songRec', {filters})
        displaySongInfo(res.data)
    } catch (err) {
        console.log('Here was the error ==>:', err)
        // if (err instanceof )
    }
}
    
document.getElementById('filters-button').addEventListener('click', () => {
    let filters = {
        genre: genre.disabled ? null: genre.value,
        acousticness: acousticness.disabled ? null: acousticness.value/100,
        danceability: danceability.disabled ? null: danceability.value/100,
        energy: energy.disabled ? null: energy.value/100,
        instrumentalness: instrumentalness.disabled ? null: instrumentalness.value/100,
        popularity: popularity.disabled ? null: +popularity.value,
        valence: valence.disabled ? null: valence.value/100,
    }

    requestSongUsingFilters(filters)

})

// lever animation //

const addLeverFunctionality = (...filtersLeversAndCharts) => {
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

addLeverFunctionality([acousticness, acousticnessLeverInput, acousticnessChart], [danceability, danceabilityLeverInput, danceabilityChart], [energy, energyLeverInput, energyChart], [instrumentalness, instrumentalnessLeverInput, instrumentalnessChart], [popularity, popularityLeverInput, popularityChart], [valence, valenceLeverInput, valenceChart])

const connectFilterInputs = (...inputsAndCharts) => {
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

connectFilterInputs([acousticness, acousticnessChart], [valence, valenceChart], [danceability, danceabilityChart], [energy, energyChart], [instrumentalness, instrumentalnessChart], [popularity, popularityChart])