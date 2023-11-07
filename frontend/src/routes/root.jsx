import { Outlet, Link } from "react-router-dom";
import Header from "../components/headervendor";
export default function Root({admin}){

    return(
        <>      
        <div id="content">
            <Header admin={admin}/>
            <Outlet/> 
        </div>
        </>
    )
}