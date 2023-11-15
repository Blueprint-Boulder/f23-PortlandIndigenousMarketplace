import React from 'react'
import "../styles/footer.css"
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import { faSquareFacebook } from '@fortawesome/free-brands-svg-icons'
import { faSquareInstagram } from '@fortawesome/free-brands-svg-icons'


export default function Footer() {
    return(
        <div id="Footer">
            <div id="Footer-content">
                <a className="social-links" href="https://www.instagram.com/indigenousmrktplc/"><FontAwesomeIcon icon={faSquareInstagram} /></a>
                <a className="social-links p-1 underline" href="https://indigenousmarketplace.org/">Homepage</a>
                <a className="social-links" id="social-links" href="https://www.facebook.com/indigenousmrktplc"><FontAwesomeIcon icon={faSquareFacebook} /></a>
            </div>

        </div>
    )
}