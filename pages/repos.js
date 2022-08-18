import Container from "@mui/material/Container";
import TextField from "@mui/material/TextField";
import { useState } from "react";
import { ReposList } from "../components/ReposList";

export default function Repos() {
  const [filterBy, setFilterBy] = useState("");

  const handleChange = (event) => {
    setFilterBy(event.target.value);
  };

  return (
    <Container sx={{ minHeight: "100vh" }}>
      <Container sx={{ minHeight: "100vh" }}>
        <h1 className="text-4xl pt-8 pb-4">LuciaAvanu's repos</h1>
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
