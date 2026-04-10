import 'cloudinary';

declare module 'cloudinary' {
  namespace v2 {
    interface UploadApiErrorResponse {
      message: string;
      name: string;
      http_code?: number;
    }
    interface UploadApiResponse {
      secure_url: string;
      // add other fields as needed
    }
    namespace uploader {
      function upload_stream(
        options: { resource_type: string },
        callback: (
          error: UploadApiErrorResponse | undefined,
          result: UploadApiResponse | undefined
        ) => void
      ): NodeJS.WritableStream;
    }
  }
}
