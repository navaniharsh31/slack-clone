import Logo from "../assets/img/logo.png";
import { auth, provider } from "../firebase";
const Login = () => {
  const signIn = (e) => {
    e.preventDefault();
    auth.signInWithPopup(provider).catch((error) => alert(error.message));
  };
  return (
    <div className="h-screen w-screen flex flex-col justify-center items-center">
      <div className="flex flex-col items-center">
        <img
          src="https://cdn.brandfolder.io/5H442O3W/at/pl546j-7le8zk-6gwiyo/Slack_Mark.svg"
          alt="logo"
        />
        <h1 className="text-4xl font-bold text-slack">Sign in to Slack</h1>
        <button
          className="px-4 py-2 bg-green-600 rounded-lg uppercase font-medium mt-8 text-white"
          onClick={(e) => signIn(e)}
        >
          Sign in with google
        </button>
      </div>
    </div>
  );
};

export default Login;
