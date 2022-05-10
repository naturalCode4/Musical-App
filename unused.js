 // if (genre) {
    //     params += `&seed_genres=${genre.toLowerCase()}`
    // }
    // if (acousticness) {
    //     params += `&min_acousticness=${Math.round(100*(acousticness-.12))/100}&max_acousticness=${Math.round(100*(acousticness+.12))/100}`
    // }
    // if (danceability) {
    //     params += `&min_danceability=${Math.round(100*(danceability-.2))/100}&max_danceability=${Math.round(100*(danceability+.2))/100}`
    // }
    // if (energy) {
    //     params += `&min_energy=${Math.round(100*(energy-.15))/100}&max_energy=${Math.round(100*(energy+.15))/100}`
    // }
    // if (instrumentalness) {
    //     params += `&min_instrumentalness=${Math.round(100*(instrumentalness-.2))/100}&max_instrumentalness=${Math.round(100*(instrumentalness+.2))/100}`
    // }
    // if (liveness) {
    //     params += `&min_liveness=${Math.round(liveness-25)}&max_liveness=${Math.round(liveness+25)}` //binary. Can probably take math.round out later if you set input up correctly
    // }
    // if (popularity) {
    //     //fix popularity range later
    //     params += `&min_popularity=${popularity-20}&max_popularity=${Number(popularity)+20}`
    // }
    // if (speechiness) {
    //     params += `&min_speechiness=${Math.round(100*(speechiness-.25))/100}&max_speechiness=${Math.round(100*(speechiness+.25))/100}`
    // }
    // if (tempo) {
    //     params += `&target_tempo=${tempo}` //tempo exact
    // }
    // if (valence) {
    //     params += `&min_valence=${Math.round(100*(valence-.18))/100}&max_valence=${Math.round(100*(valence+.18))/100}`
    // }

    // let sampleFilters = {
    //     genre: 'jazz',
    //     acousticness: .7,
    //     danceability: null,
    //     energy: null,
    //     instrumentalness: .75,
    //     liveness: 0, //binary
    //     popularity: null, // 0 to 100
    //     valence: null
    //     // speechiness: null, //questionable whether we want this
    //     // tempo: null, //exact tempo narrows down too much
    //     //year wasnt included in spotify's get recommendations
    // }


//     genreToggle.addEventListener('click', () => {
//       event.preventDefault()
//       if (genre.disabled === false) {
//           genre.disabled = true
//       } else {
//           genre.disabled = false
//       }
//   })
  
//   acousticnessToggle.addEventListener('click', () => {
//       event.preventDefault()
//       if (acousticness.disabled === false) {
//           acousticness.disabled = true
//       } else {
//           acousticness.disabled = false
//       }
//   })
  
//   danceabilityToggle.addEventListener('click', () => {
//       event.preventDefault()
//       if (danceability.disabled === false) {
//           danceability.disabled = true
//       } else {
//           danceability.disabled = false
//       }
//   })
  
//   energyToggle.addEventListener('click', () => {
//       event.preventDefault()
//       if (energy.disabled === false) {
//           energy.disabled = true
//       } else {
//           energy.disabled = false
//       }
//   })
  
//   instrumentalnessToggle.addEventListener('click', () => {
//       event.preventDefault()
//       if (instrumentalness.disabled === false) {
//           instrumentalness.disabled = true
//       } else {
//           instrumentalness.disabled = false
//       }
//   })
  
//   livenessToggle.addEventListener('click', () => {
//       event.preventDefault()
//       if (liveness.disabled === false) {
//           liveness.disabled = true
//       } else {
//           liveness.disabled = false
//       }
//   })
  
//   popularityToggle.addEventListener('click', () => {
//       event.preventDefault()
//       if (popularity.disabled === false) {
//           popularity.disabled = true
//       } else {
//           popularity.disabled = false
//       }
//   })
  
//   valenceToggle.addEventListener('click', () => {
//       event.preventDefault()
//       if (valence.disabled === false) {
//           valence.disabled = true
//       } else {
//           valence.disabled = false
//       }
//   })



// liveness.addEventListener('change', () => {
    //     event.preventDefault()
    
    //     if (liveness.checked === true) {
    //         livenessChart.value = 10
    //     }
    //     if (liveness.checked === false) {
    //         livenessChart.value = 0
    //     }
    // })
    
    // livenessChart.addEventListener('input', () => {
    //     event.preventDefault()
    
    //     if (livenessChart.value == 10) {
    //         liveness.checked = true
    //     }
    //     if (livenessChart.value == 0) {
    //         liveness.checked = false
    //     }
    // })