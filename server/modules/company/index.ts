import { createRouter } from "~/lib/create-app";

import * as handlers from "./company.handler";
import * as routes from "./company.route";

export const companyRoute = createRouter()
  .basePath("/companies")
  .openapi(routes.getUserCompaniesRoute, handlers.getUserCompaniesHandler)
  .openapi(routes.createCompanyRoute, handlers.createCompanyHandler)
  .openapi(routes.updateCompanyRoute, handlers.updateCompanyHandler)
  .openapi(routes.deleteCompanyRoute, handlers.deleteCompanyHandler)
  .openapi(
    routes.getUserActiveCompanyRoute,
    handlers.getUserActiveCompanyHandler
  )
  .openapi(routes.setActiveCompanyRoute, handlers.setActiveCompanyHandler);
