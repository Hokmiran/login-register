import React, { useState } from "react";
// import { useHistory } from "react-router-dom";
import { Grid, TextField, Button, Alert, AlertTitle, Container, Box, Typography } from "@mui/material";
import { Formik, Form, ErrorMessage, Field } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";

const validationSchema = Yup.object().shape({
    code: Yup.string().required("Confirmation Code is required")
});

export const ConfirmationPage = () => {
    const nav = useNavigate();
    const [errorMessage, setErrorMessage] = useState("");
    const { state } = useLocation()
    const initialValues = {
        code: "",
    }
    const handleSubmit = async ({ code }, { setSubmitting }) => {
        const data = {
            code,
            email: state
        }
        try {
            const response = await axios.post("http://localhost:3001/api/user/confirm", data);
            localStorage.setItem("token", JSON.stringify(response.data))
            nav("/");
        } catch (error) {
            if (error.response && error.response.status === 400) {
                setErrorMessage(error.response.data.error);
            } else {
                console.error(error);
            }
        }

        setSubmitting(false);
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
                    Confirmation
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
                                        autoComplete="code"
                                        name="code"
                                        required
                                        fullWidth
                                        id="code"
                                        label="Confirmation Code"
                                    />
                                    <ErrorMessage
                                        component="div"
                                        name="code"
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
                                Verify
                            </Button>
                        </Form>
                    )}
                </Formik>
                {errorMessage && (
                    <Alert severity="error" sx={{ mt: 2 }}>
                        <AlertTitle>Error</AlertTitle>
                        {errorMessage}
                    </Alert>
                )}
            </Box>
        </Container>
    );
};
