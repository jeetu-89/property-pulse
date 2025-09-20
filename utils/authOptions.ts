import connectDB from "@/config/db";
import User from "@/models/User";
import type { AuthOptions } from "next-auth";
import type { GoogleProfile } from "next-auth/providers/google";
import GoogleProvider from "next-auth/providers/google";

declare module "next-auth" {
  interface Session {
    user?: {
      name?: string | null;
      email?: string | null;
      image?: string | null;
      id?: string;
    };
  }
}

const googleClientId = process.env.GOOGLE_CLIENT_ID;
const googleClientSecret = process.env.GOOGLE_CLIENT_SECRET;
if (!googleClientId || !googleClientSecret) {
  throw new Error("Google credentials are not found at .env.");
}

connectDB();
const authOptions: AuthOptions = {
  providers: [
    GoogleProvider({
      clientId: googleClientId,
      clientSecret: googleClientSecret,
      authorization: {
        params: {
          prompt: "consent",
          response_type: "code",
          access_type: "offline",
        },
      },
      profile(profile: GoogleProfile) {
        return {
          id: profile.sub,
          name: profile.name,
          email: profile.email,
          image: profile.picture,
        };
      },
    }),
  ],
  callbacks: {
    async signIn({ user }) {
      const existingUser = await User.findOne({ email: user.email });
      if (!existingUser) {
        await User.create({
          email: user.email,
          username: user.name,
          image: user.image,
        });
      }
      return true;
    },
    async session({ session }) {
      const currentUser = await User.findOne({ email: session.user?.email });
      if (session.user) session.user.id = currentUser._id.toString();
      return session;
    },
  },
};

export default authOptions;
