import React from 'react'
import image from '../src/Image/photo_main.png'
import '../src/style/Image.css'


function Image() {

    return (
        <section>
            <img src={image} alt="none" />
        </section>
    )
}

export default Image
