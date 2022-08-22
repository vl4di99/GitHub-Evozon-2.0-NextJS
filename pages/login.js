import { signIn, getProviders } from "next-auth/react";

import Image from "next/image";

import { Button } from "@mui/material";
import LoginIcon from "@mui/icons-material/Login";

import githubBlackCat from "../images/github-blackcat.png";
import blackboard from "../images/blackboard-background.jpg";

function Login({ providers }) {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen w-full">
      {Object.values(providers).map((provider) => (
        <div
          key={provider.name}
          className="flex flex-col items-center justify-center"
        >
          <Image
            src={blackboard}
            alt="github background"
            layout="fill"
            objectFit="cover"
            objectPosition="center"
            className="z-0"
          />
          <div className="bg-white/80 z-0 rounded-lg h-fit w-[500px] flex flex-col items-center p-10 ">
            <Image
              src={githubBlackCat}
              alt="github logo"
              objectPosition="center"
              className="z-0 mt-10 "
              width={"200px"}
              height={"200px"}
            />

            <Button
              variant="contained"
              endIcon={<LoginIcon />}
              className="bg-gradient-to-b from-fuchsia-900 to-purple-900 text-lg m-2 p-4 mt-5 opacity-100"
              onClick={() => signIn(provider.id, { callbackUrl: "/" })}
            >
              Login with {provider.name}
            </Button>
          </div>
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
