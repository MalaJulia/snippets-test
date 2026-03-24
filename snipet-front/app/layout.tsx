import Header from "./components/Header";
import { AuthProvider } from "./context/AuthContext";
import "./globals.css";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <AuthProvider>
          <Header />
          <main className="mx-auto max-w-5xl p-4">{children}</main>
        </AuthProvider>
      </body>
    </html>
  );
}
