import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { mobile } from "../responsive";
import styled from "styled-components";
import { register } from "../redux/apiCalls";
import FailedModel from "../components/Model/FailedModel";

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const Wrapper = styled.div`
  width: 400px;
  padding: 0 20px;
  ${mobile({ width: "300px" })}
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
`;

const Title = styled.h1`
  font-weight: bold;
  text-align: center;
  color: black;
  ${mobile({ fontSize: "24px" })}
`;

const Input = styled.input`
  flex: 1;
  min-width: 40%;
  margin: 10px 0;
  padding: 10px;
  text-indent: 10px;
  border-radius: 30px;
  border: 1px solid gray;
`;

const Error = styled.span`
  text-align: center;
  color: #d9534f;
  font-size: 14px;
  padding: 5px 0;
`;

const Agreement = styled.span`
  display: block;
  padding-left: 15px;
  text-indent: -15px;
  font-size: 13px;
  color: #555;
  cursor: pointer;
`;

const CheckBox = styled.input`
  width: 12px;
  height: 12px;
  padding: 0;
  margin-right: 10px;
  vertical-align: middle;
  position: relative;
  top: -1px;
  cursor: pointer;
`;

const Button = styled.button`
  text-align: center;
  width: 40%;
  border: none;
  padding: 15px 0;
  background-color: #110f12;
  border-radius: 30px;
  color: white;
  cursor: pointer;
  margin: 10px auto;
  transition: all 0.3s ease-out;
  &:hover {
    opacity: 0.8;
  }
  &:disabled {
    background-color: #f8f8f8;
    color: black;
    cursor: not-allowed;
  }
`;

const Options = styled.a`
  margin: 5px 0px;
  font-size: 12px;
  text-decoration: underline;
  cursor: pointer;
  display: flex;
  text-align: center;
  flex-direction: column;
`;

const Register = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [firstname, setFirstName] = useState("");
  const [lastname, setLastName] = useState("");
  const [username, setUsername] = useState("");
  const [admin, setAdmin] = useState(true);
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const { isFetching, currentUser, error } = useSelector((state) => state.user);

  const checkPassword = () => {
    if (password !== confirmPassword) {
      return false;
    } else if (password.length < 8) {
      return false;
    }
    return true;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    checkPassword() &&
      register(dispatch, {
        firstname,
        lastname,
        username,
        password,
        email,
        isAdmin: admin,
      });
  };

  useEffect(() => {
    currentUser && navigate("/");
  }, [currentUser, navigate]);

  return (
    <>
      <FailedModel display={error === false ? "none" : "flex"} />
      <Container>
        <Wrapper>
          <Title>CREATE AN ACCOUNT</Title>
          <Form onSubmit={handleSubmit}>
            <Input
              type="text"
              placeholder="First Name"
              onChange={(e) => setFirstName(e.target.value)}
              required
              minLength={2}
            />
            <Input
              type="text"
              placeholder="Last Name"
              onChange={(e) => setLastName(e.target.value)}
              required
              minLength={2}
            />
            <Input
              type="text"
              placeholder="Username"
              onChange={(e) => setUsername(e.target.value)}
              required
              minLength={2}
            />
            <Input
              type="email"
              placeholder="Email"
              onChange={(e) => setEmail(e.target.value)}
              required
              minLength={5}
            />
            <Input
              type="password"
              placeholder="Password"
              onChange={(e) => setPassword(e.target.value)}
              required
              minLength={8}
            />
            <Input
              type="password"
              placeholder="Confirm Password"
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              minLength={8}
            />
            {password !== "" &&
            confirmPassword !== "" &&
            password !== confirmPassword ? (
              <Error>Password do not match</Error>
            ) : password !== "" && password.length < 8 ? (
              <Error>Password must be at least 8 characters</Error>
            ) : username !== "" && username.length < 5 ? (
              <Error>Username must be at least 5 characters</Error>
            ) : null}
            <Agreement htmlFor="false" style={{ marginTop: "10px" }}>
              <CheckBox
                type="checkbox"
                name="isAdmin"
                value={admin}
                onChange={(prev) => setAdmin((prev) => !prev)}
                id="false"
                required
              />
              By creating an account, I consent to the processing of my personal
              data in accordance with the <b> PRIVACY POLICY</b>
            </Agreement>
            <Button type="submit" disabled={isFetching ? true : false}>
              Sign Up
            </Button>
          </Form>
          <Options
            onClick={() => {
              navigate("/login");
            }}
          >
            Already a member? Click here
          </Options>
        </Wrapper>
      </Container>
    </>
  );
};

export default Register;
