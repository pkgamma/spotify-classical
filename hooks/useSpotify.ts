import { signIn, useSession } from "next-auth/react";
import { useEffect } from "react";
import SpotifyWebApi from "spotify-web-api-node";

const SpotifyApi = new SpotifyWebApi({
  clientId: process.env.SPOTIFY_CLIENT_ID,
  clientSecret: process.env.SPOTIFY_CLIENT_SECRET,
});

function useSpotify() {
  const { data: session } = useSession();

  useEffect(() => {
    if (session) {
      if (session.user.error === "RefreshAccessTokenError") {
        signIn();
      }
      SpotifyApi.setAccessToken(session.user.accessToken);
    }
  }, [session]);

  return SpotifyApi;
}

export default useSpotify;
