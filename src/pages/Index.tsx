
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Wallet, Zap, Star, Shield, Sword } from 'lucide-react';
import GameCanvas from '@/components/GameCanvas';
import WalletConnect from '@/components/WalletConnect';
import GameStats from '@/components/GameStats';
import FloatingParticles from '@/components/FloatingParticles';

const Index = () => {
  const [isWalletConnected, setIsWalletConnected] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 relative overflow-hidden">
      {/* Animated background gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 via-purple-600/20 to-pink-600/20 animate-pulse"></div>
      
      {/* Floating particles background */}
      <FloatingParticles />
      
      {/* Main content */}
      <div className="relative z-10 container mx-auto px-4 py-8 min-h-screen flex flex-col">
        {/* Header */}
        <header className="flex justify-between items-center mb-8">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-r from-cyan-400 to-purple-400 rounded-lg flex items-center justify-center">
              <Sword className="w-6 h-6 text-white" />
            </div>
            <h1 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
              Skyward Guilds
            </h1>
          </div>
          
          <WalletConnect 
            isConnected={isWalletConnected}
            onConnect={() => setIsWalletConnected(true)}
            onDisconnect={() => setIsWalletConnected(false)}
          />
        </header>

        {/* Main game area */}
        <div className="flex-1 grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Left sidebar - Game stats (hidden on mobile when not connected) */}
          {isWalletConnected && (
            <div className="lg:col-span-1 space-y-4">
              <GameStats />
            </div>
          )}
          
          {/* Main content area */}
          <div className={`${isWalletConnected ? 'lg:col-span-3' : 'lg:col-span-4'} space-y-6`}>
            {/* Welcome card */}
            {!isWalletConnected && (
              <Card className="bg-white/10 backdrop-blur-md border border-white/20 shadow-2xl p-8 text-center relative overflow-hidden group hover:bg-white/15 transition-all duration-300">
                {/* Animated border glow */}
                <div className="absolute inset-0 bg-gradient-to-r from-cyan-400/20 via-purple-400/20 to-pink-400/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-sm"></div>
                
                <div className="relative z-10">
                  <div className="flex justify-center mb-6">
                    <div className="w-20 h-20 bg-gradient-to-r from-cyan-400 to-purple-400 rounded-full flex items-center justify-center animate-pulse">
                      <Zap className="w-10 h-10 text-white" />
                    </div>
                  </div>
                  
                  <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                    Skyward Guilds
                  </h2>
                  
                  <p className="text-xl md:text-2xl text-white/80 mb-8 font-medium">
                    Connect your wallet to begin your on-chain adventure!
                  </p>
                  
                  <div className="flex flex-wrap justify-center gap-4 text-white/60">
                    <div className="flex items-center space-x-2">
                      <Shield className="w-5 h-5 text-cyan-400" />
                      <span>Blockchain Security</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Star className="w-5 h-5 text-purple-400" />
                      <span>NFT Characters</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Sword className="w-5 h-5 text-pink-400" />
                      <span>Epic Adventures</span>
                    </div>
                  </div>
                </div>
              </Card>
            )}
            
            {/* 3D Game Canvas */}
            <div className="relative">
              <GameCanvas isConnected={isWalletConnected} />
            </div>
          </div>
        </div>
        
        {/* Footer */}
        <footer className="mt-8 text-center text-white/60">
          <p className="text-sm">
            Built on Solana • Powered by Web3 • Your Adventure Awaits
          </p>
        </footer>
      </div>
    </div>
  );
};

export default Index;
