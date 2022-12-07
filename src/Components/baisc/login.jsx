import React, {useContext, useRef, useState} from 'react';
import {loginProvider} from "../../App";
import useAxios from "../customHooks/useAxios";
import axios from "axios";
import emailjs from "@emailjs/browser"

const ResetPasswordModal = ({setResetPass}) => {

    const email = useRef()
    const newPass = useRef()

    const reset_password = async (e) => {
        e.preventDefault()
        const {data} = await axios.get('http://localhost:3001/users')
        data.users.forEach(user => {
            if (user.email === email.current.value) {
                axios.put(`http://localhost:3001/users/${user._id}`, {...user, password: newPass.current.value})
            }
        })
        setResetPass(false)
    }

    return <>
        <dialog open style={{position: "absolute", left: 0, top: '15%', maxWidth: '70%', borderRadius: '18px'}}>
            <p style={{textAlign: "center", color: "red"}}>Reset your password here!</p>
            <form method="dialog" onSubmit={reset_password} style={{maxWidth: 'inherit'}}>
                <input ref={email} type="email" placeholder='Insert your email address' required/>
                <input ref={newPass} type="password" placeholder='Insert new password' required/>
                <button onSubmit={reset_password}>Reset</button>
            </form>
        </dialog>
    </>
}

const LoginForm = ({setAccount}) => {

    const email = useRef()
    const pass = useRef()
    const [resetPass, setResetPass] = useState(false)
    const { setLogin, setUserId } = useContext(loginProvider)

    const set_login = async (e) => {
        e.preventDefault()
        const userData = {
            email: email.current.value,
            password: pass.current.value
        }
        const {data} = await axios.get('http://localhost:3001/users')
        data.users.forEach(user => {
            if (user.email === userData.email && user.password === userData.password) {
                setLogin(true)
                setUserId(user._id.toString())
            }
        })
    }

    return (
        <div className="login" style={{position: "relative"}}>
            <div style={{textAlign: "center"}}>
                <h1>Login to your account</h1>
                <div style={{display: "flex", justifyContent: "center", alignItems: "center", gap: "2px"}}>
                    <p>You don`t have account yet?</p>
                    <p style={{color: "blue", cursor: 'pointer'}} onClick={() => setAccount(false)}>Click here</p>
                </div>
            </div>
            <form onSubmit={set_login}>
                <input ref={email} type="email" placeholder='Email' required/>
                <input ref={pass} type="password" placeholder='Password' required/>
                <button type="submit">Login</button>
            </form>
            <p style={{color: "red", marginLeft: '40px', cursor: 'pointer'}}
               onClick={() => setResetPass(!resetPass)}>Forget your password?</p>
            {
                !resetPass
                    ? null
                    : <ResetPasswordModal setResetPass={setResetPass}/>
            }
        </div>
    );
}

const RegisterForm = ({setAccount}) => {

    const name = useRef()
    const email = useRef()
    const pass = useRef()
    const {request} = useAxios()

    const sendWelcomeEmail = () => {
        emailjs.send("service_0b9e5ug","template_znxh2yo",{
            from_name: 'Task Management',
            to_name: name.current.value,
            message: 'Welcome to our program, \n we so happy you join us',
            to_email: email.current.value
        },"rnhVWRbWP6IjlrBsd")
    }

    const set_Register = (e) => {
        e.preventDefault()
        const data = {
            name: name.current.value,
            email: email.current.value,
            password: pass.current.value,
            notification: false
        }
        if (data.name && data.password && data.email) {
            console.log(data)
            request('POST', 'http://localhost:3001/users', data)
            setAccount(true)
            sendWelcomeEmail()
        }
    }

    return (

        <div className="login">
            <div style={{textAlign: "center"}}>
                <h1>Create account right here</h1>
                <div style={{display: "flex", justifyContent: "center", alignItems: "center", gap: '2px'}}>
                    <p>already have an account?</p>
                    <p style={{color: "blue", cursor: 'pointer'}} onClick={() => setAccount(true)}>Click here</p>
                </div>
            </div>
            <form onSubmit={set_Register}>
                <input ref={name} type="text" placeholder='Name' required/>
                <input ref={email} type="email" placeholder='Email' required/>
                <input ref={pass} type="password" placeholder='Password' required/>
                <button type="submit">Register</button>
            </form>
        </div>
    );
}

const Login = () => {

    const [account, setAccount] = useState(false)

    return <div className={'login-area'}>
        {
            account
                ? <LoginForm setAccount={setAccount}/>
                : <RegisterForm setAccount={setAccount}/>
        }
    </div>

}

export default Login;