import React, {useEffect, useState} from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import { AiOutlineDelete } from 'react-icons/ai'
import {BsInfoCircle} from 'react-icons/bs'
import { MdOutlineAddBox } from 'react-icons/md'
import CreateBooks from './CreateBooks'
import EditT from './EditT'
import EditA from './EditA'
import EditR from './EditR'
import { useNavigate } from 'react-router-dom'

const Home = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false)
  const [id, sId] = useState()
  const [ud, sUd] = useState(true);
  const [ao, sAo] = useState(false);
  const [rd, sRd] = useState(false);
  const [name, sName] = useState("")
  const [num, sNum ] = useState(0)
  const navigate = useNavigate()
  const [page, sPage] = useState(1);

  useEffect(() => {
    setLoading(true);
    if(ud === true){
      axios
        .get('http://localhost:555/app/books/')
        .then((res) =>{
          setBooks(res.data);
          setLoading(false);
        })
        .catch((e) => {
          console.log(e);
          setLoading(false)
        })
    }
    else if(ao === true){
      axios
        .get('http://localhost:555/app/books/')
        .then((res) => {
          const alphabet = res.data.sort((a,b) => a.title.localeCompare(b.title));
          setBooks(alphabet)
          setLoading(false)
        })
        .catch((e) => {
          setLoading(false)
          console.log(e)
        })
    }
    else if(rd === true){
      axios
        .get("http://localhost:555/app/books/")
        .then((res) => {
          const date = res.data.sort((a,b) => a.yearPublish - b.yearPublish);
          setBooks(date);
          setLoading(false);
        })
        .catch((e) => {
          setLoading(false);
          console.log(e)
        })
    }
  },[ud,ao,rd])
  function doFind(){
    const newName = name.split(" ").map((e) => e.charAt(0).toUpperCase() + e.slice(1)).join(" ")
    const find = books.find((e) => e.title === newName)
    if(find && name !== ""){
      navigate(`/show/${find._id}`)
    }
  }
  useEffect((event) => {
    const handlePress = (e) => {
      event.preventDefault()
      if(e.key === "Enter" && name !== ""){
        doFind();
      }
    }
    document.addEventListener("keydown" , handlePress);
    return () => {
      document.removeEventListener("keydown", handlePress)
    }
  }, [name])
  console.log(books)
  useEffect(() => {
    const up = document.getElementById("up");
    const down = document.getElementById("down");
    if(page === 1 ){
      down.disabled = true
    }
    else if(books.length - num  <= 7){
      up.disabled = true
    }
    else{
      up.disabled = false;
      down.disabled = false;
    }
  }, [page])
  return (
    <div className="p-4">
      <div className=' modal fade w-100' id='modal'>
          <CreateBooks />
      </div>
      <div className='modal fade' id='title'>
        <EditT id={id}/>
      </div>
      <div className='modal fade' id='author'>
        <EditA id={id}/>
      </div>
      <div className='modal fade' id='year'>
        <EditR id={id}/>
      </div>
      <div className="d-flex justify-content-between align-items-center">
          <h1 className="fs-2 my-4 text-primary">Books List</h1>
          <div className='w-50 container'>
            <div className=' row g-0'>
              <div className=' col-10'>
                <input type="text" placeholder='Title' 
                className="form-control rounded rounded-start-5 " value={name} onChange={(e) => sName(e.target.value)}/>
              </div>
              <button type='submit' className=' rounded rounded-end-5 col-2 d-flex 
              justify-content-center align-items-center btn btn-primary'
              onClick={ doFind}>
                <i className="fa-solid fa-magnifying-glass"></i>
              </button>
            </div>
          </div>
          <div className=''>
            <MdOutlineAddBox style={{cursor: "pointer"}} className='fs-1 text-primary' 
            data-bs-toggle="modal"
            data-bs-target="#modal"/>
          </div>
        </div>
      <div className=' pb-3 gap-5 d-flex justify-content-center align-content-center'>
        <button 
        className={ud ? "btn btn-primary" : "btn btn-secondary"}
        onClick={() => {
          sUd(true)
          sAo(false);
          sRd(false);
        }}>
          Uploaded Date
        </button>
        <button 
        className={ao ? "btn btn-primary" : "btn btn-secondary"}
        onClick={() => {
          sUd(false)
          sAo(true);
          sRd(false);
        }}>
          Alphabetical Order
        </button>
        <button 
        className={rd ? "btn btn-primary" : "btn btn-secondary"}
        onClick={() => {
          sUd(false);
          sAo(false);
          sRd(true);
        }}>
          Released Date
        </button>
      </div>
      {loading ? 
      <div style={{height: "60vh"}} id='spinner' className='d-flex justify-content-center align-items-center'>
        <div className='spinner-border text-primary' role='status'>
          <span className='visually-hidden'>Loading...</span>
        </div>
      </div>
      :
      <div>
        <table style={{borderSpacing: "0 10px" , borderCollapse: "separate"}} className='table table-bordered table-hover text-center fs-5'>
        <thead className=''>
          <tr className=''>
            <th className='p-1 p-sm-3 rounded-1 border border-2 border-black'>No</th>
            <th className='p-1 p-sm-3 rounded-1 border border-2 border-black'>Title</th>
            <th className='p-1 p-sm-3 rounded-1 border border-2 border-black'>Author</th>
            <th className='p-1 p-sm-3 rounded-1  border-2 border-black'>Released</th>
            <th className='p-1 p-sm-3 rounded-1 border border-2 border-black'>Operations</th>
          </tr>
        </thead>
        <tbody>
          {books.slice(num, num + 7).map((e,i) => (
            <tr key={books[i + num]._id}>
              <td>
                {i + 1 + num}
              </td>
              <td title='Click to change Title' style={{cursor: "pointer"}} 
              data-bs-toggle="modal"
              data-bs-target="#title" onClick={() => sId(books[i + num]._id)}>
                {e.title}
              </td >
              <td title='Click to change Author' style={{cursor: "pointer"}}
              data-bs-toggle="modal"
              data-bs-target="#author" onClick={() => sId(books[i + num]._id)}>
                {e.author}
              </td>
              <td title='Click to change Released Year' style={{cursor: "pointer"}}
              data-bs-toggle="modal"
              data-bs-target="#year" onClick={() => sId(books[i + num]._id)}>
                {e.yearPublish}
              </td>
              <td className=''>
                <div className='d-flex justify-content-center align-items
                gap-sm-3 gap-1 gap-lg-5'>
                  <Link to={`/show/${books[i + num]._id}`}>
                    <BsInfoCircle className='text-secondary'/>
                  </Link>
                  <Link to={`/delete/${books[i + num]._id}`}>
                    <AiOutlineDelete className='text-danger'/>
                  </Link>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      </div>
      }
      <div className="container w-25 ">
        <div className="row d-flex justify-content-center align-items-center">
          <button onClick={() => {
            sNum(num - 7);
            sPage(page - 1)
          }} id='down' 
          className=' btn btn-primary col-1 d-flex justify-content-center align-items-center'>
            <i className="fa-solid fa-less-than"></i>
          </button>
          <span className=' col-1'>{page}</span>
          <button onClick={() => {
            sNum(num + 7);
            sPage(page + 1)
          }} id="up"
          className='btn btn-primary col-1 d-flex justify-content-center align-items-center'>
            <i className="fa-solid fa-greater-than"></i>
          </button>
        </div>
      </div>
    </div>
  )
}

export default Home
