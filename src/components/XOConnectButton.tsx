"use client";
import { useXOContracts } from "@/providers/XOContractsProvider";

const XOConnectButton = () => {
  const { connect, address } = useXOContracts();
  return (
    <div>
      <button onClick={connect}>conectar</button>
      <div>
        <h1>XOConnect + viem</h1>
        {address ? <p>Connected: {address}</p> : <p>Connecting wallet...</p>}
      </div>
    </div>
  );
};

export default XOConnectButton;
