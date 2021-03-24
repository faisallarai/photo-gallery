import React, { useEffect } from 'react'
import { Switch, Route } from 'react-router-dom'
import Header from './components/Header'
import Gallery from './components/Gallery'
import Home from './components/Home'
import Notification from './components/Notification'
import { listPhotos } from './reducers/photos'
import { useDispatch } from 'react-redux'


const App = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(listPhotos())
  }, [dispatch])

  return (
    <>
      <Header />
      <Notification />
      <Switch>
        <Route path="/gallery" component={Gallery} />
        <Route path="/" component={Home} exact />
      </Switch>
    </>
  )
}

export default App;
