import { useSession, signIn, signOut } from "next-auth/react";
import Box from "@mui/material/Box";
import FishView from "../components/FishView";
import NavBar from "../components/NavBar";

export default function Index() {
  const { data: session } = useSession();
  if (session) {
    return (
      <Box>
        <NavBar />
        <br></br>
        <FishView />
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
