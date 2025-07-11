import React from 'react'
import facebook from '../src/icons/facebook.png'
import twitter from '../src/icons/twitter.png'
import instagram from '../src/icons/instagram.png'
import '../src/style/FooterPage.css';


function FooterPage() {
    return (
        <div>
            <footer>
                <div className='section-link-site'>
                    <a href="#">Haqqımızda</a>
                    <a href="#">Qaydalar</a>
                </div>
                <div className='section-link'>
                    <div>
                        <img src={instagram} alt="Instagram" />
                        <a href="https://instagram.com">Instagram</a>
                    </div>
                    <div>
                        <img src={twitter} alt="Twitter" />
                        <a href="https://twitter.com">Twitter</a>
                    </div>
                    <div>
                        <img src={facebook} alt="Facebook" />
                        <a href="https://facebook.com">Facebook</a>
                    </div>
                </div>
            </footer>
        </div>
    )
}

export default FooterPage
