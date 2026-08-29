import { useState } from "react"

export const CreateGroup=()=>{
    const [groupName,setGroupName]=useState('')
    const [message,setMessage]=useState('')
    const handleSubmit=(e)=>{
        e.preventDefault();
        fetch('http://localhost/expense-splitter-api/create_group.php',{
            method:'POST',
            headers:{'Content-Type':'application/json'},
            body: JSON.stringify({ group_name:groupName ,user_id:8 })
        })
                .then(response=>response.json())
                .then(data=>{
                    setMessage(data.message)
                });
    }
    return(
        <div>
            <h1>{message}</h1>
            <form onSubmit={handleSubmit}>
                <input type="text" value={groupName} placeholder="Group Name" onChange={(e)=>{setGroupName(e.target.value)}}/>
                <button>Submit</button>
            </form>
        </div>
    )
}