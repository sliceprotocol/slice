import { usePrivy } from "@privy-io/react-auth";

export const useSliceConnect = () => {
  const { login, logout } = usePrivy();

  const connect = async () => {
    login();
  };

  const disconnect = async () => {
    await logout();
  };

  return {
    connect,
    disconnect,
  };
};
