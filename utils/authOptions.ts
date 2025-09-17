import GoogleProvider from "next-auth/providers/google";
import type { AuthOptions } from "next-auth";

const clientId = process.env.GOOGLE_CLIENT_ID;
const clientSecret = process.env.GOOGLE_CLIENT_SECRET;
if (!clientId || !clientSecret) {
  throw new Error(
    "Add GOOGLE_CLIENT_ID and GOOGLE_CLIENT_SECRET at .env file."
  );
}
export const authOptions: AuthOptions = {
  providers: [
    GoogleProvider({
      clientId,
      clientSecret,
      authorization: {
        params: {
          prompt: "consent",
          access_type: "offline",
          response_type: "code",
        },
      },
    }),
  ],
  callbacks: {
    async signIn({ profile }) {
      return true;
    },
    // async session({session}){

    // }
  },
};
