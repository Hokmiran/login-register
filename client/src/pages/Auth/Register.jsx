import {
  Grid,
  Typography,
  TextField,
  Button,
  Alert,
  AlertTitle,
  Link,
  Box,
  Container,
} from "@mui/material";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { useState } from "react";
import axios from 'axios';
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";


export const RegisterPage = () => {



  const [errorMessage, setErrorMessage] = useState("");
  const [emailExistsError, setEmailExistsError] = useState(false);

  const nav = useNavigate();

  const initialValues = {
    userName: "",
    email: "",
    password: "",
  };

  const validationSchema = Yup.object().shape({
    userName: Yup.string().required("First Name is required"),
    email: Yup.string().email("Invalid email").required("Email is required"),
    password: Yup.string().required("Password is required"),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("password"), null], "Passwords must match")
      .required("Confirm Password is required"),
  });

  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      const response = await axios.post(
        "http://localhost:3001/api/user/register",
        values
      );
      console.log(response.data);
      nav("/confirmation", { state: response.data.email });
      setSubmitting(false);
    } catch (error) {
      if (error.response.status === 409) {
        if (error.response.data.msg) {
          setEmailExistsError(true);
          setErrorMessage(error.response.data.msg);
          console.log(error.response.data.msg);
        }
      } else {
        console.error(error);
        // Handle other error cases
      }
      setSubmitting(false);
    }
  };
  return (
    <Container component="main" maxWidth="sm">
      <Box
        sx={{
          boxShadow: 3,
          borderRadius: 2,
          px: 4,
          py: 6,
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Typography mb={1} component="h1" variant="h5">
          Sign Up
        </Typography>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting }) => (
            <Form noValidate>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <Field
                    as={TextField}
                    autoComplete="uname"
                    name="userName"
                    required
                    fullWidth
                    id="userName"
                    label="User Name"
                  />
                  <ErrorMessage
                    component="div"
                    name="userName"
                    className="error-message"
                  />
                </Grid>
                <Grid item xs={12}>
                  <Field
                    as={TextField}
                    autoComplete="email"
                    name="email"
                    required
                    fullWidth
                    id="email"
                    label="Email Address"
                  />
                  <ErrorMessage
                    component="div"
                    name="email"
                    className="error-message"
                  />
                </Grid>
                <Grid item xs={12}>
                  <Field
                    as={TextField}
                    autoComplete="new-password"
                    name="password"
                    required
                    fullWidth
                    id="password"
                    label="Password"
                    type="password"
                  />
                  <ErrorMessage
                    component="div"
                    name="password"
                    className="error-message"
                  />
                </Grid>
                <Grid item xs={12}>
                  <Field
                    as={TextField}
                    autoComplete="new-password"
                    name="confirmPassword"
                    required
                    fullWidth
                    id="confirmPassword"
                    label="Confirm Password"
                    type="password"
                  />
                  <ErrorMessage
                    component="div"
                    name="confirmPassword"
                    className="error-message"
                  />
                </Grid>
              </Grid>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                disabled={isSubmitting}
                sx={{ mt: 3, mb: 2 }}
              >
                Sign Up
              </Button>
              <Grid container justifyContent="flex-end">
                <Grid item>
                  <Link
                    style={{
                      fontFamily:
                        ' "Roboto","Helvetica","Arial",sans-serif',
                      textDecorationColor: "rgba(25, 118, 210, 0.4)",
                      color: "rgba(25, 118, 210, 0.4)",
                    }}
                    to="/"
                  >
                    Already have an account? Sign in
                  </Link>
                </Grid>
              </Grid>
            </Form>
          )}
        </Formik>

        {emailExistsError && (
          <Alert severity="error" onClose={() => setEmailExistsError(false)} sx={{ mt: 2 }}>
            <AlertTitle>Error</AlertTitle>
            {errorMessage} {/* Display the error message */}
          </Alert>
        )}
      </Box>
    </Container>
  );
};
