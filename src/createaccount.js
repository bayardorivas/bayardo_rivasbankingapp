import { useState, useContext } from "react";
import { Form, Formik, Field } from "formik";
import UserContext from "./context";
import Card from "./card";

const CreateAccount = () => {
  const [show, setShow] = useState(true);
  // const [status, setStatus] = useState("");
  // const [name, setName] = useState("");
  // const [email, setEmail] = useState("");
  // const [password, setPassword] = useState("");
  const ctx = useContext(UserContext);

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

  const validateName = (value) => {
    let error;
    if (!value) {
      error = "Field required";
    }
    return error;
  };

  const handleCreate = ({ name, email, secret }) => {
    // setName(name);
    // setEmail(email);
    // setPassword(password);

    ctx.auth.users.push({
      name,
      email,
      secret,
      balance: 100,
      transactions: [
        {
          amount: 100,
          date: new Date(),
          type: "DEPOSIT",
        },
      ],
    });
    setShow(false);
  };

  const clearForm = () => {
    // setName("");
    // setEmail("");
    // setPassword("");
    setShow(true);
  };

  return (
    <div className="row mt-3">
      <div className="col-6 offset-3">
        <Card
          header="Create Account"
          // status={status}
          body={
            show ? (
              <>
                <Formik
                  initialValues={{
                    name: "",
                    email: "",
                    secret: "",
                  }}
                  onSubmit={(values) => handleCreate(values)}
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
                        <label htmlFor="nameField">Name</label>

                        <Field
                          id="nameField"
                          className="form-control"
                          name="name"
                          placeholder="Please, write name"
                          type="text"
                          validate={validateName}
                          value={values.name}
                          onChange={handleChange}
                        />
                        {errors.name && touched.name && (
                          <div id="nameError" className="text-danger">
                            {errors.name}
                          </div>
                        )}
                      </div>
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
                          name="secret"
                          placeholder="****"
                          type="password"
                          validate={validatePass}
                          value={values.secret}
                          onChange={handleChange}
                        />
                        {errors.secret && touched.secret && (
                          <div id="pswError" className="text-danger">
                            {errors.secret}
                          </div>
                        )}
                      </div>
                      <div className="mb-3">
                        <button
                          className="btn btn-secondary"
                          id="submitBtn"
                          type="submit"
                        >
                          Submit
                        </button>
                      </div>
                    </Form>
                  )}
                </Formik>
              </>
            ) : (
              <>
                <div className="alert alert-success" role="alert">
                  Account created succesfully!
                </div>
                <button
                  type="submit"
                  className="btn btn-secondary"
                  onClick={clearForm}
                >
                  Add another user{" "}
                </button>
              </>
            )
          }
        />
      </div>
    </div>
  );
};
export default CreateAccount;
