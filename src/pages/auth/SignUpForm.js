import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import Container from "react-bootstrap/Container";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Button from "react-bootstrap/Button";
import Alert from "react-bootstrap/Alert";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import styles from "../../styles/SignUpForm.module.css";

const SignUpForm = () => {
  // Set initial form data
  const [formData, setFormData] = useState({
    username: "",
    password1: "",
    password2: "",
  });
  const { username, password1, password2 } = formData;

  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  // Handle form input changes
  const handleChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };

  // Handle form submission
  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await axios.post("/dj-rest-auth/registration/", formData);
      navigate("/sign-in");
    } catch (err) {
      setErrors(err.response?.data);
    }
  };

  return (
    <Container>
      <Row className="justify-content-center">
        <Col xs={12} md={8} lg={6}>
          <h2 className={`${styles.Header}`}>
            Welcome to <span>Social</span>
          </h2>
        </Col>
      </Row>
      <Form onSubmit={handleSubmit}>
        <Row className="justify-content-center">
          <Col xs={12} md={8} lg={6} className={`${styles.FormInputs}`}>
            {/* Username input field with error messages below it */}
            <Form.Group controlId="username">
              <Form.Label visuallyHidden>Username</Form.Label>
              <Form.Control
                type="text"
                placeholder="Username"
                name="username"
                value={username}
                onChange={handleChange}
                required
              />
            </Form.Group>
            {errors.username?.map((message, idx) => (
              <Alert variant="warning" key={idx}>
                {message}
              </Alert>
            ))}
          </Col>
        </Row>
        <Row className="justify-content-center">
          <Col xs={12} md={8} lg={6} className={`${styles.FormInputs}`}>
            {/* Password1 input field with error messages below it */}
            <Form.Group controlId="password1">
              <Form.Label visuallyHidden>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Password"
                name="password1"
                value={password1}
                onChange={handleChange}
                required
              />
            </Form.Group>
            {errors.password1?.map((message, idx) => (
              <Alert variant="warning" key={idx}>
                {message}
              </Alert>
            ))}
          </Col>
        </Row>
        <Row className="justify-content-center">
          <Col xs={12} md={8} lg={6} className={`${styles.FormInputs}`}>
            {/* Password2 input field with error messages below it */}
            <Form.Group controlId="password2">
              <Form.Label visuallyHidden>Password again</Form.Label>
              <Form.Control
                type="password"
                placeholder="Password again"
                name="password2"
                value={password2}
                onChange={handleChange}
                required
              />
            </Form.Group>
            {errors.password2?.map((message, idx) => (
              <Alert variant="warning" key={idx}>
                {message}
              </Alert>
            ))}
          </Col>
        </Row>
        <Row className="justify-content-center">
          <Col xs={12} md={8} lg={6}>
            {/* Submit button with non-field errors messages below it */}
            <Button variant="primary" type="submit">
              Sign Up!
            </Button>
            {errors.non_field_errors?.map((message, idx) => (
              <Alert variant="warning" key={idx}>
                {message}
              </Alert>
            ))}
          </Col>
        </Row>
      </Form>
      <Row className="justify-content-center">
        <Col xs={12} md={8} lg={6}>
          <p className={`${styles.SignInText}`}>
            Already have an account? Then please,{" "}
            <Link to="/sign-in">Sign In.</Link>
          </p>
        </Col>
      </Row>
    </Container>
  );
};

export default SignUpForm;
