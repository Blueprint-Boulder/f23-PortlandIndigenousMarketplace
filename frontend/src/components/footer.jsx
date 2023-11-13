import React from 'react'
import "../styles/footer.css"
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import { faSquareFacebook } from '@fortawesome/free-brands-svg-icons'
import { faSquareInstagram } from '@fortawesome/free-brands-svg-icons'
import {faHouse} from '@fortawesome/free-solid-svg-icons'

export default function Footer() {
    return(
        <div className="Footer-links">
            <div id="footer-text">Follow Us:</div>
            <div className="Socials">
                <a id="insta" href="https://www.instagram.com/indigenousmrktplc/"><FontAwesomeIcon icon={faSquareInstagram} /></a>
                <a id="facebook" href="https://www.facebook.com/indigenousmrktplc"><FontAwesomeIcon icon={faSquareFacebook} /></a>
            </div>
            <div className="pim-link">
                <div id="homepage-link" >Homepage:</div>
                <a id="pim-home" href="https://indigenousmarketplace.org/"><FontAwesomeIcon icon={faHouse}/></a>
            </div>
        </div>
        // change ordering of files
            // have home icon in middle
            // center text
            // maybe add line above
    )
}