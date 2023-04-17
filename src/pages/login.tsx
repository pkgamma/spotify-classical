import { getProviders, signIn } from "next-auth/react";

function Login() {
  const handleLogin = () => {
    signIn("spotify", { callbackUrl: "/" });
  };

  return (
    <div className="flex flex-col items-center min-h-screen w-full justify-center">
      <button
        className="flex px-12 py-2 text-lg tracking-widest uppercase rounded-full focus:outline-none bg-primary hover:bg-opacity-80"
        onClick={handleLogin}
      >
        Login
      </button>
    </div>
  );
}

export default Login;
