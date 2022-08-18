import Container from "@mui/material/Container";
import TextField from "@mui/material/TextField";
import { useRouter } from "next/router";
import { useState } from "react";
import { useRecoilState } from "recoil";
import { gitUser } from "../../atoms/repository";
import { ReposList } from "../../components/ReposList";

function Repos({ url }) {
  const [filterBy, setFilterBy] = useState("");
  const [userURL, setUserURL] = useRecoilState(gitUser);
  setUserURL(url);

  const handleChange = (event) => {
    setFilterBy(event.target.value);
  };

  return (
    <Container sx={{ minHeight: "100vh" }}>
      <Container sx={{ minHeight: "100vh" }}>
        <h1 className="text-4xl pt-8 pb-4">{url}'s repos</h1>
        <hr className="border-2 border-blue-500 rounded-md"></hr>
        <TextField
          id="demo-helper-text-misaligned-no-helper"
          label="Filter through the repos"
          className="my-4 w-full lg:w-3/6"
          name="message"
          onChange={handleChange}
        />
        <ReposList filterBy={filterBy} />
      </Container>
    </Container>
  );
}

export default Repos;

export async function getServerSideProps(context) {
  let url = context.params.username;

  return {
    props: {
      url: url,
    },
  };
}