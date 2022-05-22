import React, { useState } from 'react'
import GoogleLogin from 'react-google-login'
import { useNavigate } from 'react-router-dom'
import { FcGoogle } from 'react-icons/fc'

import axios from 'axios'

import shareVideo from '../asset/img/share.mp4'
import logo from '../asset/img/codigram-logo.png'

//import { client } from '../client';

const Login = (props) => {
  const { loginCbHandler } = props;
    const [form, setForm] = useState({
        username: '',
        password: '',
    })

    const loginUser = async () => {
        try {
            let result = await axios({
                method: 'POST',
                url: 'http://localhost:3001/backend/user/login',
                data: form
            })
            const access_token = result.data.access_token
            const user = result.data.user
            localStorage.setItem('access_token', access_token)
            localStorage.setItem('user', user)
            console.log(user)

            if ( access_token !== '' ) {
              navigate('/', { replace: true }); 
            }
        } catch (err) {
            console.log(err)
        }
    }

    const submitHandler = () => {
        // console.log(form)
        loginUser()
    }

    const loginHandler = () => {
      loginCbHandler(true)
  }
  const logoutHandler = () => {
      localStorage.clear()
      loginCbHandler(false)
  }

  const navigate = useNavigate();

  const responseGoogle = (response) => {
    localStorage.setItem('user', JSON.stringify(response.profileObj));
    const { name, googleId, imageUrl } = response.profileObj;
    const doc = {
      _id: googleId,
      _type: 'user',
      userName: name,
      image: imageUrl,
    };
    /*client.createIfNotExists(doc).then(() => {
      navigate('/', { replace: true });
    });*/
  };

  return (
    <div className="flex justify-start items-center flex-col h-screen">
      <div className=" relative w-full h-full">
        <video
          src={shareVideo}
          type="video/mp4"
          loop
          controls={false}
          muted
          autoPlay
          className="w-full h-full object-cover"
        />

        <div className="absolute flex flex-col justify-center items-center top-0 right-0 left-0 bottom-0    bg-blackOverlay">
          <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
            <div className="p-5">
              <img src={logo} width="130px" />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="username">
                Username
              </label>
              <input onChange={(e) => setForm({ ...form, username: e.target.value })}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="username" type="text" placeholder="Username" />
                <p className="text-red-500 text-xs italic">Please choose a username.</p>
            </div>
            <div className="mb-6">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
                Password
              </label>
              <input onChange={(e) => setForm({ ...form, password: e.target.value })}
                className="shadow appearance-none border border-red-500 rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" id="password" type="password" placeholder="******************" />
                  <p className="text-red-500 text-xs italic">Please choose a password.</p>
            </div>
            <div className="flex items-center justify-between">
              <button onClick={() => submitHandler()} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="button">
                Log In  
              </button>
              <a className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800" href="/RegisterPage.js">
                Don't have an account?
              </a>
            </div>
            <div className="shadow-2xl">
              <GoogleLogin
                  //clientId={`${process.env.REACT_APP_GOOGLE_API_TOKEN}`}
                  render={(renderProps) => (
                    <button
                      type="button"
                      className="bg-mainColor flex justify-center items-center p-3 rounded-lg cursor-pointer outline-none"
                      onClick={renderProps.onClick}
                      disabled={renderProps.disabled}
                    >
                      <FcGoogle className="mr-4" /> Sign in with google
                    </button>
                  )}
                onSuccess={responseGoogle}
                onFailure={responseGoogle}
                cookiePolicy="single_host_origin"
              />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login