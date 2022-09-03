import { useState, useContext } from "react";
import { Form, Formik, Field } from "formik";
import UserContext from "./context";
import Card from "./card";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [show, setShow] = useState(true);

  const { auth, setUser } = useContext(UserContext);
  const navigate = useNavigate();

  const validateEmail = (value) => {
    let error;
    if (!value) {
      error = "Field required";
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)) {
      error = "Username should be an email";
    }
    return error;
  };

  const validatePass = (value) => {
    let error;
    if (!value) {
      error = "Field required";
    } else if (value.length < 8) {
      error = "Password must be 8 character long";
    }
    return error;
  };

  const handleLogin = (values) => {
    const { email, password } = values;

    const userLogged = auth.users.find((user) => {
      return user.email === email && user.secret === password;
    });

    if (!userLogged) {
      setShow(false);
      return;
    }
    setUser(userLogged);
    navigate("/");
  };

  const clearForm = () => {
    setShow(true);
  };

  return (
    <div className="row mt-3">
      <div className="col-6 offset-3">
        <Card
          header="Login"
          body={
            show ? (
              <>
                <Formik
                  initialValues={{
                    email: "",
                    password: "",
                  }}
                  onSubmit={(values) => handleLogin(values)}
                >
                  {({
                    errors,
                    touched,
                    handleChange,
                    values,
                    isValidating,
                  }) => (
                    <Form>
                      <div className="mb-3">
                        <label htmlFor="emailField">Email</label>

                        <Field
                          id="emailField"
                          className="form-control"
                          name="email"
                          placeholder="Write an email"
                          type="email"
                          validate={validateEmail}
                          value={values.email}
                          onChange={handleChange}
                        />
                        {errors.email && touched.email && (
                          <div id="emailError" className="text-danger">
                            {errors.email}
                          </div>
                        )}
                      </div>
                      <div className="mb-3">
                        <label htmlFor="pswField">Password </label>
                        <Field
                          id="pswField"
                          className="form-control"
                          name="password"
                          placeholder="****"
                          type="password"
                          validate={validatePass}
                          value={values.password}
                          onChange={handleChange}
                        />
                        {errors.password && touched.password && (
                          <div id="pswError" className="text-danger">
                            {errors.password}
                          </div>
                        )}
                      </div>
                      <div className="mb-3">
                        <button
                          className="btn btn-secondary"
                          id="submitBtn"
                          type="submit"
                          disabled={
                            errors.password ||
                            errors.email ||
                            values.email.length === 0 ||
                            values.password.length === 0
                          }
                        >
                          Login
                        </button>
                      </div>
                    </Form>
                  )}
                </Formik>
              </>
            ) : (
              <>
                <div className="alert alert-danger" role="alert">
                  Error login!
                </div>
                <button
                  type="submit"
                  className="btn btn-secondary"
                  onClick={clearForm}
                >
                  Go back
                </button>
              </>
            )
          }
        />

        <Card
          header="Available only for evaluation"
          title="Preloaded user"
          text=""
          body={
            <>
              <div className="text-start">
                <p className="fw-semibold">Username: bayardo@gmail.com</p>
                <p className="fw-semibold">Password: bayardo22</p>
              </div>
            </>
          }
        />
      </div>
    </div>
  );
};
export default Login;
