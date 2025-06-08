import { Router } from "express";
import { UserRoutes } from "../modules/user/user.route";
import { ServiceRoutes } from "../modules/service/service.route";
import { ReviewRoutes } from "../modules/review/review.route";
import { BatchRoutes } from "../modules/batch/batch.route";
import { StudentRoutes } from "../modules/student/student.route";


const router = Router();

const moduleRoutes = [
  {
    path: "/auth",
    route: UserRoutes,
  },
  {
    path: "/services",
    route: ServiceRoutes,
  },
  {
    path: "/student",
    route: StudentRoutes,
  },

  {
    path: "/review",
    route: ReviewRoutes,
  },

  {
    path: "/batch",
    route: BatchRoutes,
  },
 

  
 
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));
export default router;
