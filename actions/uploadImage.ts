import { uploadFile } from "@uploadcare/upload-client";
export const uploadImage = async (fileData: File) => {
  const result = await uploadFile(fileData, {
    publicKey: process.env.NEXT_PUBLIC_UPLOADCARE_PUBLIC_KEY!,
    store: "auto",
  });
  return result;
};
