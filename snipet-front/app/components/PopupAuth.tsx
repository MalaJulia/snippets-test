"use client";

import { useState } from "react";
import Image from "next/image";
import loginImg from "./../../public/login.png";
import LoginForm from "./LoginForm";
import { useAuth } from "../context/AuthContext";
import { login, registration } from "../services/auth_service";

export default function Popup() {
  const [isOpen, setIsOpen] = useState(false);
  const [tab, setTab] = useState<"login" | "register">("login");
  const [error, setError] = useState<string | null>(null);

  const { logout, auth, loginContext } = useAuth();

  const handleSubmitLogin = async (formData: FormData) => {
    const email = formData.get("email");
    const password = formData.get("password");
    try {
      setError(null);

      await login({
        email: email as string,
        password: password as string,
      });

      loginContext();
      setIsOpen(false);
    } catch (e: any) {
      setError(e.message);
    }
  };

  const handleSubmitRegistration = async (formData: FormData) => {
    const email = formData.get("email");
    const password = formData.get("password");
    try {
      setError(null);

      await registration({
        email: email as string,
        password: password as string,
      });
      setTab("login");
    } catch (e: any) {
      setError(e.message);
    }
  };

  return (
    <>
      <button onClick={() => setIsOpen(true)} className="p-2">
        <Image
          src={loginImg}
          width={30}
          height={30}
          alt="Picture of the author"
        />
      </button>

      {isOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50">
          <div className="bg-white p-6 rounded-lg w-[400px] relative">
            <button
              onClick={() => setIsOpen(false)}
              className="absolute top-2 right-2 text-gray-500"
            >
              ✕
            </button>

            {auth ? (
              <button
                className="bg-black text-white p-2 rounded m-1"
                onClick={logout}
              >
                Logout
              </button>
            ) : (
              <>
                <div className="flex justify-around mb-4">
                  <button
                    className={`pb-1 ${
                      tab === "login"
                        ? "border-b-2 border-black text-black"
                        : "text-gray-400"
                    }`}
                    onClick={() => setTab("login")}
                  >
                    Login
                  </button>

                  <button
                    className={`pb-1 ${
                      tab === "register"
                        ? "border-b-2 border-black text-black"
                        : "text-gray-400"
                    }`}
                    onClick={() => setTab("register")}
                  >
                    Register
                  </button>
                </div>
                <LoginForm
                  tabs={tab}
                  err={error}
                  func={
                    tab === "register"
                      ? handleSubmitRegistration
                      : handleSubmitLogin
                  }
                />
              </>
            )}
          </div>
        </div>
      )}
    </>
  );
}
