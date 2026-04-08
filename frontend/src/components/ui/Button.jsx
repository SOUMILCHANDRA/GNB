import { motion } from "framer-motion";
import { cn } from "../../lib/utils";

const Button = ({ 
  children, 
  className, 
  variant = "primary", 
  size = "md", 
  isLoading, 
  ...props 
}) => {
  const variants = {
    primary: "bg-primary text-background hover:shadow-[0_0_20px_rgba(0,229,255,0.5)]",
    secondary: "bg-secondary text-white hover:shadow-[0_0_20px_rgba(112,0,255,0.5)]",
    outline: "bg-transparent border border-white/20 text-white hover:bg-white/10",
    ghost: "bg-transparent text-white hover:bg-white/5",
    accent: "bg-accent text-white hover:shadow-[0_0_20px_rgba(255,0,122,0.5)]",
  };

  const sizes = {
    sm: "px-4 py-2 text-sm",
    md: "px-6 py-3 text-base",
    lg: "px-8 py-4 text-lg font-bold",
    xl: "px-10 py-5 text-xl font-bold tracking-wider",
  };

  return (
    <motion.button
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className={cn(
        "glass-button rounded-full flex items-center justify-center font-medium transition-all",
        variants[variant],
        sizes[size],
        className
      )}
      {...props}
    >
      {isLoading ? (
        <div className="w-5 h-5 border-2 border-current border-t-transparent rounded-full animate-spin" />
      ) : (
        children
      )}
    </motion.button>
  );
};

export default Button;
