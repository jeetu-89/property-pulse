import GoogleProvider from "next-auth/providers/google";
import type { AuthOptions } from "next-auth";
import connectDB from "@/config/db";
import User, { UserType } from "@/models/User";

const clientId = process.env.GOOGLE_CLIENT_ID;
const clientSecret = process.env.GOOGLE_CLIENT_SECRET;
if (!clientId || !clientSecret) {
  throw new Error(
    "Add GOOGLE_CLIENT_ID and GOOGLE_CLIENT_SECRET at .env file."
  );
}

// Extend the Session type to include 'id' on user
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
      await connectDB();
      const existingUser = await User.findOne({ email: profile?.email });
      if (!existingUser) {
        // Truncate Username if toolong
        const username = await profile?.name?.slice(0, 20);
        await User.create({
          email: profile?.email,
          username: profile?.name,
          image: profile?.image,
        });
      }
      return true;
    },
    async session({ session }) {
      const user = await User.findOne<UserType>({ email: session.user?.email });
      if (session.user && user?._id) {
        session.user.id = user._id.toString();
      }
      return session;
    },
  },
};
