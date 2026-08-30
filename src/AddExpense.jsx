import { useState } from "react"

export const AddExpense=()=>{
    const [groupId,setGroupId]=useState('')
    const [paidBy,setPaidBy]=useState('')
    const [amount,setAmount]=useState('')
    const [description,setDescription]=useState('')
    const [memberId,setMemberId]=useState('')
    const [message,setMessage]=useState('')

    const handleSubmit = (e) => {
        e.preventDefault();

        const memberArray = memberId.split(',').map(id => parseInt(id));

        fetch('http://localhost/expense-splitter-api/add_expense.php', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
            group_id: groupId,
            paid_by: paidBy,
            amount: amount,
            description: description,
            member_ids: memberArray
            })
        })
            .then(response => response.json())
            .then(data => {
            setMessage(data.message);
            });
        };
    return(
        <div>
            <h1>{message}</h1>
            <form onSubmit={handleSubmit}>
                <input type="text" value={groupId} placeholder="Group ID" onChange={(e)=>setGroupId(e.target.value)}/>
                <input type="text" value={paidBy} placeholder="Paid By" onChange={(e)=>setPaidBy(e.target.value)}/>
                <input type="text" value={amount} placeholder="Amount" onChange={(e)=>setAmount(e.target.value)}/>
                <input type="text" value={description} placeholder="Description" onChange={(e)=>setDescription(e.target.value)}/>
                <input type="text" value={memberId} placeholder="Member ID" onChange={(e)=>setMemberId(e.target.value)}/>
                <button>Submit</button>
            </form>
        </div>
    )
}