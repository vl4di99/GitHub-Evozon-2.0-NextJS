import { useSession } from "next-auth/react";

function checkHeaders() {
  const { data: session } = useSession();
  let returnedHeader = undefined;
  if (session) {
    returnedHeader = { Authorization: `Bearer ${session.accessToken}` };
  } else {
    returnedHeader = { "Content-Type": "application/x-www-form-urlencoded" };
  }
  return returnedHeader;
}

export default checkHeaders;
