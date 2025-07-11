
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Wallet, ChevronDown, Copy, ExternalLink, LogOut } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface WalletConnectProps {
  isConnected: boolean;
  onConnect: () => void;
  onDisconnect: () => void;
}

const WalletConnect = ({ isConnected, onConnect, onDisconnect }: WalletConnectProps) => {
  const [isConnecting, setIsConnecting] = useState(false);
  const [showWalletMenu, setShowWalletMenu] = useState(false);
  const [walletAddress, setWalletAddress] = useState('');
  const { toast } = useToast();

  const connectWallet = async (walletType: string) => {
    setIsConnecting(true);
    
    try {
      // Simulate wallet connection
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Mock wallet address
      const mockAddress = '7xKZ...9mKp';
      setWalletAddress(mockAddress);
      onConnect();
      
      toast({
        title: "Wallet Connected!",
        description: `Successfully connected to ${walletType}`,
      });
    } catch (error) {
      toast({
        title: "Connection Failed",
        description: "Please try again or check your wallet extension.",
        variant: "destructive",
      });
    } finally {
      setIsConnecting(false);
      setShowWalletMenu(false);
    }
  };

  const disconnectWallet = () => {
    setWalletAddress('');
    onDisconnect();
    setShowWalletMenu(false);
    
    toast({
      title: "Wallet Disconnected",
      description: "Successfully disconnected your wallet.",
    });
  };

  const copyAddress = () => {
    navigator.clipboard.writeText('7xKZmF9wGVXMCYRTxJCqPv8HGJj4kFkNnC3MxR9mKp');
    toast({
      title: "Address Copied",
      description: "Wallet address copied to clipboard.",
    });
  };

  if (isConnected) {
    return (
      <div className="relative">
        <Button
          onClick={() => setShowWalletMenu(!showWalletMenu)}
          className="bg-gradient-to-r from-cyan-500 to-purple-500 hover:from-cyan-600 hover:to-purple-600 text-white font-semibold px-4 py-2 rounded-lg flex items-center space-x-2 shadow-lg transition-all duration-300"
        >
          <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
          <span className="hidden sm:inline">{walletAddress}</span>
          <span className="sm:hidden">Connected</span>
          <ChevronDown className="w-4 h-4" />
        </Button>

        {showWalletMenu && (
          <Card className="absolute right-0 top-full mt-2 w-64 bg-slate-800/95 backdrop-blur-md border border-white/20 shadow-2xl z-50">
            <div className="p-4 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-white/80 text-sm">Connected Wallet</span>
                <div className="w-2 h-2 bg-green-400 rounded-full"></div>
              </div>
              
              <div className="flex items-center space-x-2 bg-slate-700/50 rounded-lg p-2">
                <span className="text-white font-mono text-sm flex-1">
                  7xKZ...9mKp
                </span>
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={copyAddress}
                  className="text-white/60 hover:text-white p-1"
                >
                  <Copy className="w-4 h-4" />
                </Button>
              </div>
              
              <Button
                variant="ghost"
                className="w-full text-left text-white/80 hover:text-white hover:bg-slate-700/50 justify-start"
                onClick={() => window.open('https://solscan.io', '_blank')}
              >
                <ExternalLink className="w-4 h-4 mr-2" />
                View on Solscan
              </Button>
              
              <hr className="border-white/20" />
              
              <Button
                variant="ghost"
                className="w-full text-left text-red-400 hover:text-red-300 hover:bg-red-500/10 justify-start"
                onClick={disconnectWallet}
              >
                <LogOut className="w-4 h-4 mr-2" />
                Disconnect
              </Button>
            </div>
          </Card>
        )}
      </div>
    );
  }

  return (
    <div className="relative">
      <Button
        onClick={() => setShowWalletMenu(!showWalletMenu)}
        disabled={isConnecting}
        className="bg-gradient-to-r from-cyan-500 to-purple-500 hover:from-cyan-600 hover:to-purple-600 text-white font-semibold px-6 py-3 rounded-lg flex items-center space-x-2 shadow-lg transition-all duration-300 hover:shadow-cyan-500/25 animate-pulse"
      >
        <Wallet className="w-5 h-5" />
        <span>{isConnecting ? 'Connecting...' : 'Connect Wallet'}</span>
      </Button>

      {showWalletMenu && (
        <Card className="absolute right-0 top-full mt-2 w-72 bg-slate-800/95 backdrop-blur-md border border-white/20 shadow-2xl z-50">
          <div className="p-4">
            <h3 className="text-white font-semibold mb-4">Connect a Wallet</h3>
            <div className="space-y-2">
              <Button
                onClick={() => connectWallet('Phantom')}
                disabled={isConnecting}
                className="w-full bg-slate-700/50 hover:bg-slate-700 text-white justify-start border border-white/10"
              >
                <div className="w-6 h-6 bg-gradient-to-r from-purple-400 to-pink-400 rounded mr-3"></div>
                Phantom Wallet
              </Button>
              
              <Button
                onClick={() => connectWallet('Solflare')}
                disabled={isConnecting}
                className="w-full bg-slate-700/50 hover:bg-slate-700 text-white justify-start border border-white/10"
              >
                <div className="w-6 h-6 bg-gradient-to-r from-orange-400 to-red-400 rounded mr-3"></div>
                Solflare Wallet
              </Button>
              
              <Button
                onClick={() => connectWallet('Backpack')}
                disabled={isConnecting}
                className="w-full bg-slate-700/50 hover:bg-slate-700 text-white justify-start border border-white/10"
              >
                <div className="w-6 h-6 bg-gradient-to-r from-green-400 to-cyan-400 rounded mr-3"></div>
                Backpack Wallet
              </Button>
            </div>
            
            <p className="text-white/60 text-xs mt-4">
              New to Solana wallets? <a href="#" className="text-cyan-400 hover:underline">Learn more</a>
            </p>
          </div>
        </Card>
      )}
    </div>
  );
};

export default WalletConnect;
