import React from 'react'
import "../styles/footer.css"
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import { faFacebook } from '@fortawesome/free-brands-svg-icons'

export default function footer() {
    return(
        <div className="Footer-links">
            <a className ="Link" href="https://indigenousmarketplace.org/">home</a>
            <a className ="Link" href="https://www.instagram.com/indigenousmrktplc/"><FontAwesomeIcon icon="fa-brands fa-instagram" /></a>
            <a className ="Link" href="https://www.facebook.com/indigenousmrktplc"><FontAwesomeIcon icon={faFacebook} /></a>
        </div>

    )
}