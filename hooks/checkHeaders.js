import { useSession } from "next-auth/react";
import { useRecoilState } from "recoil";
import { axiosHeaders } from "../atoms/repository";

function checkHeaders() {
  const { data: session } = useSession();
  const [headersAx, setHeadersAx] = useRecoilState(axiosHeaders);
  let returnedHeader = undefined;
  if (session) {
    returnedHeader = { Authorization: `Bearer ${session.accessToken}` };
  } else {
    returnedHeader = { "Content-Type": "application/x-www-form-urlencoded" };
  }
  setHeadersAx(returnedHeader);
  return returnedHeader;
}

export default checkHeaders;
