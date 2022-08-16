import { useRouter } from "next/router";
import { useRecoilValue } from "recoil";
import { gitUser, repoName } from "../atoms/repository";

function pushTry() {
  const user = useRecoilValue(gitUser);
  const repo = useRecoilValue(repoName);
  const router = useRouter();
  const enter = () => {
    router.push(`/${user}/${repo}`);
  };
  return <div onClick={enter}>This is a div. Click me</div>;
}

export default pushTry;
