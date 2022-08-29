import { useState } from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import { login } from "../redux/apiCalls";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import FailedModel from "../components/Model/FailedModel";
import { useNavigate } from "react-router-dom";
import { mobile } from "../responsive";

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
`;

const Wrapper = styled.div`
  width: 85vw;
  max-width: 400px;
  padding: 20px;
  ${mobile({ width: "300px", flexDirection: "column" })}
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
`;

const Title = styled.h1`
  color: black;
  font-weight: bold;
  margin: 20px auto;
  text-align: center;
  ${mobile({ fontSize: "24px" })}
`;

const Input = styled.input`
  flex: 1;
  width: 85%;
  min-width: 40%;
  margin: 10px auto;
  padding: 10px;
  text-indent: 10px;
  border-radius: 30px;
  border: 1px solid lightgrey;
  ${mobile({ width: "100%" })}
`;

const Button = styled.button`
  text-align: center;
  width: 40%;
  border: none;
  padding: 10px 0;
  background-color: #110f12;
  border-radius: 30px;
  color: white;
  cursor: pointer;
  margin: 5px auto;
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

const Error = styled.span`
  color: red;
`;

const Link = styled.a`
  margin: 5px 0px;
  font-size: 12px;
  text-decoration: underline;
  cursor: pointer;
`;

const Agreement = styled.label`
  color: grey;
  width: "85%";
  font-size: 12px;
  text-align: left;
  padding-bottom: 10px;
  display: block;
  margin-left: 60px;
  text-indent: -20px;
  ${mobile({ marginLeft: "25px" })}
`;
const CheckBox = styled.input`
  vertical-align: middle;
  position: relative;
  margin-right: 10px;
  bottom: 1px;
`;
const Options = styled.a`
  margin: 8px 0px;
  font-size: 12px;
  color: grey;
  text-decoration: underline;
  cursor: pointer;
  display: flex;
  flex-direction: column;
`;

//Google Login Testing

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isFetching, error } = useSelector((state) => state.user);

  const handleClick = (e) => {
    e.preventDefault();
    login(dispatch, { username, password });
  };

  // function handleCallbackResponse(response) {
  //   console.log("Encoded JWT ID token: " + response.credential);
  // }

  // useEffect(() => {
  //   //global google
  //   const google = window.google;
  //   google.accounts.id.initialize({
  //     client_id:
  //       "307890141883-nq6v63ammi94re6bji5k9q404ccdhu6s.apps.googleusercontent.com",
  //     callback: handleCallbackResponse,
  //   });

  //   google.accounts.id.renderButton(document.getElementById("signInDiv"), {
  //     theme: "outline",
  //     size: "large",
  //   });
  // }, []);

  return (
    <Container>
      <FailedModel display={error === false ? "none" : "flex"} />
      <Wrapper>
        <Title>Hi, Welcome Back </Title>
        <Form>
          <Input
            type="text"
            placeholder="username"
            onChange={(e) => setUsername(e.target.value)}
            required
          />
          <Input
            placeholder="password"
            type="password"
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <Agreement htmlFor="log" style={{ marginTop: "10px" }}>
            <CheckBox
              type="checkbox"
              id="log"
              style={{ marginRight: "10px" }}
              defaultChecked
            />
            Keep me logged in
          </Agreement>
          <Button onClick={handleClick} disabled={isFetching ? true : false}>
            LOGIN
          </Button>
          {/* <span>
            <div id="signInDiv"></div>
          </span> */}
          {/* {error && <Error>Something went wrong...</Error>} */}
          <Options>Forgot password?</Options>
          <Options
            onClick={() => {
              navigate("/register");
            }}
          >
            Not yet a member? Click here
          </Options>
        </Form>
      </Wrapper>
    </Container>
  );
};

export default Login;
