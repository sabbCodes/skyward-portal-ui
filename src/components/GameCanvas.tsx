
import { useEffect, useRef } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Play, Maximize2, Settings } from 'lucide-react';

interface GameCanvasProps {
  isConnected: boolean;
}

const GameCanvas = ({ isConnected }: GameCanvasProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!canvasRef.current || !isConnected) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas size
    const resizeCanvas = () => {
      const rect = canvas.getBoundingClientRect();
      canvas.width = rect.width * window.devicePixelRatio;
      canvas.height = rect.height * window.devicePixelRatio;
      ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Simple animated background
    let animationId: number;
    let time = 0;

    const animate = () => {
      const width = canvas.width / window.devicePixelRatio;
      const height = canvas.height / window.devicePixelRatio;

      // Clear canvas
      ctx.fillStyle = 'rgba(15, 23, 42, 0.8)';
      ctx.fillRect(0, 0, width, height);

      // Draw animated grid
      ctx.strokeStyle = 'rgba(56, 189, 248, 0.3)';
      ctx.lineWidth = 1;
      
      const gridSize = 50;
      const offsetX = (time * 0.5) % gridSize;
      const offsetY = (time * 0.3) % gridSize;

      for (let x = -gridSize + offsetX; x < width + gridSize; x += gridSize) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
        ctx.stroke();
      }

      for (let y = -gridSize + offsetY; y < height + gridSize; y += gridSize) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
        ctx.stroke();
      }

      // Draw floating orbs
      for (let i = 0; i < 5; i++) {
        const x = width * 0.2 + Math.sin(time * 0.01 + i) * width * 0.3;
        const y = height * 0.3 + Math.cos(time * 0.008 + i * 2) * height * 0.2;
        const radius = 20 + Math.sin(time * 0.02 + i) * 10;

        const gradient = ctx.createRadialGradient(x, y, 0, x, y, radius);
        gradient.addColorStop(0, `hsla(${180 + i * 60}, 70%, 60%, 0.8)`);
        gradient.addColorStop(1, `hsla(${180 + i * 60}, 70%, 60%, 0)`);

        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(x, y, radius, 0, Math.PI * 2);
        ctx.fill();
      }

      // Draw central nexus
      const centerX = width * 0.5;
      const centerY = height * 0.5;
      const nexusRadius = 40 + Math.sin(time * 0.03) * 10;

      const nexusGradient = ctx.createRadialGradient(centerX, centerY, 0, centerX, centerY, nexusRadius);
      nexusGradient.addColorStop(0, 'rgba(168, 85, 247, 0.9)');
      nexusGradient.addColorStop(0.7, 'rgba(59, 130, 246, 0.5)');
      nexusGradient.addColorStop(1, 'rgba(59, 130, 246, 0)');

      ctx.fillStyle = nexusGradient;
      ctx.beginPath();
      ctx.arc(centerX, centerY, nexusRadius, 0, Math.PI * 2);
      ctx.fill();

      time += 1;
      animationId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      if (animationId) cancelAnimationFrame(animationId);
    };
  }, [isConnected]);

  return (
    <Card className="bg-slate-900/50 backdrop-blur-sm border border-white/10 shadow-2xl rounded-2xl overflow-hidden relative group">
      {/* Canvas area */}
      <div className="relative aspect-video w-full bg-gradient-to-br from-slate-900 via-purple-900/20 to-slate-900">
        {isConnected ? (
          <canvas
            ref={canvasRef}
            className="w-full h-full object-cover"
            style={{ background: 'transparent' }}
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center space-y-4">
              <div className="w-24 h-24 bg-gradient-to-r from-cyan-400/20 to-purple-400/20 rounded-full flex items-center justify-center mx-auto border-4 border-white/10">
                <Play className="w-12 h-12 text-white/40" />
              </div>
              <p className="text-white/60 text-lg">Connect your wallet to enter the game world</p>
            </div>
          </div>
        )}

        {/* Game overlay controls */}
        {isConnected && (
          <div className="absolute top-4 right-4 flex space-x-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <Button
              size="sm"
              variant="secondary"
              className="bg-black/40 backdrop-blur-sm text-white border-white/20 hover:bg-black/60"
            >
              <Settings className="w-4 h-4" />
            </Button>
            <Button
              size="sm"
              variant="secondary"
              className="bg-black/40 backdrop-blur-sm text-white border-white/20 hover:bg-black/60"
            >
              <Maximize2 className="w-4 h-4" />
            </Button>
          </div>
        )}

        {/* Loading indicator when connecting */}
        {isConnected && (
          <div className="absolute bottom-4 left-4">
            <div className="flex items-center space-x-2 bg-black/40 backdrop-blur-sm px-3 py-2 rounded-lg">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
              <span className="text-white/80 text-sm">Game World Active</span>
            </div>
          </div>
        )}
      </div>

      {/* Game info panel */}
      {isConnected && (
        <div className="p-4 bg-slate-800/50 backdrop-blur-sm border-t border-white/10">
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <h3 className="text-white font-semibold">Ethereal Nexus</h3>
              <p className="text-white/60 text-sm">Current realm • 847 players online</p>
            </div>
            <Button className="bg-gradient-to-r from-cyan-500 to-purple-500 hover:from-cyan-600 hover:to-purple-600 text-white">
              Enter Game
            </Button>
          </div>
        </div>
      )}
    </Card>
  );
};

export default GameCanvas;
