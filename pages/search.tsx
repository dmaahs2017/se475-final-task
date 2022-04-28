import { useSession, signIn, signOut } from "next-auth/react";
import Link from "next/link";
import Box from "@mui/material/Box";
import Search from "../components/Search";
import LinkTree from "../components/LinkTree";

export default function Index() {
  const { data: session } = useSession();
  if (session) {
    return (
      <Box>
        Signed in as {session.user.email} <br />
        <p>Viewing Data from the Fish Table</p>
        <Search />
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
