import styled from "styled-components/native";

const LoginFormComponents = (theme?: string | null) => {
  const Container = styled.View`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    text-align: center;
    gap: 10px;
    padding: 30px;
  `;

  const H1 = styled.Text`
    font-size: 24px;
    font-weight: 700;
  `;

  const H2 = styled.Text`
    font-size: 20px;
    font-weight: 500;
  `;

  const FormInput = styled.TextInput`
    width: 100%;
    padding: 15px;
    border: 1px solid #555;
    margin-top: 20px;
    border-radius: 10px;
  `;
  return {
    Container,
    H1,
    H2,
    FormInput,
  };
};

export default LoginFormComponents;
