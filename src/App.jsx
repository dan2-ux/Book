import { useEffect } from "react"
import axios from 'axios'
import {Routes, Route} from 'react-router-dom'
import Home from './pages/Home'
import Createbook from './pages/CreateBooks'
import DeleteBook from './pages/DeleteBooks'
import ShowBook from './pages/ShowBooks/ShowBooks'

export default function App(){
  return(
    <Routes>
      <Route path="/" element={<Home/>} />
      <Route path="/create/" element={<Createbook/>} />
      <Route path="/delete/:id" element={<DeleteBook/>} />
      <Route path="/show/:id" element={<ShowBook/>} />
    </Routes>
  )
}