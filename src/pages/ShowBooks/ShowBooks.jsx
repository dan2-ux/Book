import React, { useEffect, useState, useRef } from 'react'
import axios from 'axios'
import { useParams } from 'react-router-dom'
import MoveBack from '../../components/MoveBack'
import Spiner from '../../components/Spiner'

const ShowBooks = () => {
  const [book, setBook] = useState({})
  const [loading, setLoading] = useState(false)
  const {id} = useParams();
  const [dis, sDis] = useState("none")
  const [date, sDate] = useState()
  useEffect(() => {
    setLoading(true);
    axios
      .get(`http://localhost:5555/app/books/${id}`)
      .then((res) => {
        setLoading(false);
        setBook(res.data)
      })
      .catch((e) => {
        setLoading(false);
        console.log(e)
      })
  },[])
  console.log(book)
  return (
    <div>
      {loading ?
        <Spiner/>
        :
        <div >
          <MoveBack/>
          <div style={{height: "60vh"}} className='  d-flex justify-content-center align-items-center'>
            <div className=' px-lg-5 w-50 border border-2 border-black'>
              <div className='p-3 d-flex gap-2 '> 
                <span className=' text-secondary'>Id:</span>
                <span  >{book._id}</span>
              </div>
              <div className='p-3 d-flex gap-2'> 
                <span className=' text-secondary'>Title:</span>
                <span>{book.title}</span>
              </div>
              <div className='p-3 d-flex gap-2'> 
                <span className=' text-secondary'>Author:</span>
                <span>{book.author}</span>
              </div>
              <div className='p-3 d-flex gap-2'> 
                <span className=' text-secondary'>Publish Year:</span>
                <span>{book.yearPublish}</span>
              </div>
              <div className='p-3 d-flex gap-2'> 
                <span className=' text-secondary'>Create Time:</span>
                <span>{new Date(book.createdAt).getHours().toString()}:
                      {new Date(book.createdAt).getMinutes().toString()}
                      -{new Date(book.createdAt).getDate().toString()}
                      /
                      {new Date(book.createdAt).getMonth().toString()}
                      /
                      {new Date(book.createdAt).getFullYear().toString()}
                </span>
              </div>
              <div className='p-3 d-flex gap-2'> 
                <span className=' text-secondary'>Last Update:</span>
                <span>{new Date(book.updatedAt).getHours().toString()}:
                      {new Date(book.updatedAt).getMinutes().toString()}
                      -{new Date(book.updatedAt).getDate().toString()}
                      /
                      {new Date(book.updatedAt).getMonth().toString()}
                      /
                      {new Date(book.updatedAt).getFullYear().toString()}
                </span>
              </div>
            </div>
          </div>
          
        </div>
      }
    </div>
  )
}

export default ShowBooks
