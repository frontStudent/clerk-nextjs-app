import ImageUploader from "./components/ImageUploader";

export default async function Form() {
  return (
    <div className="px-8 py-12 sm:py-16 md:px-20">
      <h1 className="text-3xl font-bold">workspace test</h1>
      <ImageUploader />
    </div>
  );
}
