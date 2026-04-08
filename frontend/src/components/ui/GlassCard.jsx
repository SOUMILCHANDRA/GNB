import { motion } from "framer-motion";
import { cn } from "../../lib/utils";

const GlassCard = ({ children, className, glow = false, ...props }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      whileHover={glow ? { y: -5, boxShadow: "0 20px 40px rgba(0,0,0,0.4)" } : {}}
      className={cn(
        "glass-card p-6 rounded-3xl relative overflow-hidden",
        glow && "hover:border-primary/30 transition-colors duration-500",
        className
      )}
      {...props}
    >
      {/* Subtle overlay gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent pointer-events-none" />
      
      <div className="relative z-10">
        {children}
      </div>
    </motion.div>
  );
};

export default GlassCard;
