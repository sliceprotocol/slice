import { useAssignDispute } from "../hooks/useAssignDispute";

export const AssignJurorButton = () => {
  const { assignDispute, isLoading } = useAssignDispute();

  const handleClick = async () => {
    const category = "General";
    const stakeAmount = BigInt(200); // 200 units of the token

    await assignDispute(category, stakeAmount);
  };

  return (
    <button
      className="btn btn-primary"
      onClick={() => void handleClick()}
      disabled={isLoading}
    >
      {isLoading ? "Assigning..." : "Assign as Juror"}
    </button>
  );
};
