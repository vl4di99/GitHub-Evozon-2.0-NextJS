import { Typography } from "@mui/material";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { axiosHeaders } from "../atoms/repository";

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
      <Typography variant="h2">
        Hi,{session?.name}! <br /> You have successfully logged in and will be
        redirected in {seconds} seconds
      </Typography>
    </div>
  );
}

export default SuccessLogin;
