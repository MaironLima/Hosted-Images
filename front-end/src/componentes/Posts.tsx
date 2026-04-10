import { useMutation } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import api from "../services/api";
import { useStore } from "../store/store";
import { Download } from "lucide-react";
import "react-pdf/dist/Page/AnnotationLayer.css";
import "react-pdf/dist/Page/TextLayer.css";
import PdfPreview from "./PdfPreview";

type Post = {
  id: string | number;
  name?: string;
  url?: string;
  type?: string;
  created_at?: string;
};

type PageType = {
  posts: Post[];
};

function Posts() {
  const [postError, setPostError] = useState<string | null>(null);
  const { something } = useStore();

  const {
    mutate: getImages,
    data,
    isError,
  } = useMutation({
    mutationFn: async () => {
      const response = await api.get("/image/");
      return response.data;
    },
  });

  useEffect(() => {
    getImages();
  }, [something, getImages]);

  const { mutate: downloadFile, isPending: isDownloading } = useMutation({
    mutationFn: async ({
      id,
      filename,
    }: {
      id: string | number;
      filename: string;
    }) => {
      const response = await api.get(`/image/download/${id}`, {
        responseType: "blob",
      });

      const blobUrl = window.URL.createObjectURL(response.data);

      const link = document.createElement("a");
      link.href = blobUrl;
      link.download = filename;

      document.body.appendChild(link);
      link.click();

      link.remove();
      window.URL.revokeObjectURL(blobUrl);
    },
    onError: (error) => {
      setPostError("Erro ao baixar arquivo:" + error)
    },
  });

  const sortedPosts = (
    (data?.pages?.flatMap((p: PageType) => p.posts) ??
      data?.posts ??
      data ??
      []) as Post[]
  )
    .slice()
    .sort(
      (a, b) =>
        new Date(b.created_at || 0).getTime() -
        new Date(a.created_at || 0).getTime(),
    );

  if (isError) {
    setPostError("Error ao carregar as imagens");
    return;
  }

  return (
    <>
      {sortedPosts.map((post) => {
        const fileUrl = post.url || "";

        return (
          <div
            key={post.id}
            className="global-card max-w-[658px] border-[#c8cfd8] mt-9 relative pb-4"
          >
            <div
            className="-mt-2 border-b border-[#c8cfd8]">
            <h2 className="flex justify-center">{post.name}</h2>
            </div>

            <div className="flex justify-center w-full">
              {post.type?.startsWith("image/") && fileUrl ? (
                <img
                  src={fileUrl}
                  alt={post.name}
                  className="rounded-lg mb-10 mt-10 max-w-[700px] max-h-[500px] w-full h-full object-contain"
                />
              ) : post.type === "application/pdf" && fileUrl ? (
                <PdfPreview url={fileUrl} />
              ) : (
                <span className="text-red-500">
                  Arquivo não suportado ou sem URL
                </span>
              )}
            </div>

            <div className="text-x text-gray-500 text-center mt-2">
              {post.created_at
                ? new Date(post.created_at).toLocaleString()
                : "Sem data"}
                {" - "}
              {post.type}
            </div>

            {fileUrl && (
              <button
                onClick={() =>
                  downloadFile({
                    id: post.id,
                    filename: post.name || "arquivo",
                  })
                }
                disabled={isDownloading}
                className="global-icon disabled:opacity-50 absolute bottom-4 right-4"
              >
                <Download size={30} />
              </button>
            )}
            {postError && <p className="text-red-500 text-sm">{postError}</p>}
          </div>
        );
      })}
    </>
  );
}

export default Posts;
