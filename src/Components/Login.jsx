import  { useState } from "react";
import axios from "axios";

function LoginButton() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [user, setUser] = useState(null);

  const handleLogin = () => {
    const googleAuthUrl = "https://v2back.smartcardai.com/login/oauth";
    window.location.href = googleAuthUrl;
  };

  // Handle the OAuth callback to capture the code
  const handleCallback = async () => {
    const urlParams = new URLSearchParams(window.location.search);
    const authCode = urlParams.get("code");

    if (authCode) {
      try {
        const response = await axios.post('https://v2back.smartcardai.com/login/oauth/callback', { code: authCode });
        const { access_token } = response.data;
        setLoggedIn(true);
        setUser({ name: "User" });  // You can fetch user info with the token if needed
        localStorage.setItem("access_token", access_token);
      } catch (error) {
        console.error("Error during authentication:", error);
      }
    }
  };

  // Check if the callback is triggered
  if (window.location.search.includes("code")) {
    handleCallback();
  }

  return (
    <>
      {!loggedIn ? (
        <button onClick={handleLogin}>Login with Google</button>
      ) : (
        <div>
          <p>Welcome, {user?.name}</p>
          <button onClick={() => { setLoggedIn(false); setUser(null); }}>Logout</button>
        </div>
      )}
    </>
  );
}

export default LoginButton;
