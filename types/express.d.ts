import { JwtPayload } from "jsonwebtoken";

declare module 'express-serve-static-core' {
  interface Request {
    user?: JwtPayload; // or define your custom user type
  }
}
