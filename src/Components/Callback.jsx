import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Callback() {
  const navigate = useNavigate();

  useEffect(() => {
    const handleOAuthResponse = async () => {
      try {
        // Capture the URL params after redirecting from Google OAuth
        const urlParams = new URLSearchParams(window.location.search);
        const code = urlParams.get("code");

        // If the code is not available, there is an issue in the OAuth process
        if (!code) {
          throw new Error("Authorization code not found");
        }

        // Send the code to your backend to exchange it for an access token
        const response = await fetch(
          `https://v2back.smartcardai.com/login/oauth/callback?code=${code}`
        );
        const tokenData = await response.json();

        const accessToken = tokenData.access_token;
        if (accessToken) {
          console.log("Access Token:", accessToken);
          // Store the token in localStorage for future use
          localStorage.setItem("accessToken", accessToken);

          // Redirect to another page (like dashboard or home)
          navigate("/home");
        } else {
          throw new Error("No access token received");
        }
      } catch (error) {
        console.error("OAuth flow failed:", error);
        // Handle error (e.g., navigate to error page)
        navigate("/error");
      }
    };

    handleOAuthResponse();
  }, [navigate]);

  return <div>Processing login...</div>;
}

export default Callback;
