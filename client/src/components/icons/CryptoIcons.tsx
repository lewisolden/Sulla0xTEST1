import { motion } from "framer-motion";

interface IconProps {
  className?: string;
  size?: number;
  color?: string;
}

export const BlockchainIcon = ({ className = "", size = 24, color = "currentColor" }: IconProps) => {
  const blockVariants = {
    initial: { scale: 0.8, opacity: 0 },
    animate: { 
      scale: 1, 
      opacity: 1,
      transition: {
        duration: 0.5,
        ease: "easeOut"
      }
    }
  };

  const chainVariants = {
    initial: { pathLength: 0 },
    animate: { 
      pathLength: 1,
      transition: {
        duration: 1,
        ease: "easeInOut"
      }
    }
  };

  return (
    <motion.svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke={color}
      className={className}
      initial="initial"
      animate="animate"
    >
      <motion.rect x="4" y="4" width="6" height="6" rx="1" variants={blockVariants} />
      <motion.path d="M10 7h4" variants={chainVariants} />
      <motion.rect x="14" y="4" width="6" height="6" rx="1" variants={blockVariants} />
      <motion.path d="M7 10v4" variants={chainVariants} />
      <motion.rect x="4" y="14" width="6" height="6" rx="1" variants={blockVariants} />
      <motion.path d="M10 17h4" variants={chainVariants} />
      <motion.rect x="14" y="14" width="6" height="6" rx="1" variants={blockVariants} />
    </motion.svg>
  );
};

export const DecentralizationIcon = ({ className = "", size = 24, color = "currentColor" }: IconProps) => {
  const nodeVariants = {
    initial: { scale: 0, opacity: 0 },
    animate: (i: number) => ({
      scale: 1,
      opacity: 1,
      transition: {
        delay: i * 0.1,
        duration: 0.5,
        ease: "easeOut"
      }
    })
  };

  const lineVariants = {
    initial: { pathLength: 0 },
    animate: { 
      pathLength: 1,
      transition: {
        duration: 0.8,
        ease: "easeInOut",
        delay: 0.5
      }
    }
  };

  return (
    <motion.svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke={color}
      className={className}
      initial="initial"
      animate="animate"
    >
      <motion.circle cx="12" cy="12" r="3" variants={nodeVariants} custom={0} />
      <motion.circle cx="5" cy="12" r="2" variants={nodeVariants} custom={1} />
      <motion.circle cx="19" cy="12" r="2" variants={nodeVariants} custom={2} />
      <motion.circle cx="12" cy="5" r="2" variants={nodeVariants} custom={3} />
      <motion.circle cx="12" cy="19" r="2" variants={nodeVariants} custom={4} />
      <motion.path d="M7 12h3M14 12h3M12 7v3M12 14v3" variants={lineVariants} />
    </motion.svg>
  );
};

export const WalletIcon = ({ className = "", size = 24, color = "currentColor" }: IconProps) => {
  const walletVariants = {
    initial: { scale: 0.8, opacity: 0 },
    animate: { 
      scale: 1, 
      opacity: 1,
      transition: {
        duration: 0.5,
        ease: "easeOut"
      }
    }
  };

  const keyVariants = {
    initial: { rotate: -45, opacity: 0 },
    animate: { 
      rotate: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
        delay: 0.3,
        ease: "easeOut"
      }
    }
  };

  return (
    <motion.svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke={color}
      className={className}
      initial="initial"
      animate="animate"
    >
      <motion.path
        d="M20 6H4a2 2 0 00-2 2v8a2 2 0 002 2h16a2 2 0 002-2V8a2 2 0 00-2-2z"
        variants={walletVariants}
      />
      <motion.circle cx="16" cy="12" r="2" variants={keyVariants} />
    </motion.svg>
  );
};

export const SecurityIcon = ({ className = "", size = 24, color = "currentColor" }: IconProps) => {
  const shieldVariants = {
    initial: { scale: 0.8, opacity: 0 },
    animate: { 
      scale: 1, 
      opacity: 1,
      transition: {
        duration: 0.5,
        ease: "easeOut"
      }
    }
  };

  const checkVariants = {
    initial: { pathLength: 0 },
    animate: { 
      pathLength: 1,
      transition: {
        duration: 0.5,
        delay: 0.3,
        ease: "easeInOut"
      }
    }
  };

  return (
    <motion.svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke={color}
      className={className}
      initial="initial"
      animate="animate"
    >
      <motion.path
        d="M12 2L3 7v6a12 12 0 009 11.6A12 12 0 0021 13V7l-9-5z"
        variants={shieldVariants}
      />
      <motion.path d="M9 12l2 2 4-4" variants={checkVariants} />
    </motion.svg>
  );
};
