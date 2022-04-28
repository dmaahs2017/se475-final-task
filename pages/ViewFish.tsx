import { useSession, signIn, signOut } from "next-auth/react";
import Box from "@mui/material/Box";
import FishView from "../components/FishView";
import NavBar from "../components/NavBar";
import DeleteInput from "../components/DeleteInput";

export default function Index() {
  const { data: session } = useSession();
  if (session) {
    return (
      <Box>
        <NavBar session={session.user!.name} />
        <br></br>
        <FishView />
        <DeleteInput />
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
