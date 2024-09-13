"use client";

import { useState } from 'react';
import { useRouter } from "next/navigation"; // Updated import for Next.js 13+
import Link from 'next/link';
import Image from "next/image";
import shield from '../../../public/static/img/shield.png'


export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch('http://127.0.0.1:8000/blog/token/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });
  
      if (!res.ok) {
        throw new Error('Failed to login');
      }
  
      const data = await res.json();
  
      // Log the response data (access token and refresh token)
      console.log('Access Token:', data.access);
      console.log('Refresh Token:', data.refresh);
  
      localStorage.setItem('accessToken', data.access); // Store token
      router.push('/'); // Redirect to homepage
    } catch (err) {
      console.error(err); // Log the error in the console
      setError('Login failed. Please try again.');
    }
  };
  

  return (
    <>

    <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
  <div className="sm:mx-auto sm:w-full sm:max-w-sm">
    <Image className="mx-auto w-auto h-20 " src={shield} alt="Your Company"/>  
    <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">Sign in to your account</h2>
  </div>

  <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
  {error && <p className="text-red-500">{error}</p>}
    <form className="space-y-6" onSubmit={handleLogin}>
      <div>
        <label for="email" className="block text-sm font-medium leading-6 text-gray-900">Email</label>
        <div className="mt-2">
          <input id="email" 
                    type="text"
                    placeholder="Email Address"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"/>
        </div>
      </div>

      <div>
        <div className="flex items-center justify-between">
          <label for="password" className="block text-sm font-medium leading-6 text-gray-900">Password</label>
          <div className="text-sm">
            <Link href="/account/forgot-password" className="font-semibold text-indigo-600 hover:text-indigo-500">Forgot password?</Link>
          </div>
        </div>
        <div className="mt-2">
          <input 
          id="password"
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
         />
        </div>
      </div>

      <div>
        <button type="submit" className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Sign in</button>
      </div>
    </form>

    <p className="mt-10 text-center text-sm text-gray-500">
      Don't Have an Account?
      <Link href="/account/register" className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500"> Register Now</Link>
    </p>
  </div>
</div>

    </>
  );
}
