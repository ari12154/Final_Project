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

    const updateAccount = async (e) => {
        e.preventDefault()
        await axios.put(`http://localhost:3001/users/${userId}`, userData)
    }

    const deleteAccount = async () => {
        await axios.delete(`http://localhost:3001/users/${userId}`)

        spaces.forEach(space => {
            axios.delete(`http://localhost:3001/${space._id}/${userId}`)
        })
        setLogin(false)
        localStorage.removeItem('UserToken')
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
                <form onSubmit={updateAccount} style={{lineHeight: '5px'}}>
                    <h1 style={{textAlign: 'left'}}>Update Account</h1>

                    <label style={{marginRight: '430px'}}>Name:</label>
                    <input
                        type="text"
                        placeholder={'Insert new name'}
                        value={userData.name}
                        onChange={e => setUserData({...userData, name: e.target.value})}
                    />

                    <label style={{marginRight: '380px'}}>Email Address:</label>
                    <input
                        type="text"
                        placeholder={'Insert new Email'}
                        value={userData.email}
                        onChange={e => setUserData({...userData, email: e.target.value})}
                    />

                    <label style={{marginRight: '410px'}}>Password:</label>
                    <input
                        type="text"
                        placeholder={'Insert new Password'}
                        value={userData.password}
                        onChange={e => setUserData({...userData, password: e.target.value})}
                    />

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