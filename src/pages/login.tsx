import { getProviders, signIn } from "next-auth/react";

interface LoginProps {
  providers: Record<string, any>;
}

function Login({ providers }: LoginProps) {
  return (
    <div className="flex flex-col items-center min-h-screen w-full justify-center">
      {Object.values(providers).map((provider: any) => (
        <div key={provider.name}>
          <button
            className="bg-[#18D860] text-white p-4 rounded-full"
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

export async function getServerSideProps() {
  const providers = await getProviders();
  return {
    props: {
      providers,
    },
  };
}
