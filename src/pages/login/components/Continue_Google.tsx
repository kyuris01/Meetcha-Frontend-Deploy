import google_logo from "../../../assets/Google.svg";

const Continue_Google = () => {
  const handleGoogleLogin = () => {
    const clientId = import.meta.env.VITE_GOOGLE_CLIENT_ID;
    const addr = import.meta.env.VITE_FRONT_URL;
    const redirectUri = encodeURIComponent(`${addr}/login-complete`); // Google 콘솔에 등록한 리디렉션 URI
    const scope = encodeURIComponent(
      "openid email profile https://www.googleapis.com/auth/calendar.events https://www.googleapis.com/auth/calendar.readonly"
    );
    const responseType = "code";
    const accessType = "offline";
    const prompt = "consent";

    const authUrl = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${clientId}&redirect_uri=${redirectUri}&response_type=${responseType}&scope=${scope}&access_type=${accessType}&include_granted_scopes=true&prompt=${prompt}`;
    window.location.href = authUrl;
  };

  return (
    <button className="google_button" onClick={handleGoogleLogin}>
      <img src={google_logo} alt="google_logo" />
      <p>Sign in with Google</p>
    </button>
  );
};

export default Continue_Google;
