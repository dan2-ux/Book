import React, {useRef,  useEffect, useState } from 'react'
import axios from 'axios';
import Spiner from '../components/Spiner';
import { useNavigate } from 'react-router-dom';

function kkk(){
  const [title, sTitle] = useState("");
  const [author, sAu] = useState("");
  const [yearPublish, sPub] = useState();
  const [loading, sLoading] = useState(false);
  const [eyear, sEyear] = useState("")
  const [etitle, sEtitle] = useState("")
  const [eauthor, sEauthor] = useState("")
  const navigate = useNavigate()
  const titleRef = useRef(null)
  function doCreate(){
    if  (!title ||
      !author || 
        yearPublish === "" || etitle === " is-invalid" || eauthor === "is-invalid" || eyear === "is-invalid"){
          return console.log("Please check input before Add Book")
        }
    else{
      const doTitle = title.split(" ").map((e) => e.charAt(0).toUpperCase() + e.slice(1)).join(" ")
      const doAuthor = author.split(" ").map((e) => e.charAt(0).toUpperCase() + e.slice(1)).join(" ")
      const newData = {
        title : doTitle,
        author : doAuthor,
        yearPublish
      };
      sLoading(true)
      axios
        .post("http://localhost:555/app/books/", newData)
        .then(() => {
          sLoading(false);
          navigate(0);
        })
        .catch((e)=>{
          console.log(e)
        })
    }
  }
  
  useEffect(() => {
    if(yearPublish === ""){
      sEyear("")
    }
    else if(yearPublish > 2025 || yearPublish < 0){
      sEyear(" is-invalid")
    }
    else if(yearPublish > 0){
      sEyear(' is-valid')
    }
  },[yearPublish])

  useEffect(() => {
    if(title === ""){
      sEtitle("")
    }
    else if(title.length > 0 && title.length <=2 ){
      sEtitle(" is-invalid")
    }
    else{
      sEtitle(" is-valid")
    }
  },[title])

  useEffect(() => {
    if(author === ""){
      sEauthor("")
    }
    else if(author.length > 0 && author.length <=5 ){
      sEauthor(" is-invalid")
    }
    else{
      sEauthor(" is-valid")
    }
  },[author])
  return (
    <div>
        {loading ? 
    <Spiner/>
    :
    <div id='modal' className='  w-100 modal-dialog modal-dialog-scrollable '>
    <div className=' modal-content px-2 px-lg-5 py-5 '>

      <h1 className=' pb-3 text-center'>Add Book</h1>

      <div className='d-flex flex-column  '>

        <form style={{height: "6em"}} className=' form-floating  '>
          <input value={title} onChange={(e) => sTitle(e.target.value)}
          placeholder='tit' className={`form-control ${etitle}`} type="text" />
          <label  className=' form-label'>Title:</label>
          <div className=' invalid-feedback px-2'>Title need to contained more than 2 letters</div>
          <div className="valid-feedback px-2">Valid</div>
        </form>

        <form style={{height: "6em"}} className=' form-floating  '>
          <input value={author} onChange={(e) => sAu(e.target.value)}
          type="text" className={`form-control ${eauthor}`} placeholder='author' />

          <label className=' form-label' >Author:</label>
          <div className="invalid-feedback px-2">Author need to be contained atleast 5 letters</div>
          <div className="valid-feedback px-2">Valid</div>
        </form>

        <form style={{height: "6em"}} className=' form-floating  '>
          <input value={yearPublish} onChange={(e) => sPub(e.target.value)}
          type="number" className={` form-control ${eyear}`} placeholder='realsed' 
          />
          <label className=' form-label' >Realsed Year:</label>
          <div className=' valid-feedback px-2'>Valid</div>
          <div className=' invalid-feedback px-2'>Invalid</div>
        </form>

        <div className='d-flex justify-content-end gap-2 gap-lg-5'>
          <button ref={titleRef} onClick={doCreate} className=' rounded-2 bg-success text-white'>Submit</button>
          <button data-bs-dismiss="modal" data-bs-target="modal" className=' rounded-2 bg-danger text-white'>Cancel</button>
        </div>

        </div>
          </div>
      </div>
    }
    </div>
    
  )
}

export default kkk
