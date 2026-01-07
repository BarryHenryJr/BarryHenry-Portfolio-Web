"use client";

import React from "react";
import { motion, Variants } from "framer-motion";

interface AnimatedGridProps {
  children: React.ReactNode;
}

export function AnimatedGrid({ children }: AnimatedGridProps) {
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
    },
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3"
    >
      {React.Children.map(children, (child, index) => (
        <motion.div
          key={React.isValidElement(child) ? child.key ?? index : index}
          variants={itemVariants}
          transition={{ duration: 0.3, ease: "easeOut" }}
        >
          {child}
        </motion.div>
      ))}
    </motion.div>
  );
}
