import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Spiner from '../components/Spiner'
import { useNavigate } from 'react-router-dom'

function EditA({id}){
    const [author, sAuthor] = useState("")
    const [loading, sLoading] = useState(false)
    const navigate = useNavigate()
    const changeAuthor = author.split(" ").map((e) => e.charAt(0).toUpperCase() + e.slice(1)).join(" ")
    function doChange(){
        const data = {
            author : changeAuthor
        }
        sLoading(true)
        axios
            .put(`http://localhost:5555/app/books/${id}`, data)
            .then(() => {
                sLoading(false);
                navigate(0);
            })
            .catch((e) => {
                console.log(e)
            })
    }
    return (
        
        <div id='modal' className=' modal-dialog modal-dialog-centered modal-dialog-scrollable'>
            { id !== ""
            ?
            loading ? 
            <Spiner/>
            :
                <div className=' modal-content d-flex gap-2 gap-lg-5 p-1 p-lg-4'>
                    <h1 className='text-center'>Change the Author Name</h1>
                    <form className='form-floating'>
                        <input type="text" className=' form-control'
                        placeholder='tit'
                        value={author} onChange={(e) => sAuthor(e.target.value)} />
                        <label className=' form-label'>Enter New Author:</label>
                    </form>
                    <div className='d-flex justify-content-end gap-2 gap-lg-5'>
                        <button onClick={doChange} 
                        className='btn btn-success'>Submit</button>
                        <button data-bs-dismiss="modal"
                        data-bs-target="modal" className='btn btn-danger'>Cancel</button>
                    </div>
                </div>
            :
            ""
            }
            
        </div>
        
        
    )
}

export default EditA
