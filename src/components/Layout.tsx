import type { PropsWithChildren } from "react";
import Header from "./header";
import "./Layout.css";

const Layout = ({ children }: PropsWithChildren) => {
  return (
    <div className="body">
      {/* header */}
      <Header />

      {/* main */}
      <main className="min-h-screen container mx-auto px-4 py-8">
        {children}
      </main>

      {/* footer */}
      <footer className="border-t backdrop-blur py-4 supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto text-end text-gray-600 text-xl">
          <p>&copy; {new Date().getFullYear()} made by fujimori_</p>
        </div>
      </footer>
    </div>
  );
};

export default Layout;
