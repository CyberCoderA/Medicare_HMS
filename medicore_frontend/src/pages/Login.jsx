import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import logo from '../assets/medicore_logo.png'
import user from '../assets/user.png'
import CustomPasswordField from '../components/CustomPasswordField'
import CustomTextField from '../components/CustomTextField'
import axios from "axios";

export default function Login() {
  const navigate = useNavigate();
  const [isPassVisible, setPassVisible] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [userInfo, setUserInfo] = useState({
    username: "",
    password: ""
  });

  const handleChange = (e) => {
    const value = e.target.value;
    setUserInfo({
      ...userInfo,
      [e.target.name]: value
    });
  }

  const handleLogin = async (e) => {
    try {
      e.preventDefault();
      setErrorMessage('');

      const params = new URLSearchParams();
      params.append('username', userInfo.username);
      params.append('password', userInfo.password);

      const response = await axios.post("http://localhost:8080/api/users/login", params, {
        withCredentials: true,
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      });

      if (response.status === 200) {
        navigate('/admin');
      }
    } catch (error) {
      setErrorMessage(error?.response?.data?.message || 'Login failed');
    }
  }

  return (
    <div className="h-screen w-full flex">
        <div className="w-1/2 bg-white flex flex-col justify-center items-center">
          <img src={logo} alt="logo"  className='h-100'/>
          <div className='flex gap-1'>
            <h1 className='font-bold italic text-4xl text-text-primary'>"Connected Care,</h1>
            <h1 className='font-bold italic text-4xl text-text-accent'>Simplified Healing."</h1>
          </div>
        </div>

        <div className="w-1/2 bg-primary flex justify-center items-center">
          {/* Card */}
          <form onSubmit={handleLogin} className='h-3/5 w-4/5 rounded-4xl p-10 bg-accent flex flex-col justify-around'>
              <div className='flex flex-col gap-5'>
                <h1 className='text-white text-6xl font-bold'>Login</h1>
                <p className='text-gray-50 text-3xl font-light'>Welcome, please enter your credentials.</p>
              </div>

              <div className='flex flex-col gap-5'>
                <CustomTextField text="Username" id="username" onChange={handleChange} icon={user} />
                <CustomPasswordField text="Password" id="password" onChange={handleChange} isPassVisible={isPassVisible} setPassVisible={setPassVisible}/>
              </div>

              {errorMessage ? <p className='text-red-400 text-xl font-medium'>{errorMessage}</p> : null}
              <button type='submit' className='rounded-2xl bg-primary border-4 border-white text-white text-4xl font-bold p-5 hover:cursor-pointer hover:text-primary hover:bg-white hover:border-primary transition delay-150 duration-250 ease-in-out'>Login</button>
          </form>
        </div>
    </div>
  )
}