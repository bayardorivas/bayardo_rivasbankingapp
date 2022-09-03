import { Field, Formik, Form } from "formik";
import { useContext, useState } from "react";
import Card from "./card";
import UserContext from "./context";

const WithDraw = () => {
  const {
    auth: { activeUser },
    addTransaction,
  } = useContext(UserContext);
  const [show, setShow] = useState(true);
  const [btnSubmit, setBtnSubmit] = useState(true);
  console.log(activeUser);

  const validateAmount = (value) => {
    let error;
    if (!value) {
      error = "Field required";
    } else if (value <= 0) {
      error = "Amount must be greater than zero";
    } else if (activeUser.balance - value < 0) {
      error = `Amount can not be greater than actual balance`;
    }
    setBtnSubmit(false);
    return error;
  };

  const handleSubmit = (values) => {
    const transaction = {
      amount: values.amount,
      date: new Date(),
      type: "WITHDRAW",
    };
    addTransaction(transaction);
    setShow(false);
  };

  return (
    <>
      <div className="row mt-3">
        <div className="col-6 offset-3">
          <Card
            // bgcolor="secondary"
            header="Make your withdraw"
            body={
              show ? (
                <>
                  <Formik
                    initialValues={{
                      amount: "",
                    }}
                    onSubmit={(values) => handleSubmit(values)}
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
                          <h2>Currrent Balance: {activeUser.balance}</h2>
                          {console.log(activeUser.balance)}
                          <label htmlFor="amount">Amount to withdraw</label>

                          <Field
                            id="amount"
                            className="form-control"
                            name="amount"
                            type="number"
                            validate={validateAmount}
                            value={values.amount}
                            onChange={handleChange}
                          />
                          {errors.amount && touched.amount && (
                            <div
                              id="amountError"
                              className="form-text text-danger"
                            >
                              {errors.amount}
                            </div>
                          )}
                        </div>

                        <div className="mb-3">
                          <button
                            className="btn btn-secondary"
                            id="submitBtn"
                            type="submit"
                            // disabled={errors.amount}
                            disabled={btnSubmit}
                          >
                            WithDraw
                          </button>
                        </div>
                      </Form>
                    )}
                  </Formik>
                </>
              ) : (
                <>
                  <div className="alert alert-success" role="alert">
                    WithDraw succesfully
                  </div>
                  <button
                    type="submit"
                    className="btn btn-secondary"
                    onClick={(e) => {
                      setShow(true);
                      setBtnSubmit(true);
                    }}
                  >
                    Go back
                  </button>
                </>
              )
            }
          />
        </div>
      </div>
    </>
  );
};

export default WithDraw;
