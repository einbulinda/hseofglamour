import * as Yup from "yup";

const formValidations = {
  signInSchema: Yup.object().shape({
    email: Yup.string().email("Invalid email").required("*Required"),
    password: Yup.string().required("*Required"),
  }),
};

export default formValidations;
