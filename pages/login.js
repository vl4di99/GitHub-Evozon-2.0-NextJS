import { signIn, getProviders } from "next-auth/react";

function Login({ providers }) {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen w-full bg-slate-200">
      {Object.values(providers).map((provider) => (
        <div
          key={provider.name}
          className="flex flex-col items-center justify-center"
        >
          <img
            src="https://pngset.com/images-original/github-github-logo-thumbnail-text-symbol-trademark-cat-transparent-png-842655.png"
            alt="GitHub Logo"
          />
          <button
            className="bg-orange-300 text-white p-5 rounded-full m-10"
            onClick={() => signIn(provider.id, { callbackUrl: "/" })}
          >
            Login with {provider.name}
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
