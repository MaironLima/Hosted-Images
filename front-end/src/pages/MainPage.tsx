import { useRef, useState } from "react";
import { ImageUp, Loader2, X } from "lucide-react";
import { useMutation } from "@tanstack/react-query";
import api from "../services/api";
import { useStore } from "../store/store";
import Posts from "../componentes/Posts";

type ImageInfo = {
  name: string;
  url: string;
  type: string;
  size: number;
};

function MainPage() {
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [imageInfo, setImageInfo] = useState<ImageInfo | null>(null);
  const [postError, setPostError] = useState<string | null>(null);
  const [file, setFile] = useState<File | null>(null);

  const { somethingChanger } = useStore();

  const { mutateAsync: uploadAndSave, isPending: isUploadPending } = useMutation({
    mutationFn: async (file: File) => {
      const formData = new FormData();
      formData.append("file", file);

      const response = await api.post("/image/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      return response.data;
    },
    onSuccess: () => {
      somethingChanger();
      setPostError(null);
      handleRemoveImage();
    },
    onError: () => {
      setPostError("Erro ao enviar arquivo. Tente novamente.");
    },
  });

  function handleClick() {
    fileInputRef.current?.click();
  }

  function handleRemoveImage() {
    setPreview(null);
    setImageInfo(null);
    setPostError(null);
    setFile(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  }

  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const maxSize = 5 * 1024 * 1024;
    const tempFile = e.target.files?.[0];

    if (!tempFile) return;
    setFile(tempFile);

    if (
      tempFile.type !== "image/png" &&
      tempFile.type !== "image/jpeg" &&
      tempFile.type !== "application/pdf"
    ) {
      alert("Apenas PNG, JPEG e PDF são aceitos");
      return;
    }

    if (tempFile.size > maxSize) {
      alert("Tamanho máximo: 5MB");
      return;
    }

    const sizeMB = parseFloat((tempFile.size / (1024 * 1024)).toFixed(5));
    const localPreview = URL.createObjectURL(tempFile);

    setPreview(localPreview);
    setPostError(null);
    setImageInfo({
      name: tempFile.name,
      url: localPreview,
      type: tempFile.type,
      size: sizeMB,
    });
  }

  async function onSubmitF(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (!file) {
      setPostError("Anexe uma imagem ou PDF antes de postar.");
      return;
    }

    if (isUploadPending) {
      setPostError("Aguarde o envio terminar antes de postar.");
      return;
    }

    try {
      await uploadAndSave(file);
    } catch (error) {
      setPostError(
        error instanceof Error ? error.message : "Erro ao postar arquivo.",
      );
    }
  }

  return (
    <div className="w-full max-w-[700px] mx-auto px-4 mb-10">
      <form
        onSubmit={onSubmitF}
        className="global-card border-[#c8cfd8] w-auto max-w-full"
      >
        <div className="w-full h-px my-1" />

        {preview && (
          <div className="relative flex h-[500px] items-center justify-center rounded-md border border-[#c8cfd8] bg-gray-100">
            {imageInfo?.type === "application/pdf" ? (
              <embed
                src={preview}
                type="application/pdf"
                className="max-w-full max-h-[500px] rounded-md w-auto h-auto"
              />
            ) : (
              <img
                src={preview}
                alt="preview"
                className="max-w-full max-h-[500px] rounded-md border-[#c8cfd8] w-auto h-auto"
              />
            )}
            {!isUploadPending && (
              <button
                type="button"
                onClick={handleRemoveImage}
                className="absolute top-2 right-2 flex global-x-btn"
              >
                <X size={30} />
              </button>
            )}
          </div>
        )}

        <div className="flex items-center justify-between mt-5">
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={handleClick}
              disabled={isUploadPending}
              className="global-icon disabled:opacity-50"
            >
              {isUploadPending ? (
                <Loader2 size={30} className="animate-spin" />
              ) : (
                <ImageUp size={30} />
              )}
            </button>
          </div>

          <input
            ref={fileInputRef}
            type="file"
            accept="image/png, image/jpeg, application/pdf"
            className="hidden"
            onChange={handleFileChange}
          />

          {postError && <p className="text-red-500 text-sm">{postError}</p>}

          <button
            type="submit"
            disabled={isUploadPending}
            className="global-btn px-6 py-2 disabled:opacity-50"
          >
            {isUploadPending ? "Enviando..." : "Postar"}
          </button>
        </div>
      </form>
      <Posts />
    </div>
  );
}

export default MainPage;
