
import Footer from "@/components/Footer/Footer";
import Navbar from "../components/Navbar/Navbar"
import "../styles/globals.css"
import "../lib/fontawesome"
import {ToastContainer,Bounce} from "react-toastify"
import Providers from "@/components/Providers/Providers";
import { verifytoken } from "./(auth)/Server/auth.Actions";
export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;

}>) {
   const response = await verifytoken()
  return (
    <Providers preloadedState={{auth:response, wishlist:{items:[]}, cart:{items:[]}}}>
    <html lang="en">
      <body>
        <Navbar/>
        {children}
        <Footer/>
        <ToastContainer
         position="top-right"
         autoClose={5000}
         hideProgressBar={false}
         newestOnTop={false}
         closeOnClick={false}
         rtl={false}
         pauseOnFocusLoss
         draggable
         pauseOnHover
         theme="light"
         transition={Bounce}
        />
      </body>
    </html>
    </Providers>
  );
}
