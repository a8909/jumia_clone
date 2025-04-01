import React, { useState } from 'react'
import { authUser, userLogin } from '../services/authService';
import { useForm } from 'react-hook-form';

import { authPayload , setToken} from '../../src/services/localStorage';
import { Navigate, useNavigate } from 'react-router-dom';

const Login = () => {
    const [loading, isLoading] = useState<boolean>(false);
    const {register, handleSubmit, formState: {errors, touchedFields, dirtyFields}, reset} = useForm<userLogin>({mode: 'onChange'});
    const navigate = useNavigate();

    const handleLoginSubmit = async (userLoginDetails: userLogin) => {
      isLoading(true);
      const data = await authUser(userLoginDetails);
      authPayload(data);
      setToken(data.accessToken);
      reset();
      navigate('/dashboard');
      isLoading(false);
    };

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
              {...register("username", { required: true })}
            />
            {touchedFields.username && !dirtyFields.username && (
              <span style={{ color: "red" }}>Invalid input</span>
            )}
          </div>
          <div className="auth-inputs d-flex flex-column position-relative gap-2 mb-4">
            <label htmlFor="password">Password</label>
            <input
              type="text"
              id="password"
              placeholder="Password"
              className="form-control bg-info bg-opacity-10 fw-semibold fs-5"
              {...register("password", { required: true })}
            />
            {touchedFields.password && !dirtyFields.password && (
              <span style={{ color: "red" }}>Invalid input</span>
            )}
          </div>
          <div className="auth-error">{errors.root?.message}</div>
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