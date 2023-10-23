import { Outlet, Link } from "react-router-dom";

export default function Root({path}){

    return(
        <>
        <h1>You are on the root route.</h1>
        <Link to={path}>Go somewhere based on session</Link>
        <div id="content">
            <Outlet/> 
        </div>
        </>
    )
}