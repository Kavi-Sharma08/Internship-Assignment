import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import { Routes , Route } from 'react-router-dom'
import {Form , CartComponent} from "./components/index.js"
import store from './store/store.js'
import { Provider } from 'react-redux'
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store = {store}>

    <BrowserRouter>
    <Routes>
      <Route path='/' element = {<App/>}></Route>
      <Route path='/add-items' element = {<Form/>}></Route>
      <Route path='/view-items' element = {<CartComponent/>}></Route>
    </Routes>
      
    </BrowserRouter>
    </Provider>
    
  </StrictMode>,
)
