// import axios from "axios"
import { useState } from "react"
// import { redirect} from "react-router"
import logo from "./../assets/PIM_logo_black.png"
import { Link } from "react-router-dom"
import Alert from '../components/alert'



export default function Login({loginService}){
    const [user, setUser] = useState('')
    const [pass, setPass] = useState('')
    const [message, setMessage] = useState('')
    const [err, setErr] = useState(false)
    
    function handleLogin(){
        const data = {username: user, password: pass}
        // axios.post("/login", data).then(() => redirect('/events')).catch(err => setMessage('There was an error: ' + err), setErr(true))
    }

    return(
        <div className="content-center">
            {
            message
            ? 
            <Alert content = {message} error = {err}/>
            :
            <></>
            }
            
            
            <div className="flex flex-col m-auto w-max p-4 text-center ">

                <img className="max-w-xs  " src={logo} alt="Pim logo white" />

                <div className="m-2">
                    Login
                </div>

                <div className="m-2">
                    <input className="rounded-lg w-3/4" placeholder="Username" onChange={(e) => setUser(e.target.value)}></input>
                </div>
                <div className="m-2">
                    <input className="rounded-lg w-3/4" placeholder="Password" type="password" onChange={(e) => setPass(e.target.value)}></input>
                </div>

                <div className="m-2 ">
                    <button className="bg-blue-300 w-3/4 rounded click:bg-blue-600" onClick={() => handleLogin()}>Submit</button>
                </div>

                <div className="m-2 text-blue-400 underline">
                    <Link to='/reset_password'>Forgot Password?</Link>
                </div>

                <div className="m-2 text-blue-400 underline">
                    <Link to='/register'>Don't have an account? Register</Link>
                </div>
            </div>
            
        </div>
    )
}