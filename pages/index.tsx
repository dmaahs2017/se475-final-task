import { useSession, signIn, signOut } from "next-auth/react";
import Link from "next/link";
import LinkTree from "../components/LinkTree";

export default function Index() {
  const { data: session } = useSession();
  if (session) {
    console.log(session);
    return (
      <>
        Signed in as {session.user.email} <br />
        <LinkTree />
        <br />
        <button onClick={() => signOut()}>Sign out</button>
      </>
    );
  }
  return (
    <>
      Not signed in <br />
      <button onClick={() => signIn()}>Sign in</button>
    </>
  );
}
