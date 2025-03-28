import React from "react";
import axios from "axios";
import storage from "@/app/storage";
import { useColorScheme } from "@/hooks/useColorScheme";
import LoginFormComponents from "@/components/LoginForm/LoginForm.components";
import {
  Button,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
} from "react-native";
import { ScrollView } from "react-native";
import { TouchableWithoutFeedback } from "react-native";

interface ILoginResponse {
  access_token: string;
}

interface IFormData {
  username: string;
  password: string;
}

export const LoginForm = () => {
  const [username, setUsername] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [responseError, setResponseError] = React.useState(false);
  const theme = useColorScheme();
  const Components = LoginFormComponents(theme);

  const onSubmit = async (data: IFormData) => {
    try {
      setResponseError(false);
      await storage.save({
        key: "username",
        data: data.username.trim(),
      });

      await storage.save({
        key: "password",
        data: data.password.trim(),
      });

      const response = await axios.post<ILoginResponse>(
        `http://localhost:3000/auth/`,
        {
          username: data.username.trim(),
          password: data.password.trim(),
        },
      );
      if (!response.data) return;

      const accessToken = response.data;

      await storage.save({
        key: "token",
        data: accessToken,
      });
    } catch (e) {
      setResponseError(true);
      console.error(`OnSubmitLoginForm: ${e}`);
    }
  };

  return (
    <Components.Container>
      <Components.H1 style={{ color: theme === "dark" ? "#fff" : "#000" }}>
        Привет
      </Components.H1>
      <Components.H2 style={{ color: theme === "dark" ? "#fff" : "#000" }}>
        Введи свои данные от журнала
      </Components.H2>
      <Components.FormInput
        onChangeText={(e) => setUsername(e)}
        defaultValue={username}
        placeholderTextColor={theme === "dark" ? "#fff" : "#000"}
        style={{ color: theme === "dark" ? "#fff" : "#000" }}
        placeholder="Ваш логин"
      />
      <Components.FormInput
        onChangeText={(e) => setPassword(e)}
        defaultValue={password}
        placeholderTextColor={theme === "dark" ? "#fff" : "#000"}
        style={{ color: theme === "dark" ? "#fff" : "#000" }}
        placeholder="Ваш пароль"
        secureTextEntry
      />
      <Button
        title="Отправить"
        onPress={() => onSubmit({ username, password })}
      ></Button>
    </Components.Container>
  );
};
