import React, { useState } from 'react'
import { authUser, userLogin } from '../services/authService';
import { useForm } from 'react-hook-form';

import { authPayload , setToken} from '../../src/services/localStorage';
import { Navigate, useNavigate } from 'react-router-dom';

const Login = () => {
    const [loading, isLoading] = useState<boolean>(false);
    const [newError, setnewError] = useState<boolean>(false);
    const [hidePwd, sethidePwd] = useState<boolean>(false);
    const [errorMessage, seterrorMessage] = useState("");
    const {register, handleSubmit, formState: {errors}, reset} = useForm<userLogin>({mode: 'onChange'});
    const navigate = useNavigate();

    const handleLoginSubmit = async (userLoginDetails: userLogin) => {
      isLoading(true);
      const data = await authUser(userLoginDetails);
      if (data.message === "Invalid credentials") {
        seterrorMessage("Invaliid credentials");
        isLoading(false);
        setnewError(true);
        reset();
        return;
      };
      authPayload(data);
      setToken(data.accessToken);
      reset();
      navigate('/dashboard');
      isLoading(false);
    };

    const onpasswordDisplay = () => sethidePwd(!hidePwd);

  return (
    <div className="auth-container d-flex flex-column align-items-center gap-2 justify-content-center overflow-hidden">
      <div className="auth-title">
        <span className="fw-bold fs-3">Login Now!</span>
      </div>
      <div className="auth-form">
        <form className="row" onSubmit={handleSubmit(handleLoginSubmit)}>
          <div className="auth-inputs d-flex flex-column position-relative gap-2">
            <label htmlFor="username">Username</label>
            <input
              className="form-control bg-info bg-opacity-10 fw-semibold fs-5"
              type="text"
              id="username"
              placeholder="Username"
              {...register("username", { required: 'username is required' })}
            />
            {(errors.username ) && (
              <span className='auth-error' >{errors.username.message}</span>
            )}
          </div>
          <div className="auth-inputs d-flex flex-column position-relative gap-2 mb-4">
            <label htmlFor="password">Password</label>
            <input
              type={ hidePwd ? 'text' : 'password'}
              id="password"
              placeholder="Password"
              className="form-control bg-info bg-opacity-10 fw-semibold fs-5"
              {...register("password", { required: 'password id required' })}
            />
            <span className={`${errors.password ? 'new' : 'top-50'} position-absolute end-0 me-3 cursor`} onClick={onpasswordDisplay}>{ hidePwd ? 'Hide' : 'Show'}</span>
            {errors.password &&(
              <span className='auth-error' >{errors.password.message}</span>
            )}
          </div>
          {newError && (
            <div className="auth-error" >
              {errorMessage}
            </div>
          )}
          <div className="auth-submit">
            <button
              className="auth-btn col-12 rounded p-3 fw-semibold"
              type="submit"
            >
              {loading ? (
                <div className="spinner-border spinner-border-sm" role="status">
                  <span className="visually-hidden">Loading...</span>
                </div>
              ) : (
                "LogIn Now"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login