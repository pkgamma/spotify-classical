import refreshAccessToken from "@/lib/spotify";
import { signIn, useSession } from "next-auth/react";
import { useEffect } from "react";
import SpotifyWebApi from "spotify-web-api-node";

const spotifyApi = new SpotifyWebApi({
  clientId: process.env.SPOTIFY_CLIENT_ID,
  clientSecret: process.env.SPOTIFY_CLIENT_SECRET,
});

export default function useSpotify() {
  const { data: session } = useSession();

  useEffect(() => {
    if (session) {
      try {
        spotifyApi.setAccessToken(session.user.accessToken);
      } catch (error) {
        try {
          refreshAccessToken(session.user.refreshToken);
        } catch (error) {
          signIn();
        }
      }
    }
  }, [session]);

  return spotifyApi;
}
