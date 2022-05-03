// reference code
//const drawFive = () => {
//     axios.get('/api/robots/five')
//         .then(res => {
//             choices = res.data.choices
//             compDuo = res.data.compDuo
//             renderChoices()
//             drawBtn.classList.add('hide')
//         })
// }

const { builtinModules } = require("module")

// const { default: axios } = require("axios")

module.exports = {

    // three: () => {
    //     return 3
    // }

    filters: {
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
    },

    OAuthToken: 'Bearer BQASGvNAL3JouXQjuhsEURi-v67yJBwG1wSXN88YnyOXC7pU1Zi5GnS1lL9DS5SQ4ywRh-iZBzMS0M088O7uLjYmWR-hcv9rskLMndD7xDHgqNP3n6IwDHXyU43Jj97oqWyaDywAB1ZRZ9mPwzsS4aFf6uFBWxmUZNM'
}

