import React, {useContext, useEffect, useState} from 'react';
import {loginProvider} from "../../App";
import axios from "axios";


const UpdateAccount = ({spaces, userData, setUserData}) => {

    const {userId, setLogin} = useContext(loginProvider)

    const updateAccount = async (e) => {
        e.preventDefault()
        if (userId) {
            await axios.put(`http://localhost:3001/users/${userId}`, userData)
        }
    }

    const deleteAccount = async () => {
        if (userId) {
            await axios.delete(`http://localhost:3001/users/${userId}`)

            spaces.forEach(space => {
                axios.delete(`http://localhost:3001/${space._id}/${userId}`)
            })
            setLogin(false)
            localStorage.removeItem('UserToken')
        }
    }

    return <>

        <div className="login" style={{
            border: '1px solid',
            borderRadius: '18px',
            maxHeight: '95%',
            marginTop: '8px',
            marginLeft: '5%',
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

    </>
}

const Notification = ({userData, setUserData}) => {

    const {userId} = useContext(loginProvider)

    const handleClick = async () => {
        const newUserData ={...userData, notification: !userData.notification}
        setUserData(newUserData)
        await axios.put(`http://localhost:3001/users/${userId}`, newUserData)
    }

    return <div style={{
        border: '1px solid',
        borderRadius: '18px',
        maxHeight: '95%',
        marginTop: '8px',
        marginLeft: '5%',
        width: '100%',
        maxWidth: '500px',
        gap: '.5em'
    }}>
        <h1>Notification</h1>
        <div style={{display: 'flex', gap: '25px', padding: '50px 0 0 25px'}}>
            <label> Allow to send notification emails</label>
            <input type="checkbox" onClick={handleClick}
                   onChange={e => console.log(e.target.checked)}
                   checked={userData.notification}/>
        </div>
    </div>
}

function Setting({spaces}) {

    const options = ['update-account', 'notification']
    const {userId} = useContext(loginProvider)
    const [userData, setUserData] = useState({name: '', email: '', password: ''})
    const [settingOption, setSettingOption] = useState(options[0])

    useEffect(() => {
        getData().then()
    }, [userId])

    const getData = async () => {
        const {data} = await axios.get('http://localhost:3001/users')
        data.users.forEach(user => {
            if (userId && user._id.toString() === userId) {
                setUserData(user)
            }
        })
    }

    const buttonStyle = {
        width: '100%',
        height: '35px',
        border: 'none',
        borderRadius: '8px'
    }

    return (
        <div className='container'>
            <div style={{
                maxWidth: '20%',
                borderRight: '1.5px solid',
                maxHeight: '99%',
                paddingRight: '5px'
            }}>
                <div style={{
                    display: "flex",
                    justifyContent: 'center',
                    flexWrap: "wrap",
                    gap: '10px',
                    marginTop: '2.5rem'
                }}>
                    <button onClick={() => setSettingOption(options[0])} style={buttonStyle}>Update account</button>
                    <button onClick={() => setSettingOption(options[1])} style={buttonStyle}>Notification</button>
                </div>
            </div>
            {settingOption === options[0]
                ? <UpdateAccount spaces={spaces} userData={userData} setUserData={setUserData}/>
                : <Notification userData={userData} setUserData={setUserData}/>
            }
        </div>
    );
}

export default Setting;