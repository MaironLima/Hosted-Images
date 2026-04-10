import { useState } from "react";
import { Document, Page, pdfjs } from "react-pdf";

pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;

type PdfPreviewProps = {
  url: string;
};

function PdfPreview({ url }: PdfPreviewProps) {
  const [numPages, setNumPages] = useState(0);

  return (
    <div className="w-full flex justify-center mt-6 mb-6">
      <div className="w-full max-w-[700px] h-[500px] overflow-y-auto rounded-lg p-4 bg-white">
        <Document
          file={url}
          onLoadSuccess={({ numPages }) => setNumPages(numPages)}
          loading={<p>Carregando PDF...</p>}
          error={<p>Erro ao carregar PDF.</p>}
        >
          {Array.from({ length: numPages }, (_, index) => (
            <Page
              key={index}
              pageNumber={index + 1}
              className="mb-4 width-[650px]"
            />
          ))}
        </Document>
      </div>
    </div>
  );
}

export default PdfPreview