import { authMiddleware } from "@clerk/nextjs";

export default authMiddleware({
  publicRoutes: ["/","/templates", "/workspace"],
});

export const config = {
  matcher: ["/((?!.*\\..*|_next).*)", "/"],
};
