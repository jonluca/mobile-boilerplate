import { account, session, user, verification } from "./auth-tables";

export * from "./auth-tables";

export const authSchema = {
  user,
  session,
  account,
  verification,
};
