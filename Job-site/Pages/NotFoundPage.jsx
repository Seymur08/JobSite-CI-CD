import React from 'react'
// import '../src/style/notfoundPage.css'
import '../src/style/NotFoundPage.css'
import image from '../src/Image/notfoundmike.png'

function NotFoundPage() {
    return (
        <div className='notfoundPage'>
            <div className='notfoundPage-back'>
                <div>
                    <h1>4</h1>
                    <h1>4</h1>
                </div>
            </div>
            <div className='notfoundPage-front'>
                <img src={image} alt="no" />
            </div>
        </div>
    )
}

export default NotFoundPage
