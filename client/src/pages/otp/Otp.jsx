import React, { useRef } from 'react'
import './Otp.css'
import { Button } from '@mui/material'

function Otp() {

    const form = useRef({})

    const handleForm = async (e) => {
        e.preventDefault()
        console.log(form);
        const otp = form.current.inp1 + form.current.inp2 + form.current.inp3 + form.current.inp4 + form.current.inp5
        console.log(otp);
        if(otp.length === 5) {
            console.log("true");
            
            // await axios.post('http://localhost:8800/api/auth/verifyEmail', {otp}, {
            //     withCredentials: true
            // })
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
                        </div>
                        <button id="verify-btn">Verify OTP</button>

                    </form>
                </div>
            </section>
        </div>
    )
}

export default Otp