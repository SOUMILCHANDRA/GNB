import { motion } from "framer-motion";
import { User, Shield, Key, MapPin, Globe, Fingerprint, LogOut } from "lucide-react";
import GlassCard from "../components/ui/GlassCard";
import { useBankingStore } from "../store/useBankingStore";
import { authService } from "../services/authService";

export default function ProfilePage() {
  const { user, clearStore } = useBankingStore();

  const handleLogout = async () => {
    await authService.signOut();
    clearStore();
  };

  return (
    <div className="max-w-4xl mx-auto py-12">
      <div className="flex items-center justify-between mb-12">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-2xl bg-secondary/20 flex items-center justify-center text-secondary border border-secondary/20">
            <Fingerprint className="w-8 h-8" />
          </div>
          <div>
            <h1 className="text-3xl font-display font-black tracking-tighter uppercase">Identity Profile</h1>
            <p className="text-sm text-secondary font-bold tracking-widest uppercase italic">AUTHORIZED LEVEL 4 CLIENT</p>
          </div>
        </div>

        <button 
          onClick={handleLogout}
          className="px-6 py-3 rounded-xl border border-red-500/30 text-red-500 font-bold text-xs tracking-widest uppercase hover:bg-red-500/10 transition-colors flex items-center gap-2"
        >
          <LogOut className="w-4 h-4" />
          Terminate Session
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Profile Card */}
        <div className="md:col-span-1 space-y-6">
          <GlassCard className="p-8 border-white/10 bg-white/[0.02] text-center">
             <div className="relative inline-block mx-auto mb-6">
                <div className="w-32 h-32 rounded-full border-2 border-primary p-1">
                   <div className="w-full h-full rounded-full bg-primary/20 flex items-center justify-center text-primary">
                      <User className="w-16 h-16" />
                   </div>
                </div>
                <div className="absolute -bottom-1 -right-1 w-8 h-8 rounded-full bg-green-500 border-4 border-black flex items-center justify-center">
                   <Shield className="w-4 h-4 text-black" />
                </div>
             </div>
             
             <h2 className="text-2xl font-display font-black tracking-tight">{user?.name || "IDENTITY_UNKNOWN"}</h2>
             <p className="text-[10px] font-mono text-white/40 uppercase tracking-widest mt-2">ID: {user?.id || "N/A"}</p>
          </GlassCard>

          <div className="p-6 rounded-2xl border border-white/5 bg-white/[0.02] space-y-4">
             <div className="flex items-center justify-between">
                <span className="text-[10px] font-black text-white/40 tracking-widest uppercase">Encryption</span>
                <span className="text-[10px] font-mono text-primary uppercase">AES-256-GCM</span>
             </div>
             <div className="flex items-center justify-between">
                <span className="text-[10px] font-black text-white/40 tracking-widest uppercase">Connection</span>
                <span className="text-[10px] font-mono text-green-500 uppercase">Secure Tunneling</span>
             </div>
          </div>
        </div>

        {/* Identity Details */}
        <div className="md:col-span-2 space-y-8">
           <GlassCard className="p-8 border-white/10 bg-white/[0.02] grid grid-cols-1 md:grid-cols-2 gap-8">
              {[
                { label: "Email Address", value: user?.email || "NOT_STORED", icon: Globe },
                { label: "Access Token", value: "**********", icon: Key },
                { label: "Base Location", value: "New York, USA", icon: MapPin },
                { label: "System Priority", value: "OMEGA-1", icon: Shield },
              ].map((item, i) => (
                <div key={i} className="space-y-2">
                  <div className="flex items-center gap-2 text-white/40">
                    <item.icon className="w-3 h-3" />
                    <label className="text-[10px] font-black tracking-[0.3em] uppercase">{item.label}</label>
                  </div>
                  <p className="text-sm font-mono text-white/80">{item.value}</p>
                </div>
              ))}
           </GlassCard>

           <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="p-6 rounded-2xl border border-white/5 bg-white/[0.02] hover:bg-white/[0.05] transition-colors group cursor-pointer">
                 <h4 className="text-[10px] font-black text-white/40 tracking-widest uppercase mb-4 group-hover:text-primary transition-colors">Credential Management</h4>
                 <p className="text-xs text-white/60 leading-relaxed uppercase font-black">Rotation scheduled in 14 days.</p>
              </div>
              <div className="p-6 rounded-2xl border border-white/5 bg-white/[0.02] hover:bg-white/[0.05] transition-colors group cursor-pointer">
                 <h4 className="text-[10px] font-black text-white/40 tracking-widest uppercase mb-4 group-hover:text-secondary transition-colors">Access Logs</h4>
                 <p className="text-xs text-white/60 leading-relaxed uppercase font-black">Last authorized: {new Date().toLocaleDateString()}</p>
              </div>
           </div>
        </div>
      </div>
    </div>
  );
}
