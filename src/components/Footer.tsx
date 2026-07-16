import { Link } from "@tanstack/react-router";
import { motion } from "framer-motion";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.05,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: "spring",
      stiffness: 70,
      damping: 14,
    },
  },
};

export function Footer() {
  return (
    <footer className="bg-surface-dark text-on-dark-soft overflow-hidden">
      <motion.div 
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.15 }}
        className="max-w-[1200px] mx-auto px-6 py-16 grid grid-cols-2 md:grid-cols-4 gap-8"
      >
        <motion.div variants={itemVariants} className="col-span-2 md:col-span-1">
          <div>
            <div className="flex items-center text-on-dark">
              <span className="spike" />
              <span className="font-serif text-lg">C++ Crashed</span>
            </div>
            <p className="mt-3 text-[13px] leading-relaxed">
              An interactive learning platform for CS501 - Programming Fundamentals in C++.
            </p>
          </div>
        </motion.div>

        <motion.div variants={itemVariants}>
          <div>
            <h4 className="text-on-dark text-[13px] font-medium mb-3 font-sans">Course</h4>
            <ul className="space-y-2 text-[13px]">
              <li><Link to="/lectures" className="hover:text-primary transition-colors">Lectures</Link></li>
              <li><Link to="/practice" className="hover:text-primary transition-colors">Practice</Link></li>
              <li><Link to="/syllabus" className="hover:text-primary transition-colors">Syllabus</Link></li>
              <li><Link to="/playground" className="hover:text-primary transition-colors">Playground</Link></li>
              <li><Link to="/faq" className="hover:text-primary transition-colors">FAQ</Link></li>
              <li><Link to="/about" className="hover:text-primary transition-colors">About</Link></li>
            </ul>
          </div>
        </motion.div>

        <motion.div variants={itemVariants}>
          <div>
            <h4 className="text-on-dark text-[13px] font-medium mb-3 font-sans">Resources</h4>
            <ul className="space-y-2 text-[13px]">
              <li>
                <a className="hover:text-primary transition-colors" href="https://cppreference.com" target="_blank" rel="noreferrer">
                  cppreference.com
                </a>
              </li>
              <li>
                <a className="hover:text-primary transition-colors" href="https://isocpp.org" target="_blank" rel="noreferrer">
                  ISO C++
                </a>
              </li>
              <li>
                <a className="hover:text-primary transition-colors" href="https://godbolt.org" target="_blank" rel="noreferrer">
                  Compiler Explorer
                </a>
              </li>
            </ul>
          </div>
        </motion.div>

        <motion.div variants={itemVariants}>
          <div>
            <h4 className="text-on-dark text-[13px] font-medium mb-3 font-sans">Team DevZee</h4>
            <ul className="space-y-2 text-[13px]">
              <li className="text-on-dark font-medium">Zaki Ul Hassan <span className="text-[10px] text-primary/85 font-mono ml-1">LEAD</span></li>
              <li className="text-on-dark font-medium">Saad Qureshi <span className="text-[10px] text-primary/85 font-mono ml-1">VIBE</span></li>
              <li className="text-on-dark font-medium">Aliba Shakeel <span className="text-[10px] text-primary/85 font-mono ml-1">VIBE</span></li>
              <li className="text-on-dark font-medium">Anosha Shakeel <span className="text-[10px] text-primary/85 font-mono ml-1">VIBE</span></li>
            </ul>
          </div>
        </motion.div>
      </motion.div>
      
      <div className="border-t border-[#2a2825]">
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.6, duration: 0.5 }}
          className="max-w-[1200px] mx-auto px-6 py-5 text-[12px] flex justify-between"
        >
          <span>© 2026 CS501 · C++ Crashed</span>
          <span>Styling Inspired by Claude</span>
        </motion.div>
      </div>
    </footer>
  );
}
