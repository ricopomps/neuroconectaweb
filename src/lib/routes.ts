export enum AppRoutes {
  HOME = "/",
  LOGIN = "/login",
  SIGNUP = "/signup",
  INSTITUTIONS_CREATE = "/institutions/create",
  INSTITUTION = "/institutions/:institutionId",
}

export const buildRoute = (
  route: AppRoutes,
  params: Record<string, string | number>,
) => {
  return Object.keys(params).reduce(
    (path, param) => path.replace(`:${param}`, String(params[param])),
    route,
  );
};
