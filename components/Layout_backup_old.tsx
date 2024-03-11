// import React, { ReactNode, useEffect, useRef, useState } from "react";
// import Head from "next/head";
// import NavbarDesktop from "./NavbarDesktop";
// import { useRecoilState } from "recoil";
// import { isLoadedState } from "@/atoms/states";
// import { Loader2 } from "lucide-react";
// import NavbarMobile from "./NavbarMobile";
// import { motion } from "framer-motion";

// type Props = {
//   children?: ReactNode;
//   title?: string;
// };
// export default function Layout({ children, title = "Default Title" }: Props) {
//   const [isLoaded, setIsLoaded] = useRecoilState(isLoadedState);

//   return (
//     <div>
//       <Head>
//         <title>{isLoaded ? title : "Loading..."}</title>
//         <meta
//           name="viewport"
//           content="width=device-width, initial-scale=1, maximum-scale=1, viewport-fit=cover"
//         ></meta>
//       </Head>

//       <NavbarDesktop className="bg-slate-100 md:w-64 md:block hidden border-r fixed left-0 top-0 bottom-0 overflow-auto z-10" />
//       <NavbarMobile className="md:hidden fixed bottom-0 left-0 z-50 w-full h-14 bg-white border-t" />

//       <main>
//         <motion.div
//           className="md:pl-64 min-h-screen"
//           initial={{ y: -6, opacity: 0 }}
//           animate={{ y: 0, opacity: 1 }}
//           exit={{ y: 6, opacity: 0 }}
//           transition={{
//             type: "spring",
//             stiffness: 200,
//             damping: 20,
//           }}
//         >
//           {children}
//         </motion.div>
//       </main>
//     </div>
//   );
// }
