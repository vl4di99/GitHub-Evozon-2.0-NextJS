import { getSession, signOut, useSession } from "next-auth/react";
import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";

export default function Home() {
  const { data: session, status } = useSession();

  return (
    <div>
      <div className="bg-slate-400" onClick={signOut}>
        Tailwind Init
      </div>
      <div>Welcome {session?.user?.name}</div>
    </div>
  );
}

export async function getServerSideProps(context) {
  const session = await getSession(context);

  return {
    props: {
      session,
    },
  };
}
