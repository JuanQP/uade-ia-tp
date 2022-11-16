declare global {
  namespace NodeJS {
    interface ProcessEnv {
      NODE_ENV?: string;
      DATABASE_URL?: string;
      CMS_DEV_ADMIN_USER?: string;
      CMS_DEV_ADMIN_PASSWORD?: string;
      USE_SSO?: string;
      SSO_AUTH_BASEURL?: string;
      SSO_JWT_PUBLIC_KEY?: string;
    }
  }
  namespace Express {
    interface Request {
      decryptedUser?: jwt.JwtPayload;
    }
  }
}


// If this file has no import/export statements (i.e. is a script)
// convert it into a module by adding an empty export statement.
export { };
