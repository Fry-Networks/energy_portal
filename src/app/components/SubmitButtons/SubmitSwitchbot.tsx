import { submitSwitchKey } from "@/app/server/Switch";
import { useWallet } from "@txnlab/use-wallet";
import { useState } from "react";

export function SubmitSwitchKeyButton({
  token,
  deviceId,
  command,
  updateMessage,
  disappearInput,
}: {
  token: string;
  deviceId: string;
  command: string;
  updateMessage: (message: string) => void;
  disappearInput: (flag: boolean) => void;
}) {
  const [isLoading, setIsLoading] = useState(false);
  const { activeAddress } = useWallet();


  const handleSwitchKeySubmit = async () => {
    setIsLoading(true);
    disappearInput(true);
    updateMessage("Submitting Key...");

    try {
      const response = await submitSwitchKey(token,deviceId,command,activeAddress! );

      updateMessage(response.message);
    } catch (error) {
      console.error("Error submitting Switch key:", error);

      updateMessage("Error submitting Shelly key.");
    } finally {
      setIsLoading(false);
      disappearInput(false);
    }
  };

  return (
    <button
      onClick={handleSwitchKeySubmit}
      className={`py-4 px-6 text-base font-medium rounded-lg focus:outline-none ${
        isLoading ? "bg-gray-400 cursor-wait" : "bg-[#00FFFF] hover:bg-cyan-700"
      }`}
      disabled={isLoading}
    >
      {isLoading ? "Submitting..." : "Submit Shelly Key"}
    </button>
  );
}
