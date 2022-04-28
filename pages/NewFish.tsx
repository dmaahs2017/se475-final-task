import { useSession, signIn, signOut } from "next-auth/react";
import Link from "next/link";
import Box from "@mui/material/Box";
import FishForm from "../components/FishForm";
import LinkTree from "../components/LinkTree";

export default function Index() {
  const { data: session } = useSession();
  if (session) {
    const name: string = session.user!.name!;
    console.log(name);
    return (
      <Box>
        Signed in as {session.user!.email} <br />
        <p>Insert data for a new fish</p>
        <FishForm user={name} />
        <LinkTree />
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
