import Layout from "@/components/Layout";

export default function HomePage() {
  return (
    <Layout title="SymphonyNow">
      <div className="flex justify-center items-center h-screen">
        <div className="text-center">
          <h1 className="font-serif text-xl font-bold">
            Welcome to SymphonyNow
          </h1>
          <h2 className="mt-2 text-gray-400">
            Explore Classical Music with Spotify
          </h2>
        </div>
      </div>
    </Layout>
  );
}
