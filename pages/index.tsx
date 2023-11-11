import Layout from "@/components/Layout";
import { motion } from "framer-motion";

export default function HomePage() {
  return (
    <Layout title="SymphonyNow">
      <div className="flex justify-center items-center h-screen">
        <motion.div
          className="text-center max-w-xl"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{
            duration: 0.3,
            type: "spring",
            damping: 10,
            mass: 0.75,
            stiffness: 100,
          }}
        >
          <h1 className="font-serif text-lg font-semibold">
            Welcome to SymphonyNow
          </h1>
          <h2 className="font-serif text-sm leading-6 mt-4 text-gray-400">
            Welcome to SymphonyNow, a portal to the timeless world of classical
            music. Enter a world of wonder and enchantment, where the soaring
            melodies and rich harmonies of the greatest composers of all time
            await you. From the soaring majesty of the Ninth Symphony by
            Beethoven to the breathtaking beauty of Nocturnes by Chopin,
            SymphonyNow invites you to immerse yourself in the sublime artistry
            of classical music. So come, let us journey together through the
            centuries, exploring the depths of human emotion and the limitless
            potential of the human spirit, as we discover the wonders of
            classical music together.
          </h2>
        </motion.div>
      </div>
    </Layout>
  );
}
