
import { Outlet, Link, useLoaderData } from "react-router-dom";
import Footer from "../components/footer.jsx"
import Header from "../components/headervendor";


export default function Root({admin}){
    // const data = useLoaderData()
    return(
        <div className="bg-slate-200 w-screen h-screen">
        {/* <Link to='/vendor'>Go to vendors</Link>
        <div>
        <Link to='/login'>Login</Link> 
        {data?
         <div>Response from the backend: {data}</div>:
        <div>No response from the backend</div>
        } 
        </div>*/}
        <div id="content" >
            <Header admin={admin}/>
            <Outlet/> 
            <Footer/>
        </div>
        </div>
    )
}