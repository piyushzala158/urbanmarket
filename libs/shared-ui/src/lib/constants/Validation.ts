import * as Yup from "yup";
import YupPassword from "yup-password";
YupPassword(Yup);
// Login Schema start

export const LoginSchema = Yup.object().shape({
    email: Yup.string().email("Invalid email").required("Email is required"),
    password: Yup.string().required("Password is required"),
  });
  // Login Schema end



// Sign Up Schema using Yup
export const SignUpSchema = Yup.object().shape({
  username: Yup.string().min(2).max(30).required("Please Enter Your First Name"),
  email: Yup.string().email().required("Please Enter Email"),
  password: Yup.string()
    .required("Please Enter Password")
    .min(
      8,
      "password must contain 8 or more characters with at least one of each: uppercase, lowercase, number and special"
    )
    .minLowercase(1, "password must contain at least 1 lower case letter")
    .minUppercase(1, "password must contain at least 1 upper case letter")
    .minNumbers(1, "password must contain at least 1 number")
    .minSymbols(1, "password must contain at least 1 special character"),
    confirmPassword: Yup.string()
    .required("Please Enter Confirm Password")
    .oneOf([Yup.ref("password"),''], "Password didn't match"),
});

// Sign Up Schema End


//Product Schema start

export const ProductSchema = Yup.object().shape({
  name: Yup.string().required("Please Enter Product Name"),
  price: Yup.number().required("Please Enter Product Price"),
  description: Yup.string().required("Please Enter Product Description"),
  category: Yup.string().required("Please Enter Product Category"),
  brand: Yup.string().required("Please Enter Product Brand"),
  image:Yup.mixed()
  .required('Please select a file')
});

//Product Schema end

//Category Schema start

export const CategorySchema = Yup.object().shape({
  name: Yup.string().required("Please Enter Category Name"),
  description: Yup.string().required("Please Enter Category Description"),
  items: Yup.string().required("Please Enter Available Items"),
  image:Yup.mixed()
  .required('Please select a file')
});

//Category Schema end