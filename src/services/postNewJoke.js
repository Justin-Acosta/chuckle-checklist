

export const postNewJoke = async (jokeObject) => {
    await fetch('http://localhost:8088/jokes', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(jokeObject)
    })
}

