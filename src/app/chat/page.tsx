"use client"

import { useState } from "react";
import {Loader2, ScanSearch, ImageIcon} from "lucide-react";
import {Button, buttonVariants} from "@/components/ui/button";
import {Input} from "@/components/ui/input";
import Image from "next/image"
import {cn} from "@/lib/utils"
import Link from "next/link";
import axios from "axios";

export default function ChatPage() {
    const [imageUrl, setImageUrl] = useState("");
    const [imageLabels, setImageLabels] = useState(undefined);
    const [loading, setLoading] = useState(false);

    async function uploadFiles(e: any) {
        e.preventDefault();
        const formData = new FormData(e.target);
        setLoading(true);
        // const response = await fetch("/api/image-uploads", {
        //     method: "POST",
        //     body: formData,
        // });
        const response = await axios.post("/api/image-uploads", formData);
        setLoading(false);
        // const result = await response.json();
        // console.log(result);
        // setImageUrl(result.url);
        // setImageLabels(result.labels);
        console.log(response.data)
        setImageUrl(response.data.url);
        setImageLabels(response.data.labels);
    }

    return (
        <div>
            Chat Page
            <form onSubmit={uploadFiles}>
                <ImageIcon />
                <Input name={`files`} type="file" />
                <Button>
                    { loading ? <Loader2 className={`animate-spin`}/> : <ScanSearch size={20} />}
                </Button>
            </form>
            {imageUrl && (
                <>
                    <Image
                        src={imageUrl}
                        width={400}
                        height={400}
                        alt={"uploaded image"}
                    ></Image>
                    <Link
                        href={imageUrl}
                        className={cn(
                            buttonVariants({ variant: "ghost" }),
                            "text-xs text-muted-foreground"
                        )}
                    ></Link>
                </>
            )}
            {imageLabels && Object.entries(imageLabels).map(([key, value]) => (
                <div key={key}>
                    <p className="font-bold text-l">Detected {key}: {value}</p>
                </div>
            ))}
        </div>
    )
}