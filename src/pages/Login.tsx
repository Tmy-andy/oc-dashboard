import React, { useState } from 'react'
import { supabase } from '../supabaseClient'
import { useNavigate } from 'react-router-dom'

const Login: React.FC = () => {
  const [email, setEmail] = useState('')
  const nav = useNavigate()

  const signInWithEmail = async (e: React.FormEvent) => {
    e.preventDefault()
    const { error } = await supabase.auth.signInWithOtp({ email })
    if (!error) alert('Check your email for login link')
    else alert(error.message)
  }

  const signInGoogle = async () => {
    const { error } = await supabase.auth.signInWithOAuth({ provider: 'google' })
    if (error) alert(error.message)
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-6">
      <div className="max-w-md w-full bg-white rounded-xl shadow p-8">
        <h1 className="text-2xl font-semibold mb-4">Đăng nhập</h1>

        <form onSubmit={signInWithEmail}>
          <input className="w-full p-3 border rounded mb-3" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} />
          <button className="w-full py-3 bg-sky-600 text-white rounded mb-3">Gửi link đăng nhập</button>
        </form>

        <div className="text-center my-2">— Hoặc —</div>

        <button onClick={signInGoogle} className="w-full py-3 border rounded flex items-center justify-center gap-2">
          <img src="/google-logo.svg" alt="google" className="w-5 h-5" />
          Đăng nhập với Google
        </button>

        <div className="mt-4 text-sm text-slate-500">
          Bạn sẽ được chuyển hướng sau khi đăng nhập.
        </div>
      </div>
    </div>
  )
}

export default Login
