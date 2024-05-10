import { submitShellyKey } from "@/app/server/Shelly";
import { useWallet } from "@txnlab/use-wallet";
import { useState } from "react";

export function SubmitShellyKeyButton({
  authKey,
  serverUrl,
  deviceId,
  updateMessage,
  disappearInput,
}: {
  authKey: string;
  serverUrl: string;
  deviceId: string;
  updateMessage: (message: string) => void;
  disappearInput: (flag: boolean) => void;
}) {
  const [isLoading, setIsLoading] = useState(false);
  const { activeAddress } = useWallet();


  const handleShellyKeySubmit = async () => {
    setIsLoading(true);
    disappearInput(true);
    updateMessage("Submitting Key...");

    try {
      const response = await submitShellyKey(authKey, serverUrl, deviceId, activeAddress! );
        

      updateMessage(response.data.message);
    } catch (error) {
      console.error("Error submitting Shelly key:", error);
       

      updateMessage("Error submitting Shelly key.");
    } finally {
      setIsLoading(false);
      disappearInput(false);
    }
  };

  return (
    <button
      onClick={handleShellyKeySubmit}
      className={`py-4 px-6 text-base font-medium rounded-lg focus:outline-none ${
        isLoading ? "bg-gray-400 cursor-wait" : "bg-[#00FFFF] hover:bg-cyan-700"
      }`}
      disabled={isLoading}
    >
      {isLoading ? "Submitting..." : "Submit Shelly Key"}
    </button>
  );
}
