import React from 'react'
import "../styles/footer.css"
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import { faFacebook } from '@fortawesome/free-brands-svg-icons'
import { faInstagram } from '@fortawesome/free-brands-svg-icons'

export default function Footer() {
    return(
        <div className="Footer-links">
            <a className ="Link" href="https://indigenousmarketplace.org/">home</a>
            <a className ="Link" href="https://www.instagram.com/indigenousmrktplc/"><FontAwesomeIcon icon={faInstagram} /></a>
            <a className ="Link" href="https://www.facebook.com/indigenousmrktplc"><FontAwesomeIcon icon={faFacebook} /></a>
        </div>
        // change ordering of files
            // have home icon in middle
            // center text
            // maybe add line above
    )
}