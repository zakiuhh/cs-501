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

export function Footer({ transparent = false }: { transparent?: boolean }) {
  return (
    <footer className={`${transparent ? "bg-transparent border-t-0" : "bg-surface-soft border-t border-hairline"} text-muted overflow-hidden`}>
      <motion.div 
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.15 }}
        className="max-w-[1200px] mx-auto px-6 py-16 grid grid-cols-2 md:grid-cols-4 gap-8"
      >
        <motion.div variants={itemVariants} className="col-span-2 md:col-span-1">
          <div>
            <div className="flex items-center text-ink font-serif">
              <span className="spike text-primary" />
              <span className="text-lg font-medium">C++ Crashed</span>
            </div>
            <p className="mt-3 text-[13px] leading-relaxed">
              An interactive learning platform for CS501 - Programming Fundamentals in C++.
            </p>
          </div>
        </motion.div>

        <motion.div variants={itemVariants}>
          <div>
            <h4 className="text-ink text-[13px] font-medium mb-3 font-sans uppercase tracking-wider">Course</h4>
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
            <h4 className="text-ink text-[13px] font-medium mb-3 font-sans uppercase tracking-wider">Resources</h4>
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
            <h4 className="text-ink text-[13px] font-medium mb-3 font-sans uppercase tracking-wider">Team DevZee</h4>
            <ul className="space-y-2 text-[13px]">
              <li className="text-ink font-medium">Zaki Ul Hassan <span className="text-[10px] text-primary font-mono ml-1">TEAM LEADER</span></li>
              <li className="text-ink font-medium">Saad Qureshi <span className="text-[10px] text-primary font-mono ml-1">VIBE CODER</span></li>
              <li className="text-ink font-medium">Aliba Shakeel <span className="text-[10px] text-primary font-mono ml-1">VIBE CODER</span></li>
              <li className="text-ink font-medium">Anosha Shakeel <span className="text-[10px] text-primary font-mono ml-1">VIBE CODER</span></li>
            </ul>
          </div>
        </motion.div>
      </motion.div>
      
      <div className="border-t border-hairline">
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.6, duration: 0.5 }}
          className="max-w-[1200px] mx-auto px-6 py-5 text-[12px] flex justify-center text-center"
        >
          <span>© 2026 CS501 · C++ Crashed</span>
        </motion.div>
      </div>
    </footer>
  );
}
