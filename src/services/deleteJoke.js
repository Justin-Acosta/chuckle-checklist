

export const deleteJoke = async (jokeId) => {
    await fetch(`http://localhost:8088/jokes/${jokeId}`, {method: 'DELETE'})
}