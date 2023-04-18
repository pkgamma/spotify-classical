import NextAuth from "next-auth";
import SpotifyProvider from "next-auth/providers/spotify";
import refreshAccessToken from "@/lib/spotify";

const scope =
  "user-read-recently-played user-read-playback-state user-top-read user-modify-playback-state user-read-currently-playing user-follow-read playlist-read-private user-read-email user-read-private user-library-read playlist-read-collaborative";

export default NextAuth({
  providers: [
    SpotifyProvider({
      clientId: process.env.SPOTIFY_CLIENT_ID as string,
      clientSecret: process.env.SPOTIFY_CLIENT_SECRET as string,
      authorization: {
        params: { scope },
      },
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: "/login",
  },

  callbacks: {
    async jwt({ token, account }) {
      if (account) {
        token.id = account.id;
        token.expires_at = account.expires_at;
        token.accessToken = account.access_token;
        token.refreshToken = account.refresh_token;
      }
      if (Date.now() > token.expires_at * 1000) {
        token = await refreshAccessToken(token);
      }
      return token;
    },
    async session({ session, token }) {
      session.user = token;
      return session;
    },
  },

  // OLD VERSION from youtube =====
  // callbacks: {
  //   async jwt({ token, account, user }) {
  //     // first step: get the access token and refresh token from spotify
  //     if (account && user) {
  //       return {
  //         ...token,
  //         accessToken: account.accessToken,
  //         refreshToken: account.refreshToken,
  //         username: user.id,
  //         accessTokenExpires: account?.expires_at
  //           ? account.expires_at * 1000
  //           : null,
  //       };
  //     }

  //     // second step: check if the access token has expired
  //     // if it hasn't, return the token
  //     if (Date.now() < (token.accessTokenExpires as number)) {
  //       return token;
  //     } else {
  //       return await refreshAccessToken(token);
  //     }
  //   },

  //   async session({ session, token }) {
  //     return {
  //       ...session,
  //       user: {
  //         ...session.user,
  //         id: token.username,
  //         accessToken: token.accessToken,
  //         refreshToken: token.refreshToken,
  //         username: token.username,
  //       },
  //     };
  //   },
  // },
});
