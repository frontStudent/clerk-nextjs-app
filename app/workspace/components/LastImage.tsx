import { list } from "@vercel/blob";
import Image from "next/image";

async function allImages() {
  const images = await list();
  const len = images.blobs.length;
  return images.blobs[len - 1];
}

export default async function Form() {
  const images = await allImages();
  return (
      <Image
        priority
        key={images.pathname}
        src={images.url}
        alt="Image"
        width={200}
        height={200}
      />
  );
}
