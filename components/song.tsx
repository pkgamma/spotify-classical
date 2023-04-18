import useSpotify from "@/hooks/useSpotify";

function Song({ order, track }) {
  const SpotifyApi = useSpotify();

  return (
    <p>
      {order} {track.name}
    </p>
  );
}

export default Song;
