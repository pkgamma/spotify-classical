import { getProviders, getSession, signIn } from "next-auth/react";

interface LoginProps {
  providers: Record<string, any>;
}

function Login({ providers }: LoginProps) {
  return (
    <div className="flex flex-col items-center min-h-screen w-full justify-center">
      {Object.values(providers).map((provider: any) => (
        <div key={provider.name}>
          <button
            className="text-white bg-[#18D860] hover:bg-[#18D860]/90 focus:ring-4 focus:outline-none focus:ring-[#18D860]/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-[#3b5998]/55 mr-2 mb-2"
            onClick={() => signIn(provider.id, { callbackUrl: "/" })}
          >
            Sign in with {provider.name}
          </button>
        </div>
      ))}
    </div>
  );
}

export default Login;

export async function getServerSideProps({ req }) {
  const providers = await getProviders();
  const session = await getSession({ req });

  if (session) {
    console.log("session", session);
    return {
      redirect: {
        destination: "/", // or any other page you want to redirect to
        permanent: false,
      },
    };
  }

  return {
    props: {
      providers,
    },
  };
}
