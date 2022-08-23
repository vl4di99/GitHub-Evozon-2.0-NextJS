import { Typography } from "@mui/material";
import { useRouter } from "next/router";

import { useEffect, useState } from "react";

function successLogout() {
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
      <Typography variant="h2">
        You have successfully logged out and will be redirected in {seconds}{" "}
        seconds
      </Typography>
    </div>
  );
}

export default successLogout;
