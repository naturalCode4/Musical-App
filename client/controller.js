
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