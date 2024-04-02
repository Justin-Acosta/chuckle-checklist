

export const putJoke = async (editedJoke) => {
    await fetch(`http://localhost:8088/jokes/${editedJoke.id}`,{
        method: 'PUT',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(editedJoke)
    })
}

// const modifiedMineralObject = await mineralSubtracter()

// const putOptions = {
//     method: 'PUT',
//     headers: { 
//         'Content-Type': 'application/json'
//     },
//     body: JSON.stringify(modifiedMineralObject)
// }

// await fetch(`http://localhost:6969/minerals/${getMineral()}`, putOptions)