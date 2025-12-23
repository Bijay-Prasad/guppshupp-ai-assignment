"use client";

import { motion, HTMLMotionProps } from "framer-motion";

interface FadeInProps extends HTMLMotionProps<"div"> {
  delay?: number;
}

export function FadeIn({ children, delay = 0, className, ...props }: FadeInProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay, ease: "easeOut" }}
      className={className}
      {...props}
    >
      {children}
    </motion.div>
  );
}

export function FadeInStagger({ children, delay = 0, className, ...props }: FadeInProps) {
    return (
      <motion.div
        initial="hidden"
        animate="visible"
        variants={{
            visible: { transition: { staggerChildren: 0.1, delayChildren: delay } },
            hidden: {},
        }}
        className={className}
        {...props}
      >
        {children}
      </motion.div>
    );
  }
  
  export function FadeInItem({ children, className, ...props }: HTMLMotionProps<"div">) {
      return (
          <motion.div
              variants={{
                  hidden: { opacity: 0, y: 20 },
                  visible: { opacity: 1, y: 0 },
              }}
              transition={{ duration: 0.5 }}
              className={className}
              {...props}
          >
              {children}
          </motion.div>
      )
  }
