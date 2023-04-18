import SpotifyWebApi from "spotify-web-api-node";

const SpotifyApi = new SpotifyWebApi({
  clientId: process.env.SPOTIFY_CLIENT_ID,
  clientSecret: process.env.SPOTIFY_CLIENT_SECRET,
});

async function refreshAccessToken(token: any) {
  try {
    SpotifyApi.setAccessToken(token.accessToken);
    SpotifyApi.setRefreshToken(token.refreshToken);
    const { body: refreshToken } = await SpotifyApi.refreshAccessToken();
    token.accessToken = refreshToken.access_token;
    token.accessTokenExpires = Date.now() + refreshToken.expires_in * 1000;
    token.refreshToken = refreshToken.refresh_token ?? token.refreshToken;
    return token;
    // return {
    //   ...token,
    //   accessToken: refreshToken.access_token,
    //   accessTokenExpires: Date.now() + refreshToken.expires_in * 1000,
    //   refreshToken: refreshToken.refresh_token ?? token.refreshToken,
    // };
  } catch (error) {
    token.error = "RefreshAccessTokenError";
    return token;
    // return {
    //   ...token,
    //   error: "RefreshAccessTokenError",
    // };
  }
}

export default refreshAccessToken;
