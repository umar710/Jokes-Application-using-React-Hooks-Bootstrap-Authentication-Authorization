import React, {useState, useEffect} from 'react'

import {Button} from 'react-bootstrap'

import Cookies from 'js-cookie'
import {Redirect, withRouter} from 'react-router-dom'

import './index.css'

function JokeDisplay({jokes}) {
  return (
    <div>
      <h1 className="joke-title">Jokes</h1>
      <ul className="ul-list">
        {jokes.map((joke, value) => (
          // eslint-disable-next-line react/no-array-index-key
          <li className="jokes-text p-2" key={value}>
            {joke}
          </li>
        ))}
      </ul>
    </div>
  )
}

function Home(props) {
  const onClickLogOut = () => {
    const {history} = props
    Cookies.remove('jwt_token')
    history.replace('/login')
  }

  const [jokes, setJokes] = useState([])

  const fetchJokes = async () => {
    try {
      const response = await fetch(
        'https://v2.jokeapi.dev/joke/any?format=json&blacklistFlags=nsfw,sexist&type=single&lang=EN&amount=10',
      )
      const data = await response.json()
      const jokeArray = data.jokes.map(joke => joke.joke)
      setJokes(jokeArray)
    } catch (error) {
      console.error('Error fetching jokes:', error)
    }
  }

  useEffect(() => {
    fetchJokes()
  }, [])

  const onClickBtn = () => {
    fetchJokes()
  }

  const jwtToken = Cookies.get('jwt_token')
  if (jwtToken === undefined) {
    return <Redirect to="/login" />
  }

  return (
    <div className="home-page-container d-flex flex-column justify-content-center text-center">
      <h1 className="heading">Joke Generator</h1>
      <JokeDisplay jokes={jokes} />
      <div>
        <Button className="primary m-2" type="button" onClick={onClickBtn}>
          Fetch Jokes
        </Button>
        <Button className="btn-danger m-2" onClick={onClickLogOut}>
          Logout
        </Button>
      </div>
    </div>
  )
}

export default withRouter(Home)
