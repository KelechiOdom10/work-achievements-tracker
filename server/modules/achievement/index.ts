import { createRouter } from "~/lib/create-app";

import * as handlers from "./achievement.handler";
import * as routes from "./achievement.route";

export const achievementRoute = createRouter()
  .basePath("/achievements")
  .openapi(routes.getUserAchievementsRoute, handlers.getUserAchievementsHandler)
  .openapi(routes.createAchievementRoute, handlers.createAchievementHandler)
  .openapi(routes.updateAchievementRoute, handlers.updateAchievementHandler)
  .openapi(routes.deleteAchievementRoute, handlers.deleteAchievementHandler);
