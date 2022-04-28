import { useSession, signIn, signOut } from "next-auth/react";
import Box from "@mui/material/Box";
import FishForm from "../components/FishForm";
import NavBar from "../components/NavBar";

export default function Index() {
  const { data: session } = useSession();
  if (session) {
    const name: string = session.user!.name!;
    console.log(name);
    return (
      <Box>
        <NavBar session={session.user!.name} />
        <br></br>
        <FishForm user={name} />
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
