import { useRouter } from "next/router";
import { useEffect } from "react";

function redirectForMiddleware() {
  const router = useRouter();

  useEffect(() => {
    router.push(`limitReached`);
  }, []);
  return null;
}

export default redirectForMiddleware;
