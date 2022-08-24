import { Avatar, Box, Typography } from "@mui/material";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { axiosHeaders } from "../atoms/repository";
import straightRightArrow from "../images/straight-right-arrow.png";

function SuccessLogin() {
  const [seconds, setSeconds] = useState(3);
  const { data: session } = useSession();
  const router = useRouter();
  const [, setHeader] = useRecoilState(axiosHeaders);
  //setHeader({ Authorization: `Bearer ${session?.accessToken}` });
  //console.log(header);

  useEffect(() => {
    setInterval(function () {
      setSeconds(seconds - 1);
    }, 1000);
    if (seconds === 0) {
      clearInterval();
      setHeader({ Authorization: `Bearer ${session?.accessToken}` });
      router.push("/");
    }
  }, [seconds]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <Box className="flex flex-col items-center justify-center w-1/2 h-1/2 shadow-2xl">
        <Box className="w-2/6 h-2/6">
          <Image
            src={straightRightArrow}
            alt="Redirect img"
            objectFit="cover"
          />
        </Box>
        <Typography variant="h3" className="m-10">
          Hi,{session?.name}!
        </Typography>
        <Typography variant="h5" className="m-3">
          You have successfully logged in and will be redirected in {seconds}{" "}
          seconds
        </Typography>
        <Box className="flex self-end bg-gradient-to-r from-cyan-300 to-sky-700 h-2/6 w-full">
          &nbsp;
        </Box>
      </Box>
    </div>
  );
}

export default SuccessLogin;
