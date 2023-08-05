import * as Yup from "yup";

const formValidations = {
  signInSchema: Yup.object().shape({
    email: Yup.string().email("Invalid email").required("*Required"),
    password: Yup.string().required("*Required"),
  }),
  signUpSchema: Yup.object().shape({
    firstName: Yup.string().required("*Required"),
    lastName: Yup.string().required("*Required"),
    email: Yup.string().email("Invalid email").required("*Required"),
    password: Yup.string().required("*Required"),
    confirmPassword: Yup.string().required("*Required"),
  }),
};

export default formValidations;
