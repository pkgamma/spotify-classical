import SpotifyWebApi from "spotify-web-api-node";

const spotifyApi = new SpotifyWebApi({
  clientId: process.env.SPOTIFY_CLIENT_ID,
  clientSecret: process.env.SPOTIFY_CLIENT_SECRET,
});

async function refreshAccessToken(token: any) {
  try {
    spotifyApi.setAccessToken(token.accessToken);
    spotifyApi.setRefreshToken(token.refreshToken);
    const { body: refreshToken } = await spotifyApi.refreshAccessToken();
    token.accessToken = refreshToken.access_token;
    token.accessTokenExpires = Date.now() + refreshToken.expires_in * 1000;
    token.refreshToken = refreshToken.refresh_token ?? token.refreshToken;
    return token;
  } catch (error) {
    token.error = "RefreshAccessTokenError";
    return token;
  }
}

export default refreshAccessToken;
