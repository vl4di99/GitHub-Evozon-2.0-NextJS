import NextAuth from "next-auth/next";
import GithubProvider from "next-auth/providers/github";

export default (req, res) =>
  NextAuth(req, res, {
    providers: [
      GithubProvider({
        clientId: process.env.NEXT_PUBLIC_GITHUB_ID,
        clientSecret: process.env.NEXT_PUBLIC_GITHUB_SECRET,
      }),
    ],
    secret: process.env.NEXT_PUBLIC_AUTH_SECRET,
    jwt: {
      secret: process.env.NEXT_PUBLIC_JWT_SECRET,
    },
    pages: {
      signIn: "/login",
    },
    callbacks: {
      async jwt({ token, user }) {
        user && (token.user = user);
        return token;
      },
      async session({ session, token }) {
        session.name = token.name;
        session.email = token.email;
        session.picture = token.picture;
        session.username = token.username;
        session.access_token = token.accessToken;
        return session;
      },
      async redirect(url, baseUrl) {
        return "/";
      },
    },
  });
