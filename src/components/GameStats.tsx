
import { Card } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { 
  Sword, 
  Shield, 
  Zap, 
  Star, 
  Crown, 
  Coins,
  TrendingUp,
  Users
} from 'lucide-react';

const GameStats = () => {
  return (
    <div className="space-y-4">
      {/* Player Level Card */}
      <Card className="bg-slate-800/50 backdrop-blur-sm border border-white/20 p-4">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center space-x-2">
            <Crown className="w-5 h-5 text-yellow-400" />
            <span className="text-white font-semibold">Level 47</span>
          </div>
          <Badge className="bg-gradient-to-r from-cyan-500 to-purple-500 text-white">
            Skyward Knight
          </Badge>
        </div>
        
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-white/60">Experience</span>
            <span className="text-white">8,750 / 12,000</span>
          </div>
          <Progress value={72.9} className="h-2" />
        </div>
      </Card>

      {/* Character Stats */}
      <Card className="bg-slate-800/50 backdrop-blur-sm border border-white/20 p-4">
        <h3 className="text-white font-semibold mb-3">Character Stats</h3>
        
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Sword className="w-4 h-4 text-red-400" />
              <span className="text-white/80 text-sm">Attack</span>
            </div>
            <span className="text-white font-semibold">156</span>
          </div>
          
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Shield className="w-4 h-4 text-blue-400" />
              <span className="text-white/80 text-sm">Defense</span>
            </div>
            <span className="text-white font-semibold">98</span>
          </div>
          
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Zap className="w-4 h-4 text-yellow-400" />
              <span className="text-white/80 text-sm">Speed</span>
            </div>
            <span className="text-white font-semibold">134</span>
          </div>
          
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Star className="w-4 h-4 text-purple-400" />
              <span className="text-white/80 text-sm">Magic</span>
            </div>
            <span className="text-white font-semibold">87</span>
          </div>
        </div>
      </Card>

      {/* Inventory Preview */}
      <Card className="bg-slate-800/50 backdrop-blur-sm border border-white/20 p-4">
        <h3 className="text-white font-semibold mb-3">Quick Inventory</h3>
        
        <div className="grid grid-cols-3 gap-2">
          {[...Array(6)].map((_, i) => (
            <div
              key={i}
              className="aspect-square bg-slate-700/50 rounded-lg border border-white/10 flex items-center justify-center relative group hover:bg-slate-700 transition-colors cursor-pointer"
            >
              {i < 3 ? (
                <div className={`w-6 h-6 rounded ${
                  i === 0 ? 'bg-gradient-to-r from-red-400 to-orange-400' :
                  i === 1 ? 'bg-gradient-to-r from-blue-400 to-cyan-400' :
                  'bg-gradient-to-r from-purple-400 to-pink-400'
                }`} />
              ) : (
                <div className="w-6 h-6 border-2 border-dashed border-white/20 rounded" />
              )}
              {i < 3 && (
                <div className="absolute -top-1 -right-1 w-4 h-4 bg-cyan-400 rounded-full text-xs flex items-center justify-center text-black font-bold">
                  {Math.floor(Math.random() * 9) + 1}
                </div>
              )}
            </div>
          ))}
        </div>
      </Card>

      {/* Economy Stats */}
      <Card className="bg-slate-800/50 backdrop-blur-sm border border-white/20 p-4">
        <h3 className="text-white font-semibold mb-3">Economy</h3>
        
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Coins className="w-4 h-4 text-yellow-400" />
              <span className="text-white/80 text-sm">Gold</span>
            </div>
            <span className="text-white font-semibold">2,847</span>
          </div>
          
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="w-4 h-4 bg-gradient-to-r from-cyan-400 to-purple-400 rounded-full" />
              <span className="text-white/80 text-sm">Crystals</span>
            </div>
            <span className="text-white font-semibold">156</span>
          </div>
          
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <TrendingUp className="w-4 h-4 text-green-400" />
              <span className="text-white/80 text-sm">Guild Points</span>
            </div>
            <span className="text-white font-semibold">3,291</span>
          </div>
        </div>
      </Card>

      {/* Guild Info */}
      <Card className="bg-slate-800/50 backdrop-blur-sm border border-white/20 p-4">
        <h3 className="text-white font-semibold mb-3">Guild Status</h3>
        
        <div className="space-y-2">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full flex items-center justify-center">
              <Crown className="w-4 h-4 text-white" />
            </div>
            <div>
              <p className="text-white font-semibold text-sm">Ethereal Guardians</p>
              <p className="text-white/60 text-xs">Rank #47</p>
            </div>
          </div>
          
          <div className="flex items-center justify-between text-sm">
            <span className="text-white/60">Members</span>
            <div className="flex items-center space-x-1">
              <Users className="w-3 h-3 text-white/60" />
              <span className="text-white">48/50</span>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default GameStats;
