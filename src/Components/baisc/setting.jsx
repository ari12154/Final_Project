import React, {useContext, useEffect, useState} from 'react';
import {loginProvider} from "../../App";
import axios from "axios";

function Setting({spaces}) {

    const { userId, setLogin } = useContext(loginProvider)
    const [userData, setUserData] = useState({})

    useEffect(() => {
        getData().then()
    }, [userId])

    const getData = async () => {
        const {data} = await axios.get('http://localhost:3001/users')
        console.log(data.users)
        data.users.forEach(user => {
            if (user._id.toString() === userId) {
                setUserData(user)
            }
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault()
    }

    const deleteAccount = async () => {
        await axios.delete(`http://localhost:3001/users/${userId}`)

        spaces.forEach(space => {
            axios.delete(`http://localhost:3001/${space._id}/${userId}`)
        })
        setLogin(false)
    }

    return (
        <div className='container'>
            <div className="login" style={{
                border: '1px solid',
                borderRadius: '18px',
                maxHeight: '95%',
                marginTop: '8px',
                marginLeft: '20%',
                gap: '.5em'
            }}>
                <form onSubmit={handleSubmit} style={{lineHeight: '5px'}}>
                    <h1 style={{textAlign: 'left'}}>Update Account</h1>

                    <label style={{marginRight: '430px'}}>Name:</label>
                    <input type="text" placeholder={'Insert new name'} onChange={null} value={userData.name}/>

                    <label style={{marginRight: '380px'}}>Email Address:</label>
                    <input type="text" placeholder={'Insert new Email'} onChange={null} value={userData.email}/>

                    <label style={{marginRight: '410px'}}>Password:</label>
                    <input type="text" placeholder={'Insert new Password'} onChange={null}
                           value={userData.password}/>

                    <button style={{width: '50%', marginTop: '5px'}}> Update</button>
                </form>

                <button onClick={deleteAccount}
                        style={{width: '45%', backgroundColor: "red", marginTop: '5px'}}>Delete account
                </button>
            </div>
        </div>
    );
}

export default Setting;