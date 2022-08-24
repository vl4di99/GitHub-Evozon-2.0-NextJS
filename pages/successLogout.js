import { Box, Typography } from "@mui/material";
import Image from "next/image";
import { useRouter } from "next/router";

import { useEffect, useState } from "react";

import uturnSign from "../images/uturn.png";

function SuccessLogout() {
  const [seconds, setSeconds] = useState(3);
  const router = useRouter();

  useEffect(() => {
    setInterval(function () {
      setSeconds(seconds - 1);
    }, 1000);
    if (seconds === 0) {
      clearInterval();
      router.push("/");
    }
  }, [seconds]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <Box className="flex flex-col items-center justify-center w-1/2 h-1/2 shadow-2xl">
        <Box className="w-2/6 h-2/6">
          <Image src={uturnSign} alt="Redirect img" objectFit="cover" />
        </Box>
        <Typography variant="h5" className="m-3">
          You have successfully logged out and will be redirected in {seconds}{" "}
          seconds
        </Typography>
        <Box className="flex self-end bg-gradient-to-r from-rose-900 to-red-400 h-2/6 w-full">
          &nbsp;
        </Box>
      </Box>
    </div>
  );
}

export default SuccessLogout;
