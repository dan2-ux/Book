import React from 'react'
import {BsArrowLeft} from 'react-icons/bs'
import {Link} from 'react-router-dom'

const MoveBack = () => {
  return (
    <div className="d-flex justify-content-between align-items-center p-4">
        <h1 className="fs-2 my-4 text-primary">Books List</h1>
        <div className='container w-50'>
          <div className='row g-0'>
            <form className=' col-10 '>
              <input type="text" className='form-control rounded rounded-start-5'
              placeholder='Title' />
            </form>
            <button className=' rounded rounded-end-5 btn btn-primary col-2 d-flex justify-content-center align-items-center'>
              <i class="fa-solid fa-magnifying-glass"></i>
            </button>
          </div>
        </div>
        <Link to='/' className='fs-1 d-flex justify-content-center align-items-center'>
          <BsArrowLeft />
        </Link>
    </div>
  )
}

export default MoveBack
