import { uploadFile } from "@uploadcare/upload-client";
import {
  deleteFile,
  UploadcareSimpleAuthSchema,
} from "@uploadcare/rest-client";
export const uploadImage = async (fileData: File) => {
  const result = await uploadFile(fileData, {
    publicKey: process.env.NEXT_PUBLIC_UPLOADCARE_PUBLIC_KEY!,
    store: "auto",
  });
  return result;
};

export const deleteUploadcare = async (uuid: string) => {
  const uploadcareSimpleAuthSchema = new UploadcareSimpleAuthSchema({
    publicKey: process.env.NEXT_PUBLIC_UPLOADCARE_PUBLIC_KEY!,
    secretKey: process.env.NEXT_PUBLIC_UPLOADCARE_SECRET_KEY!,
  });

  const result = await deleteFile(
    {
      uuid: uuid,
    },
    { authSchema: uploadcareSimpleAuthSchema },
  );

  return result;
};
