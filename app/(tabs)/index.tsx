import React from "react";
import storage from "@/app/storage";
import { LoginForm } from "@/components/LoginForm/LoginForm";

export default function HomeScreen() {
  let token;

  React.useEffect(() => {
    (async () => {
      token = await storage.load({ key: "token" });
    })();
  }, [token]);

  return <LoginForm />;
}
