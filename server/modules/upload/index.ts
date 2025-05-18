import { createRouter } from "~/lib/create-app";

import * as handlers from "./upload.handler";
import * as routes from "./upload.route";

export const uploadRoute = createRouter()
  .basePath("uploads")
  .openapi(routes.uploadTempFileRoute, handlers.uploadTempFileHandler)
  .openapi(routes.finalizeUploadRoute, handlers.finalizeUploadHandler)
  .openapi(routes.deleteUploadRoute, handlers.deleteUploadHandler);
