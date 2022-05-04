console.log('Hello. client/index.js reporting here')

let filters = {
    genre: document.getElementById('genre').value,
    acousticness: document.getElementById('acousticness').value/100,
    danceability: document.getElementById('danceability').value/100,
    energy: document.getElementById('energy').value/100,
    instrumentalness: document.getElementById('instrumentalness').value/100,
    liveness: document.getElementById('liveness').value,
    popularity: document.getElementById('popularity').value,
    speechiness: document.getElementById('speechiness').value/100,
    tempo: document.getElementById('tempo').value,
    valence: document.getElementById('valence').value/100,
}

const songSection = document.getElementById('song-section')

let sampleFilters = {
    genre: 'singer-songwriter',
    acousticness: .8,
    danceability: null,
    energy: .25,
    instrumentalness: null,
    liveness: null, //binary
    popularity: 0, // 0 to 100
    speechiness: null, //questionable whether this works
    tempo: null, //exact tempo narrows down too much
    valence: .75
    //year wasnt included in spotify's get recommendations
}

const displaySongInfo = (songInfo) => {
    console.log(songInfo)
    // It is going to make more sense to create the elements statically in HTML and add to them.
    // Better for structuring intentionally and predictability
    songSection.innerHTML = ''

    const trackName = document.createElement('p')
    const artistName = document.createElement('p')
    const albumName = document.createElement('p')
    const albumCover = document.createElement('img')
    const trackLink = document.createElement('p')

    trackName.textContent = "Track: " + songInfo.trackName
    artistName.textContent = "Artist: " + songInfo.artistName
    albumName.textContent = "Album: " + songInfo.albumName
    albumCover.src = songInfo.albumCover
    albumCover.alt = "Couldn't get album cover"
    trackLink.textContent = "Listen on Spotify: " + songInfo.trackLink

    songSection.append(trackName)
    songSection.append(artistName)
    songSection.append(albumName)
    songSection.append(albumCover)
    songSection.append(trackLink)
}

//asynchronous function making post request to back end
const requestSongUsingFilters = async () => {
    try {
    // use await keyword as in 'await a promise'. await and .then are the same thing -- just a convenient keyword
    //second argument of axios.post request is body
    const res = await axios.post('http://localhost:4444/songRec', {sampleFilters})
    // console.log(res.data)
    displaySongInfo(res.data)
    } catch (err) {
        console.log('Here was the error ==>:', err)
    }
}
    
document.getElementById('filters-button').addEventListener('click', () => {
    console.log('button clicked')
    // console.log(filters)
    requestSongUsingFilters()
})


