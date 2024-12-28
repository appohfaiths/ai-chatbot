import {Button} from "@/components/ui/button";
import Link from "next/link";

export default function Home() {

  return (
    <div className="font-[family-name:var(--font-geist-sans)]">
      <main className="">
        <Link href={`/chat`}>
            <Button>Start a chat</Button>
        </Link>
      </main>

    </div>
  );
}
