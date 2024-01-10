import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { registerUser } from "../../store/Login/Login.action";
import loginImage from "../../assets/login-slide-4.webp";

const Register = () => {
  const { newUser } = useSelector((state) => state.login);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();    

  const submitForm = async (data) => {
    await dispatch(registerUser(data));
  };
  useEffect(() => {
    if (newUser) {
      navigate("/");
    }
  }, [newUser]);

  return (
    <>
      <div
        className="container-fluid h-100 d-flex justify-content-center"
        style={{ position: "absolute" }}
      >
        <div className="d-flex justify-content-center align-items-center">
          <div className="col-md-9 col-lg-6 col-xl-5">
            <img src={loginImage} className="img-fluid" alt="Sample image" />
          </div>
          <div className="col-md-8 col-lg-6 col-xl-4 offset-xl-1">
            <form onSubmit={handleSubmit(submitForm)}>
              <div className="form-outline mb-4">
                <label className="form-label" htmlFor="name">
                  Name
                </label>

                <input
                  type="text"
                  className="form-control form-control-lg"
                  {...register("name", {
                    required: true,
                    validate: (value) => {
                      return !!value.trim();
                    },
                  })}
                />
                {errors.name && (
                  <p style={{ color: "red" }}>Name is required</p>
                )}
              </div>
              <div className="form-outline mb-4">
                <label className="form-label" htmlFor="email">
                  Email address
                </label>

                <input
                  type="email"
                  className="form-control form-control-lg"
                  {...register("email", {
                    required: true,
                    validate: (value) => {
                      return !!value.trim();
                    },
                  })}
                />
                {errors.email && (
                  <p style={{ color: "red" }}>email is required</p>
                )}
              </div>

              <div className="form-outline mb-3">
                <label className="form-label" htmlFor="password">
                  Password
                </label>

                <input
                  type="password"
                  className="form-control form-control-lg"
                  {...register("password", {
                    required: true,
                    validate: (value) => {
                      return !!value.trim();
                    },
                  })}
                />
                {errors.password && (
                  <p style={{ color: "red" }}>Password is required</p>
                )}
              </div>
              <div className="text-center text-lg-start mt-4 pt-2">
                <button
                  type="submit"
                  className="btn  btn-lg"
                  style={{
                    paddingLeft: "2.5rem",
                    paddingRight: "2.5rem",
                    backgroundColor: "#FD886E",
                  }}
                >
                  Register
                </button>
                <p className="small fw-bold mt-2 pt-1 mb-0">
                  if you have an account?{" "}
                  <a href="/" style={{ color: "#FD886E" }}>
                    Login
                  </a>
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};
export default Register;
