

export const getJokesDatabase = () => {
    return fetch('http://localhost:8088/jokes').then(res => res.json())
}