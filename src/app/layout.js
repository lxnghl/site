import './globals.css';
import Navbar from './components/Navbar';
import { Roboto } from 'next/font/google';

const roboto = Roboto({
  weight: ['300'],
  subsets: ['latin'],
});

function RootLayout({ children }) {
  return (
    <html lang="en" className={roboto.className}>
      <body>
        <Navbar />
        <main>{children}</main>
      </body>
    </html>
  );
}

export default RootLayout;
