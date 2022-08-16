import { blue, blueGrey } from "@mui/material/colors";
import Container from "@mui/material/Container";
import { ReposList } from "./components/ReposList";

export default function Repos() {
  return (
    <Container sx={{ minHeight: "100vh" }}>
      <Container sx={{ minHeight: "100vh" }}>
        <h1 className="text-4xl pt-8 pb-4">LuciaAvanu's repos</h1>
        <hr className="border-2 border-blue-500 rounded-md"></hr>
        <ReposList />
      </Container>
    </Container>
  );
}
