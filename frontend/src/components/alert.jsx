export default function Alert({content, error}){
    return(
        <>
        {error ? 
        <div className="bg-red-600">{content}</div>
        :
        <div className="bg-slate-600">{content}</div>
        }
        </>
        
    )
}