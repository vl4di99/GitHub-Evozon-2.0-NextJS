import { useRouter } from "next/router";
import { useEffect } from "react";
import { useRecoilValue } from "recoil";
import { limitAPI } from "../atoms/repository";

function redirectForMiddleware() {
  const limited = useRecoilValue(limitAPI);
  const router = useRouter();

  useEffect(() => {
    if (limited) {
      router.push(`limitReached`);
    }
  }, []);
  return null;
}

export default redirectForMiddleware;
