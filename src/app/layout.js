import './globals.css';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import { Roboto } from 'next/font/google';
import SessionInitializer from './components/SessionInitializer';
export const dynamic = 'force-dynamic';
export const revalidate = 0;

const roboto = Roboto({
  weight: ['300'],
  subsets: ['latin'],
});

function RootLayout({ children }) {
  return (
    <html lang="en" className={roboto.className}>
      <body className="overflow-y-auto">
        <SessionInitializer />
        <Navbar />
        <main className="pt-16 pb-16 min-h-screen">
          {/* pt-16 and pb-16 provide space for navbar and footer */}
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}

export default RootLayout;
