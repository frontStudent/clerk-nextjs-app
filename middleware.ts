import { authMiddleware } from "@clerk/nextjs";

export default authMiddleware({
  publicRoutes: ["/","/templates"],
});

export const config = {
  matcher: ["/((?!.*\\..*|_next).*)", "/"],
};
