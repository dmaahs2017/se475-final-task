import { useSession, signIn, signOut } from "next-auth/react";
import Box from "@mui/material/Box";
import FishForm from "../components/FishForm";
import NavBar from "../components/NavBar";

export default function Index() {
  const { data: session } = useSession();
  if (session) {
    return (
      <Box>
        <NavBar />
        <br></br>
        <FishForm />
      </Box>
    );
  }

  return (
    <>
      Not signed in <br />
      <button onClick={() => signIn()}>Sign in</button>
    </>
  );
}
