import { motion } from 'framer-motion';

/** Subtle one-time scroll reveal. Honours reduced motion via <MotionConfig reducedMotion="user">. */
export default function Reveal({ as = 'div', delay = 0, y = 18, className, children, ...rest }) {
  const Comp = motion[as] ?? motion.div;
  return (
    <Comp
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '0px 0px -12% 0px' }}
      transition={{ duration: 0.6, delay, ease: [0.2, 0.7, 0.2, 1] }}
      {...rest}
    >
      {children}
    </Comp>
  );
}
