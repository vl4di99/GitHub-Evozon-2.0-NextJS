import { getSession, signOut, useSession } from "next-auth/react";
import Head from "next/head";
import Image from "next/image";
import { useRouter } from "next/router";
import { useRecoilState } from "recoil";
import { limitAPI } from "../atoms/repository";
import LandingPage from "../components/landing-page/LandingPage";
import styles from "../styles/Home.module.css";

export default function Home() {
  return <LandingPage />;
}
