import { put } from "@vercel/blob";
import { revalidatePath } from "next/cache";
import { Input } from "@/components/ui/input";

async function uploadImage(formData: FormData) {
  "use server";
  const imageFile = formData.get("image") as File;
  const blob = await put(imageFile.name, imageFile, {
    access: "public",
  });
  revalidatePath("/");
  return blob;
}

export default function Form() {
  return (
    <form action={uploadImage}>
      <label htmlFor="image">Image</label>
      <Input type="file" id="image" name="image" required />
      <button>Upload</button>
    </form>
  );
}
