import { useEffect, useState } from "react"

export const Balances=()=>{
    const [balances,setBalances]=useState([])
    useEffect(()=>{
        fetch('http://localhost/expense-splitter-api/get_balances.php?group_id=7')
            .then(response=>response.json())
            .then(data=>{
                setBalances(data.balances)
            })
    },[])
    return(
        <div>
            <ul>
                {balances.map((b) => (
                <li key={b.user_id}>User {b.user_id}: {b.balance}</li>
                ))}
            </ul>
        </div>
    )
}