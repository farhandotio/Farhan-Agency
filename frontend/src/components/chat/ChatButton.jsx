import React, { useRef } from "react";
import { motion } from "framer-motion";
import { TbMessageCircleFilled } from "react-icons/tb";

const ChatButton = () => {
  const ref = useRef(null);

  return (
    <div
      ref={ref}
      className="fixed flex justify-end items-end rounded-full bottom-5 right-5 sm:bottom-7 sm:right-7 md:bottom-10 md:right-10 z-100000000"
    >
      <motion.button
        drag
        dragConstraints={ref}
        whileDrag={{ scale: 1.2 }}
        className="relative cursor-pointer rounded-full"
      >
        <TbMessageCircleFilled  className="size-18 text-primary" />
      </motion.button>
    </div>
  );
};

export default ChatButton;
