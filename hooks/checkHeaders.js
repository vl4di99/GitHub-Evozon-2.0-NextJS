import { useRecoilState } from "recoil";
import { axiosHeaders } from "../atoms/repository";

function checkHeaders(sess) {
  const [, setHeadersAx] = useRecoilState(axiosHeaders);
  let returnedHeader = undefined;
  if (sess) {
    returnedHeader = { Authorization: `Bearer ${session.accessToken}` };
  } else {
    returnedHeader = { "Content-Type": "application/x-www-form-urlencoded" };
  }
  setHeadersAx(returnedHeader);
  return returnedHeader;
}

export default checkHeaders;
