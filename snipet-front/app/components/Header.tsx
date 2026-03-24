import Link from "next/link";
import Popup from "./PopupAuth";

export default function Header() {
  return (
    <header className="w-full h-[50px] bg-black">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 text-white h-full">
        <h1 className="text-sm font-semibold tracking-wide items-center">
          Snippet Manager
        </h1>
        <div className="flex flex-row">
          <nav className="flex items-center gap-4">
            <Link href="/" className="text-sm transition hover:text-gray-300px">
              Головна
            </Link>
          </nav>
          <Popup />
        </div>
      </div>
    </header>
  );
}
