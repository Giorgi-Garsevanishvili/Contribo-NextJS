import GitHubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
import SlackProvider from "next-auth/providers/slack";

export const options = {
  providers: [
    GitHubProvider({
      profile(profile) {
        let userRole = "GitHub User";
        if (profile?.email == "george.garsevanidi@gmail.com") {
          userRole = "admin";
        }
        console.log("Profile GitHub", profile, userRole);

        return {
          ...profile,
          role: userRole,
        };
      },
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
    }),
    GoogleProvider({
      profile(profile) {
        console.log("Profile Google", profile);

        let userRole = "Google User";
        return {
          ...profile,
          id: profile.sub,
          role: userRole,
        };
      },
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_SECRET,
    }),
    SlackProvider({
      profile(profile) {
        console.log("Profile Slack", profile);

        let userRole = "Slack User";
        return {
          ...profile,
          id: profile.sub,
          role: userRole,
        };
      },
      clientId: process.env.SLACK_ID,
      clientSecret: process.env.SLACK_SECRET,
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) token.role = user.role;
      return token;
    },
    async session({ session, token }) {
      if (session?.user) session.user.role = token.role;
      return session;
    },
  },
};
