import React from 'react';
import { Button } from '@/components/ui/button';
import { useFaucet } from '@/hooks/useFaucet';
import { useWallet } from '@/hooks/useWallet';
import { Loader2, Wallet } from 'lucide-react';
import NavbarLayout from '@/components/layout/NavbarLayout';

const FaucetPage: React.FC = () => {
  const { connect } = useWallet(); // Get connect function from useWallet
  const {
    isRequesting,
    canRequest,
    cooldownMessage,
    handleRequestTokens,
    isConnected,
    address
  } = useFaucet();

  const formatAddress = (addr: string | undefined | null): string => {
    if (!addr) return '';
    return `${addr.substring(0, 6)}...${addr.substring(addr.length - 4)}`;
  };

  return (
    <NavbarLayout>
      <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center bg-gradient-to-br from-purple-900 via-indigo-900 to-black text-white p-4">
        <div className="max-w-lg w-full text-center bg-black/30 backdrop-blur-sm p-8 rounded-xl shadow-2xl border border-white/10">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Claim <span className="text-purple-400">2000 DSI</span> Tokens for Testing!
          </h1>
          <p className="text-lg text-gray-300 mb-8">
            Get free DSI tokens to explore and test the DeSciAi ecosystem. Simply 
            {isConnected ? ' click the button below ' : ' connect your wallet '}
            and start your journey today!
          </p>

          {isConnected && address && (
            <p className="text-sm text-gray-400 mb-4">Connected: {formatAddress(address)}</p>
          )}

          {!isConnected ? (
            <Button 
              onClick={connect}
              size="lg"
              className="w-full bg-purple-600 hover:bg-purple-700 text-white text-lg font-semibold py-3"
            >
              <Wallet className="mr-2 h-5 w-5" />
              Connect Wallet
            </Button>
          ) : (
            <>
              <Button 
                onClick={handleRequestTokens}
                disabled={!canRequest || isRequesting}
                size="lg"
                className="w-full bg-purple-600 hover:bg-purple-700 disabled:bg-gray-500 disabled:opacity-70 text-white text-lg font-semibold py-3"
              >
                {isRequesting ? (
                  <>
                    <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                    Requesting...
                  </>
                ) : (
                  'Request 2000 DSI'
                )}
              </Button>
              
              {cooldownMessage && (
                <p className="mt-4 text-red-400 text-sm">
                  {cooldownMessage}
                </p>
              )}
            </>
          )}
        </div>
      </div>
    </NavbarLayout>
  );
};

export default FaucetPage; 