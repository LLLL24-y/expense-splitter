import { useState } from "react"

export const AddMember=()=>{
    const [message,setMessage]=useState('')
    const [groupId,setGroupId]=useState('')
    const [userId,setUserId]=useState('')
    const handleSubmit=(e)=>{
        e.preventDefault();
        fetch('http://localhost/expense-splitter-api/add_member.php',{
            method:'POST',
            headers:{'Content-Type':'application/json'},
            body:JSON.stringify({group_id:groupId,user_id:userId})
        })
            .then(response=>response.json())
            .then(data=>{
                setMessage(data.message)
            })
    }
    return(
        <div>
            <h1>{message}</h1>
            <form onSubmit={handleSubmit}>
                <input type="text" value={groupId} placeholder="Group ID" onChange={(e)=>setGroupId(e.target.value)}/>
                <input type="text" value={userId} placeholder="User ID" onChange={(e)=>setUserId(e.target.value)} />
                <button>Submit</button>
            </form>
        </div>
    )
}