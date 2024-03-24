"use client";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  const navigate = (page) => {
    router.push(page);
  };
  return (
    <main className="">
      <h1>Use Router</h1>
      <button onClick={() => navigate('about')}>Go to about page</button>
      <br />
      <button onClick={() => navigate('contact')}>Go to contact page</button>
    </main>
  );
}
