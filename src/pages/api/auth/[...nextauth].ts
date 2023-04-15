import NextAuth from "next-auth";
import SpotifyProvider from "next-auth/providers/spotify";
import SpotifyWebApi from "spotify-web-api-node";

const scope =
  "user-read-recently-played user-read-playback-state user-top-read user-modify-playback-state user-read-currently-playing user-follow-read playlist-read-private user-read-email user-read-private user-library-read playlist-read-collaborative";

const SpotifyApi = new SpotifyWebApi({
  clientId: process.env.SPOTIFY_CLIENT_ID,
  clientSecret: process.env.SPOTIFY_CLIENT_SECRET,
});

async function refreshAccessToken(token) {
  try {
    SpotifyApi.setAccessToken(token.accessToken);
    SpotifyApi.setRefreshToken(token.refreshToken);
    const { body: refreshToken } = await SpotifyApi.refreshAccessToken();
    return {
      ...token,
      accessToken: refreshToken.access_token,
      accessTokenExpires: Date.now() + refreshToken.expires_in * 1000,
      refreshToken: refreshToken.refresh_token ?? token.refreshToken,
    };
  } catch (error) {
    console.error(error);
    return {
      ...token,
      error: "RefreshAccessTokenError",
    };
  }
}

export default NextAuth({
  providers: [
    SpotifyProvider({
      clientId: process.env.SPOTIFY_CLIENT_ID,
      clientSecret: process.env.SPOTIFY_CLIENT_SECRET,
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
    async jwt({ token, account, user }) {
      // first step: get the access token and refresh token from spotify
      if (account && user) {
        return {
          ...token,
          accessToken: account.accessToken,
          refreshToken: account.refreshToken,
          username: user.providerAccountId,
          accessTokenExpires: account.expires_at * 1000, // convert to ms
        };
      }

      // second step: check if the access token has expired
      // if it hasn't, return the token
      if (Date.now() < token.accessTokenExpires) {
        return token;
      } else {
        return await refreshAccessToken(token);
      }
    },

    async session({ session, token }) {
      session.user.accessToken = token.accessToken;
      session.user.refreshToken = token.refreshToken;
      session.user.username = token.username;
      return session;
    },
  },
});
