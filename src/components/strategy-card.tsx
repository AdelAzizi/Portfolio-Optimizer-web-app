
"use client";

import { cn } from "@/lib/utils";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { StrategyInfo } from "@/types";
import { motion, AnimatePresence } from "framer-motion";

interface StrategyCardProps {
  strategy: StrategyInfo;
  isSelected: boolean;
  onSelect: (id: string) => void;
  isHovered: boolean;
}

const cardVariants = {
  initial: {
    scale: 1,
    boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)",
  },
  hover: {
    scale: 1.05,
    boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
  },
};

const contentVariants = {
  hidden: { opacity: 0, height: 0, y: 20 },
  visible: { opacity: 1, height: "auto", y: 0, transition: { staggerChildren: 0.1 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 10 },
  visible: { opacity: 1, y: 0 },
};

export function StrategyCard({ strategy, isSelected, onSelect, isHovered }: StrategyCardProps) {
  return (
    <motion.div
      variants={cardVariants}
      animate={isHovered ? "hover" : "initial"}
      transition={{ duration: 0.3, ease: "easeInOut" }}
      onClick={() => onSelect(strategy.id)}
      className={cn(
        "cursor-pointer group text-right rounded-2xl overflow-hidden border-4",
        isSelected
          ? `border-blue-500`
          : "border-transparent",
        "bg-white dark:bg-gray-800"
      )}
    >
      <Card
        className="w-full h-full flex flex-col justify-between border-none bg-transparent"
        style={{ '--strategy-color': strategy.color } as React.CSSProperties}
      >
        <CardHeader className="p-6">
            <div className="flex items-start gap-4">
                 <div className="text-6xl">{strategy.icon}</div>
                 <div className="flex-1">
                    <CardTitle className="font-extrabold text-3xl text-gray-800 dark:text-white">
                        {strategy.name}
                    </CardTitle>
                    <p className="text-gray-500 dark:text-gray-400 font-medium mt-1">
                        {strategy.tagline}
                    </p>
                 </div>
            </div>
        </CardHeader>

        <CardContent className="p-6 pt-0">
          <motion.p className="text-gray-600 dark:text-gray-300 mb-6 text-base leading-relaxed min-h-[9rem]">
              {strategy.story}
          </motion.p>
          <AnimatePresence>
            {isHovered && (
                <motion.div
                    key="factors"
                    className="overflow-hidden"
                    variants={contentVariants}
                    initial="hidden"
                    animate="visible"
                    exit="hidden"
                >
                    <motion.div variants={itemVariants}>
                    <h4 className="font-bold text-lg text-gray-700 dark:text-gray-200 mb-4">ترکیب فاکتورها</h4>
                    <div className="space-y-4 text-right">
                        {strategy.factors.map((factor) => (
                        <div key={factor.name} className="w-full">
                            <div className="flex justify-between mb-1 text-sm font-semibold text-gray-600 dark:text-gray-300">
                            <span>{factor.name}</span>
                            <span>{factor.value}%</span>
                            </div>
                            <Progress
                            value={factor.value}
                            className="h-2.5 bg-gray-200 dark:bg-gray-700"
                            indicatorClassName="bg-[var(--strategy-color)]"
                            />
                        </div>
                        ))}
                    </div>
                    </motion.div>
    
                    <motion.p variants={itemVariants} className="mt-8 text-sm font-semibold text-center text-white p-3 rounded-lg" style={{backgroundColor: strategy.color}}>
                    {strategy.final_cta}
                    </motion.p>
                </motion.div>
            )}
          </AnimatePresence>
        </CardContent>
      </Card>
    </motion.div>
  );
}
