// import axios from "axios"
import { useState } from "react"
// import { redirect} from "react-router"
import logo from "./../assets/PIM_logo_black.png"
import { Link, redirect } from "react-router-dom"
import Alert from '../components/alert'

export default function Register(registerService){
    const [name, setName] = useState('')
    const [pass, setPass] = useState('')
    const [pass2, setPass2] = useState('')
    const [email, setEmail] = useState('')
    const [phone, setPhone] = useState()
    const [website, setWebsite] = useState()
    const [message, setMessage] = useState('')
    const [err, setErr] = useState(false)
    
    function handleRegister(){
        if (registerService.register({name: name, email: email, password: pass, website, phone_number: phone})) {
            setMessage('Registered succesfully')
            redirect('/login')
        } else {
            setMessage("Failed to register")
            setErr(true)
        }
    }

    return(
        <div className="content-center">
            {
            message
            ? 
            <Alert content = {message} error  = {err}/>
            :
            <></>
            }
            
            
            <div className="flex flex-col m-auto w-max p-4 text-center ">

                <img className="max-w-xs  " src={logo} alt="Pim logo white" />

                <div className="m-2">
                    Register
                </div>
                <div className="m-2">
                    <input className="rounded-lg w-3/4" placeholder="Name" onChange={(e) => setName(e.target.value)}></input>
                </div>
                <div className="m-2">
                    <input className="rounded-lg w-3/4" placeholder="Email" onChange={(e) => setEmail(e.target.value)}></input>
                </div>
                <div className="m-2">
                    <input className="rounded-lg w-3/4" placeholder="Website" onChange={(e) => setWebsite(e.target.value)}></input>
                </div>
                <div className="m-2">
                    <input className="rounded-lg w-3/4" placeholder="Phone Number" onChange={(e) => setPhone(e.target.value)}></input>
                </div>
                <div className="m-2">
                    <input className="rounded-lg w-3/4" placeholder="Password" type="password" onChange={(e) => setPass(e.target.value)}></input>
                </div>

                <div className="m-2">
                    <input className="rounded-lg w-3/4" placeholder="Reenter password" type="password" onChange={(e) => setPass2(e.target.value)}></input>
                </div>

                {pass === pass2 ?
                <></>:
                <Alert content="Passwords must match!" error={true}/>
                }

                <div className="m-2 ">
                    <button className="bg-blue-300 w-3/4 rounded click:bg-blue-600" onClick={() => handleRegister()}>Submit</button>
                </div>

                <div className="m-2 text-blue-400 underline">
                    <Link to='/login'>Back to login</Link>
                </div>
            </div>
            
        </div>
    )
}
