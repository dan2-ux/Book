import React, { useEffect, useState } from 'react'
import MoveBack from '../components/MoveBack'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import Spiner from '../components/Spiner'

const DeleteBooks = () => {
  const {id} = useParams();
  const [book, sBook] = useState({});
  const navigate = useNavigate()
  useEffect(() => {
    axios
      .get(`http://localhost:5555/app/books/${id}`)
      .then((res) => {
        sBook(res.data)
      })
      .catch((e) => {
        alert(e)
      })
  }, [])
  console.log(book)
  function doDelete(){
    axios
      .delete(`http://localhost:5555/app/books/${id}`,)
      .then(() => {
        <Spiner/>
        navigate('/')
      })
      .catch((e) => {
        alert(e)
      })
  }
  return (
    <div>
      <MoveBack />
      <div className='p-1 p-lg-5 d-flex justify-content-center align-items-center'>
        <span className='fs-5'>Are you sure you want to delete {book.title} book?</span>
          <button className='btn btn-primary m-1' onClick={doDelete}>Yes</button>
        </div>
    </div>
  )
}

export default DeleteBooks
