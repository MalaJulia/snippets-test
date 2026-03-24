import Form from "next/form";

type Props = {
  tabs: "login" | "register";
  func: (formData: FormData) => void;
  err: string | null;
};

export default function LoginForm({ tabs, func, err }: Props) {
  return (
    <Form action={func}>
      <div className="flex flex-col">
        <input
          name="email"
          placeholder="Email"
          type="email"
          className="border p-2 border-black rounded text-black m-1"
        />
        <input
          name="password"
          type="password"
          placeholder="Password"
          className="border p-2 rounded border-black text-black m-1"
        />
        {err && <p className="text-red-500 text-sm mb-2">{err}</p>}

        {tabs === "login" ? (
          <button type="submit" className="bg-black text-white p-2 rounded m-1">
            {" "}
            Login
          </button>
        ) : (
          <button type="submit" className="bg-black text-white p-2 rounded m-1">
            {" "}
            Registration
          </button>
        )}
      </div>
    </Form>
  );
}
