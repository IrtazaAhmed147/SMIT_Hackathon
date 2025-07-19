import React, {useRef} from 'react'
import { Link } from 'react-router-dom'
import AlternateEmailIcon from '@mui/icons-material/AlternateEmail';
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import '../login/login.css'


function Signup() {

    const form = useRef({})
    
    const handleForm = (e)=> {
        e.preventDefault()
        console.log(form.current);
        
    }

    return (
        <>
            <div style={{ width: "100%", display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>

                <form className="form" onSubmit={handleForm}>
                    <div className="flex-column">
                        <label>Username </label></div>
                    <div className="inputForm">
                        <PersonOutlineOutlinedIcon />
                        <input onChange={(e)=> form.current = {...form.current,[e.target.name]: e.target.value}} name='username' placeholder="Enter Username" className="input" type="text" required/>
                    </div>
                    <div className="flex-column">
                        <label>Email </label></div>
                    <div className="inputForm">
                         <AlternateEmailIcon />
                        <input onChange={(e)=> form.current = {...form.current,[e.target.name]: e.target.value}} placeholder="Enter Email" name='email' className="input" type="email" required/>
                    </div>
                    <div className="flex-column">
                        <label>Password </label></div>
                    <div className="inputForm">
                         <LockOutlinedIcon />
                        <input onChange={(e)=> form.current = {...form.current,[e.target.name]: e.target.value}} name='password' placeholder="Enter Password" className="input" type="password" required/>
                    </div>

                    <button className="button-submit">Create Account</button>
                    <p className="p">Already have an account? <Link to={'/login'} className="link">Login</Link>
                    </p>
                </form>
            </div>
        </>
    )
}

export default Signup