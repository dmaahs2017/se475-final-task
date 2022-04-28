import { useSession, signIn, signOut } from "next-auth/react";
import NavBar from "../components/NavBar";

export default function Index() {
  const { data: session } = useSession();
  if (session) {
    console.log(session);
    return (
      <>
        <NavBar session={session.user!.name} />
        <br />
        <img src="/Images/welcomeFish.jpg" width={800} height={400} alt="" />
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
