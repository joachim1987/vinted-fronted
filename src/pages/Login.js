import axios from "axios";
import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

const Login = ({ setUser }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const navigate = useNavigate();

  const location = useLocation();
  console.log("Location dans Login ===> ", location);

  const handleSubmit = async (event) => {
    try {
      event.preventDefault();
      const response = await axios.post(
        "https://lereacteur-vinted-api.herokuapp.com/user/login",
        {
          email: email,
          password: password,
        }
      );
      //   console.log(response.data);
      if (response.data.token) {
        setUser(response.data.token);
        // Naviguer vers Home
        // Naviguer vers Publish si fromPublish est true
        navigate(location.state?.fromPublish ? "/publish" : "/");
      }
    } catch (error) {
      // console.log(error.response);
      console.log(error.message);
      if (error.response && error.response.status === 401) {
        setErrorMessage("Mauvais email et/ou mot de passe");
      }
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          onChange={(event) => setEmail(event.target.value)}
          type="email"
          value={email}
        />
        <br />
        <input
          onChange={(event) => setPassword(event.target.value)}
          type="password"
          value={password}
        />
        <br />
        <span style={{ color: "red" }}>{errorMessage}</span>
        <br />
        <input type="submit" />
      </form>
    </div>
  );
};

export default Login;
