'use client';


import Image from "next/image";
import "./style.css"
import { useRouter } from "next/navigation";

export default function Home() {
const router = useRouter()

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
     <h1 className="heading text-2xl bg-amber-400 text-center border border-amber-950 p-7">muthu</h1>




     <button className="bg-amber-400 text-2xl font-medium text-shadow-2xs border border-amber-100 py-6 px-2" onClick={() => router.push("/about")}>about</button>
    </div>
  );
}
