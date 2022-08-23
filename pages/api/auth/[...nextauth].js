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
      jwt: async ({ token, user, account }) => {
        user && (token.user = user);
        user && (token.accessToken = account.access_token);
        return token;
      },
      session: async ({ session, token }) => {
        session.accessToken = token.accessToken;
        session.name = token.name;
        session.email = token.email;
        session.picture = token.picture;
        session.userId = token.sub;
        return session;
      },
    },
  });
