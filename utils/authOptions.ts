import type { AuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";

const gClientId = process.env.GOOGLE_CLIENT_ID;
const gClientSecret = process.env.GOOGLE_CLIENT_SECRET;

if (!gClientId || !gClientSecret) {
  throw new Error("Failed to access google credentials from .env file.");
}

const authOptions: AuthOptions = {
  providers: [
    GoogleProvider({
      clientId: gClientId,
      clientSecret: gClientSecret,
      authorization: {
        params: {
          prompt: "consent",
          response_type: "code",
          access_type: "offline",
        },
      },
    }),
  ],
};

export default authOptions;