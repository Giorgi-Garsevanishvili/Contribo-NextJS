import NextAuth from "next-auth";
import { AdapterUser } from "next-auth/adapters";
import GithubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
import SlackProvider from "next-auth/providers/slack";
import { PrismaClient } from "./generated/prisma";
import type { User } from "next-auth";
const prisma = new PrismaClient();

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    GithubProvider({
      clientId: process.env.AUTH_GITHUB_ID!,
      clientSecret: process.env.AUTH_GITHUB_SECRET!,
      profile(profile: any) {
        // 'profile' contains all data returned by GitHub API
        return {
          id: profile.id,
          name: profile.name ?? profile.login,
          email: profile.email,
          image: profile.avatar_url,
          username: profile.login,
          bio: profile.bio,
          location: profile.location,
          // add any other fields you want
          rawProfile: profile, // store the full profile if needed
        };
      },
    }),
    GoogleProvider({
      clientId: process.env.AUTH_GOOGLE_ID!,
      clientSecret: process.env.AUTH_GOOGLE_SECRET!,
      profile(profile) {
        return {
          id: profile.sub,
          name: profile.name,
          email: profile.email,
          image: profile.picture,
          locale: profile.locale,
          rawProfile: profile,
        };
      },
    }),
    SlackProvider({
      clientId: process.env.AUTH_SLACK_ID!,
      clientSecret: process.env.AUTH_SLACK_SECRET!,
      profile(profile) {
        return {
          id: profile.id,
          name: profile.real_name,
          email: profile.email,
          image: profile.image_512,
          team: profile.team,
          rawProfile: profile,
        };
      },
    }),
  ],
  callbacks: {
    async signIn({ user }: { user: User | AdapterUser }) {
      const email = user.email ?? undefined;

      if (!email) {
        console.error("Missing email");
        return false;
      }

      try {
        const dbuser = await prisma.user.findUnique({
          where: { email },
        });

        if (!dbuser) {
          await prisma.user.create({
            data: {
              email,
              name: user.name,
            },
          });
        }

        user.role = dbuser?.role;

        return true;
      } catch (error) {
        console.error("Error in signIn callback:", error);
        return false;
      }
    },

    async jwt({ token, user }) {
      // Merge user profile into JWT token
      if (user) {
        token.role = user.role;
      }
      return token;
    },
    async session({ session, token }) {
      // Add user data to session
      if (session?.user) session.user.role = token.role as string;
      return session;
    },
  },
});
