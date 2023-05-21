/** app/api/uploadthing/core.ts */
import { createUploadthing, type FileRouter } from "uploadthing/next";
const f = createUploadthing();

const auth = (req: Request) => ({ id: "fakeId" }); // Fake auth function

// FileRouterはニーズに合わせてエンドポイントを複数作成することができます。
export const ourFileRouter = {
  // FileRouterはニーズに合わせて複数作成することができます。
  imageUploader: f
    // アップロードするファイルタイプを指定します。
    .fileTypes(["image", "video"])
    // アップロードするファイルの最大サイズを指定します。
    .maxSize("1GB")
    // ユーザー認証を行います。
    .middleware(async (req) => {
      // アップロードが行われる前にサーバサイドで実行されます。
      const user = await auth(req);

      // 例えば認証に失敗した場合は、エラーを投げます。アップロードは実行されません。
      if (!user) throw new Error("Unauthorized");

      // ここで返却される値は、onUploadCompleteのコールバックで`metadata`の変数で取得が可能です。
      return { userId: user.id };
    })
    .onUploadComplete(async ({ metadata, file }) => {
      // アップロードが完了したときに実行されるコールバック関数です。
      console.log("Upload complete for userId:", metadata.userId);

      console.log("file url", file.url);
    }),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;
