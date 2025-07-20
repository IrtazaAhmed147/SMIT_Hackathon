import React, { useRef } from 'react'
import './Otp.css'
import { Button } from '@mui/material'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

function Otp() {

    const form = useRef({})
    const token = localStorage.getItem('tempToken')
    const navigate = useNavigate()

    const handleForm = async (e) => {
        e.preventDefault()
        console.log(form);
        const otp = form.current.inp1 + form.current.inp2 + form.current.inp3 + form.current.inp4 + form.current.inp5 + form.current.inp6
        console.log(otp);
        
        if(otp.length !== 6) return 

        try {
            
            await axios.post(
                'http://localhost:8800/api/auth/verifyEmail',
                { otp },
                {
                    withCredentials: true,
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );
            navigate('/login')
        } catch (error) {
            console.log(error);
            
        }


        



    }

    return (
        <div>
            <section className='otp-container'>
                <div className="otp-box">
                    <h1 className="title">Enter OTP</h1>
                    <form onClick={handleForm}>
                        <div id="otp-form">

                            <input type="text" name='inp1' onChange={(e) => form.current = { ...form.current, [e.target.name]: e.target.value }} className="otp-input" maxLength="1" required />
                            <input type="text" name='inp2' onChange={(e) => form.current = { ...form.current, [e.target.name]: e.target.value }} className="otp-input" maxLength="1" required />
                            <input type="text" name='inp3' onChange={(e) => form.current = { ...form.current, [e.target.name]: e.target.value }} className="otp-input" maxLength="1" required />
                            <input type="text" name='inp4' onChange={(e) => form.current = { ...form.current, [e.target.name]: e.target.value }} className="otp-input" maxLength="1" required />
                            <input type="text" name='inp5' onChange={(e) => form.current = { ...form.current, [e.target.name]: e.target.value }} className="otp-input" maxLength="1" required />
                            <input type="text" name='inp6' onChange={(e) => form.current = { ...form.current, [e.target.name]: e.target.value }} className="otp-input" maxLength="1" required />
                        </div>
                        <button id="verify-btn">Verify OTP</button>

                    </form>
                </div>
            </section>
        </div>
    )
}

export default Otp