import { useEffect, useState } from "react"
import "./App.css"
import { postNewJoke } from "./services/postNewJoke.js"
import { getJokesDatabase } from "./services/getJokesDatabase.js"
import { putJoke } from "./services/putJoke.js"
import { deleteJoke } from "./services/deleteJoke.js"

export const App = () => {

  //---state variables---

  const [jokesDatabase, setJokesDatabase] = useState([])
  const [toldJokes, setToldJokes] = useState([])
  const [untoldJokes, setUntoldJokes] = useState([])
  const [jokeInput, setJokeInput] = useState('')

  //---use effects---

  // useEffect(() => {
  //   fetchJokes()
  // },[])

  // const fetchJokes = async () => {
  //   const jokes = await getJokesDatabase()
  //   setJokesDatabase(jokes)
  // }

  useEffect(() => {

    try {
      getJokesDatabase().then(jokes => setJokesDatabase(jokes))

    } catch {
      window.alert('Joke database failed to GET')
    }
  }, [])


  useEffect(() => {
    // when jokes database updates, update told and untold jokes
    setToldJokes(jokesDatabase.filter(joke => joke.told))
    setUntoldJokes(jokesDatabase.filter(joke => !joke.told))  
    console.log('told and untold jokes assigned')
  }, [jokesDatabase])


  //---functions---

  const invokePostNewJoke = async () => {
    
    try {

      if (jokeInput !== '') {
  
        await postNewJoke({ text: jokeInput, told: false })
  
        await getJokesDatabase().then(jokes => { setJokesDatabase(jokes) })
  
        setJokeInput('')
  
        // ---note for below--
        // using .length + 1 here is unreliable because length will not 
        // represent largest ID if anything is deleted from the database
  
        // const jokesDatabaseId = jokesDatabase.length + 1
        // setJokesDatabase([...jokesDatabase, {id: jokesDatabaseId, text: jokeInput, told: false}])
      }

    } catch (error) {

      window.alert('New joke failed to POST')
    }
  }


  const invokePutJoke = (clickEvent) => {
    
    try {
      let jokeObject = jokesDatabase.find(joke => joke.id === parseInt(clickEvent.target.dataset.id))
      jokeObject.told = !jokeObject.told
  
      putJoke(jokeObject)
  
      //invokePutJoke() must be async for this code to run 
      // await getJokesDatabase().then(jokes => {setJokesDatabase(jokes)}) 
  
      const newJokesDatabase = jokesDatabase.map(joke => {
        if (joke.id === parseInt(clickEvent.target.dataset.id)) {
          joke.told = jokeObject.told
          return joke
        } else {
          return joke
        }
      })
  
      setJokesDatabase(newJokesDatabase)

    } catch {
      window.alert('Told joke failed to PUT')
    }
  }


  const invokeDeleteJoke = (clickEvent) => {
    
    try {
      deleteJoke(parseInt(clickEvent.target.dataset.id))
  
      //invokeDeleteJoke() must be async for this code to run 
      // await getJokesDatabase().then(jokes => {setJokesDatabase(jokes)})
  
      const newJokesDatabase = jokesDatabase.filter(joke => joke.id !== parseInt(clickEvent.target.dataset.id))
  
      setJokesDatabase(newJokesDatabase)

    } catch {
      window.alert('Joke failed to DELETE')
    }
    
  }


  //---html---

  return (

    // app container
    <div className="app-container">

      {/* header */}
      <div className="app-heading">
        <h2 className="app-heading-text">JOKES</h2>
      </div>

      {/* add joke form */}
      <h2>Add Joke</h2>
      <div className='joke-add-form'>
        <input
          className='joke-input'
          type='text'
          placeholder='New One Liner'
          value={jokeInput}
          onChange={(changeEvent) => { setJokeInput(changeEvent.target.value) }}
        />
        <button className="joke-input-submit" onClick={invokePostNewJoke}>Submit</button>
      </div>


      {/* told jokes list */}
      <div className="joke-lists-container">
        <article className="joke-list-container">
          <h2 className="joke-lists-header">Told Jokes</h2>

          {toldJokes.map(joke => {
            return (
              // list items should always be wrapped with <ul></ul> or <ol></ol>
              <li className="joke-list-item" key={joke.id}>
                <div className='joke-list-div'>{joke.text}</div>
                <button className='joke-list-button-switch' data-id={joke.id} onClick={(clickEvent) => invokePutJoke(clickEvent)}>Untold</button>
                <button className='joke-list-button-delete' data-id={joke.id} onClick={(clickEvent) => invokeDeleteJoke(clickEvent)}>Delete</button>
              </li>
            )
          })}

        </article>

        {/* untold jokes list */}
        <article className="joke-list-container">
          <h2 className="joke-lists-header">Untold Jokes</h2>

          {untoldJokes.map(joke => {
            return (
              // list items should always be wrapped with <ul></ul> or <ol></ol>
              <li className="joke-list-item" key={joke.id}>
                <div className='joke-list-div'>{joke.text}</div>
                <button className='joke-list-button-switch' data-id={joke.id} onClick={(clickEvent) => invokePutJoke(clickEvent)}>Told</button>
                <button className='joke-list-button-delete' data-id={joke.id} onClick={(clickEvent) => invokeDeleteJoke(clickEvent)}>Delete</button>
              </li>
            )
          })}

        </article>
      </div>
    </div>
  )
}
