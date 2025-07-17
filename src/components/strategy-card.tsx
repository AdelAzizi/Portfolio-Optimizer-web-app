
"use client";

import { cn } from "@/lib/utils";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { StrategyInfo, LocalizedString } from "@/types"; // Import LocalizedString
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image"; // Import Image component

interface StrategyCardProps {
  strategy: StrategyInfo; // Use the updated StrategyInfo interface
  isSelected: boolean;
  onSelect: (id: string) => void;
  isHovered: boolean;
  isAnyCardSelected: boolean;
  onSubmit: (e: React.MouseEvent<HTMLButtonElement>) => void;
  currentLanguage: 'fa' | 'en'; // Add currentLanguage prop
  strategyColor: string; // اضافه کردن قابلیت دریافت رنگ استراتژی

}

const cardVariants = {
  initial: { // Removed hover scale
    scale: 1,
    boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)",
  },
  hover: {
    scale: 1.05,
    boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
  },
};

const contentVariants = {
  hidden: { opacity: 0, height: 0, y: -20 },
  visible: { opacity: 1, height: "auto", y: 0, transition: { staggerChildren: 0.1, delayChildren: 0.1 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 10 },
  visible: { opacity: 1, y: 0 },
};

const getLocalizedText = (text: LocalizedString, lang: 'fa' | 'en') => {
  if (!text) {
    return ''; // Return empty string for undefined or null text
  }
  // Ensure the requested language exists, fallback to 'en' or 'fa' if not
  if (!text[lang]) return text['en'] || text['fa'] || '';
  return text[lang];
};

export function StrategyCard({ strategy, isSelected, onSelect, isHovered, onSubmit, isAnyCardSelected, currentLanguage, strategyColor }: StrategyCardProps) {
  // Simplified showDetails logic: show details on hover or if selected
  const showDetails = isHovered || isSelected;

  // Assume 'font-playfair' is defined in tailwind.config.ts for headlines
  const headlineFontClass = 'font-playfair';

  return (
    <motion.div
      variants={cardVariants}
      animate={isHovered ? "hover" : "initial"}
      transition={{ duration: 0.3, ease: "easeInOut" }}
      onClick={() => onSelect(strategy.id)}
      className={cn(
        "cursor-pointer group text-right rounded-2xl overflow-hidden border-4 transition-colors duration-300 h-full flex flex-col",
        isSelected ? `border-accent` : "border-transparent",
        "bg-white dark:bg-gray-800"
      )}
      // Add direction based on language
      dir={currentLanguage === 'fa' ? 'rtl' : 'ltr'} // Set text direction
    >
      <Card
        className="w-full h-full flex flex-col justify-between border-none bg-transparent"
        style={{ '--strategy-color': strategy.color } as React.CSSProperties}
      >
        <CardHeader className="p-6">
          <div className={`flex items-start gap-4 ${currentLanguage === 'fa' ? 'flex-row-reverse' : 'flex-row'}`}>
            {/* Display Image instead of text icon */}
            <div className="w-16 h-16 relative">
              {/* Use next/image component */}
              {strategy.icon && ( // Check if icon path exists
                <Image
                  src={strategy.icon}
                  alt={getLocalizedText(strategy.name, currentLanguage)}
                  layout="fill"
                  objectFit="contain"
                  priority // Optional: Prioritize loading of these images
                />
              )}
            </div>
            <div className="flex-1">
              <CardTitle className={cn(headlineFontClass, "font-extrabold text-3xl text-gray-800 dark:text-white")}> {/* Applied headline font class */}
                {/* Use localized name */}

                {getLocalizedText(strategy.name, currentLanguage)}
              </CardTitle>
              <p className="text-gray-500 dark:text-gray-400 font-medium mt-1">
                {/* Use localized tagline */}
                {getLocalizedText(strategy.tagline, currentLanguage)}
              </p>
            </div>
          </div>
        </CardHeader>

        <CardContent className="p-6 pt-0 flex flex-col flex-grow">
          <motion.p
            className="text-gray-600 dark:text-gray-300 mb-6 text-base leading-relaxed"
            style={{ minHeight: '140px' }} // Keep a minimum height
          >
            {/* Use localized story */}
            {getLocalizedText(strategy.story, currentLanguage)}
          </motion.p>
          <AnimatePresence mode="wait">
            <motion.div
              key={showDetails ? "details" : "placeholder"}
              className="overflow-hidden"
              variants={contentVariants}
              initial="hidden"
              animate={showDetails ? "visible" : "hidden"}
              exit="hidden"
            >
              <motion.div variants={itemVariants}>
                <h4 className="font-bold text-lg text-gray-700 dark:text-gray-200 mb-4 text-left"> {/* Added text-left for LTR consistency */}
                  {/* Localize section title */}
                  {currentLanguage === 'fa' ? 'ترکیب فاکتورها' : 'Factor Composition'}
                </h4>
                {/* Ensure LTR for progress bars container */}
                <div className="space-y-4" dir="ltr">
                  {strategy.factors.map((factor) => (
                    // Use english name for key as it's likely stable across languages
                    <div key={getLocalizedText(factor.name, 'en')} className="w-full">
                      <div className="flex justify-between mb-1 text-sm font-semibold text-gray-600 dark:text-gray-300">
                        {/* Use localized factor name */}
                        <span>{getLocalizedText(factor.name, currentLanguage)}</span>
                        <span>{factor.value}%</span>
                      </div>
                      <Progress
                        value={factor.value}
                        className="h-2.5 bg-gray-200 dark:bg-gray-700"
                        // Use strategy color for the progress indicator
                        indicatorClassName="bg-[var(--strategy-color)]"
                      />
                    </div>
                  ))}
                </div>
              </motion.div>
            </motion.div>
          </AnimatePresence>
          {/* AnimatePresence for the button/CTA, ensure key changes */}
          <AnimatePresence mode="wait">
            <motion.div
              key={isSelected ? 'button' : 'cta'}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              className="mt-auto pt-8"
            >
              {isSelected ? (
                <Button
                  // onSubmit is now passed directly to the button's onClick
                  onClick={onSubmit}
                  size="lg"
                  className="w-full text-lg font-bold py-6 rounded-lg shadow-lg bg-accent hover:bg-accent/90 text-accent-foreground"
                >
                  {/* Localize button text */}
                  {currentLanguage === 'fa' ? 'ساخت سبد شخصی من' : 'Create My Portfolio'}
                </Button>
              ) : (
                <p className="text-sm font-semibold text-center text-white p-3 rounded-lg" style={{ backgroundColor: strategy.color }}>
                  {/* Use localized CTA */}
                  {getLocalizedText(strategy.final_cta, currentLanguage)}
                </p>
              )}
            </motion.div>
          </AnimatePresence>
        </CardContent>
      </Card>
    </motion.div>
  );
}
