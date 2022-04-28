import { useSession, signIn, signOut } from "next-auth/react";
import NavBar from "../components/NavBar";

export default function Index() {
  const { data: session } = useSession();
  if (session) {
    return (
      <>
        <NavBar session={session.user!.name} />
        <br />
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
