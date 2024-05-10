import { submitTapoApiKey } from '@/app/server/Tapo';
import { useWallet } from '@txnlab/use-wallet';
import { useState } from 'react';

export function SubmitTapoButton({
  email,
  password,
  deviceIp,
  updateMessage,
  disappearInput,
}: {
  email: string;
  password: string;
  deviceIp: string;
  updateMessage: ({
    message,
    color,
  }: {
    message: string;
    color: string;
  }) => void;
  disappearInput: Function;
}) {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>('');
  const { activeAddress } = useWallet();


  const handleTapoSubmit = async () => {
    setLoading(true);
    setError('');

    disappearInput(true);
    updateMessage({ message: 'Submitting Key...', color: 'white' });

    try {
      const response = await submitTapoApiKey(email, password, deviceIp, activeAddress!);

      if (response && response.data) {
        updateMessage({ message: response.data.message || 'Success', color: 'green' });
      } else {
        updateMessage({ message: 'Failed to communicate with Tapo device.', color: 'red' });
      }
    } catch (error) {
      console.error('Error submitting Tapo API key:', error);
      updateMessage({ message: 'Error submitting API key.', color: 'red' });
    } finally {
      setLoading(false);
      disappearInput(false);
    }
  };

  return (
    <button
      onClick={handleTapoSubmit}
      className={`py-4 px-6 text-base font-medium rounded-lg focus:outline-none ${
        loading ? 'bg-gray-400 cursor-not-allowed' : 'bg-[#00FFFF] cursor-pointer'
      }`}
      disabled={loading}
    >
      {loading ? 'Submitting...' : 'Submit'}
      {error && <p className="text-red-500 mt-2">{error}</p>}
    </button>
  );
}