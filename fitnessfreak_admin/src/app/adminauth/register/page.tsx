'use client'
import React, {useState, useEffect} from 'react'
import '../auth.css'
import {ToastContainer, toast} from 'react-toastify'

const SignupPage = () => {

  const [name,setName]=useState('');
  const [email, setEmail]=useState('');
  const [password,setPassword]=useState('');

  const handleSingup=async()=>{
    try{
      const response=await fetch(process.env.NEXT_PUBLIC_BACKEND_API+'/admin/register',{
        method: 'POST',
        headers:{
          'Content-Type':'application/json',
        },
        body:JSON.stringify({name,email,password}),
        credentials:'include'
      })
      const data=await response.json();

      if(data.ok){
  
        //Handle successful signup, eg show a success message
        console.log('Admin registration successful',data);
  
        toast.success('Admin Registration Successful',{
          position:toast.POSITION.TOP_CENTER,
        });       
      } else{
        //Handle Signup Error
        console.log('Admin registration failed', response.statusText);
        toast.error('Admin Registration Failed',{
          position: toast.POSITION.TOP_CENTER,
        });
      }
    }
    catch(error){
      toast.error('An error occurred during registration');
      console.error('An error occured during registration',error);
    }
  }

  return (
    <div className='formpage'>
      <input
        type='text'
        placeholder='Name'
        value={name}
        onChange={(e)=>setName(e.target.value)}
      />
      <input
        type='email'
        placeholder='Email'
        value={email}
        onChange={(e)=>setEmail(e.target.value)}
      />
      <input
        type='password'
        placeholder='Password'
        value={password}
        onChange={(e)=>setPassword(e.target.value)}
      />
      <button onClick={handleSingup}>Sign up</button>
    </div>
  )
}

export default SignupPage