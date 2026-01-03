"use client";

import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useEffect, useState } from "react";
import { Package, DollarSign, TrendingUp } from "lucide-react";

interface StatCardProps {
  title: string;
  value: string | number;
  description: string;
  icon: "Package" | "DollarSign" | "TrendingUp";
  gradient: string;
  delay: number;
}

const iconMap = {
  Package,
  DollarSign,
  TrendingUp,
};

export function StatCard({ title, value, description, icon, gradient, delay }: StatCardProps) {
  const [count, setCount] = useState(0);
  const numericValue = typeof value === 'string' ? parseFloat(value.replace(/[^0-9.]/g, '')) : value;
  const Icon = iconMap[icon];

  useEffect(() => {
    if (typeof numericValue === 'number' && !isNaN(numericValue)) {
      const duration = 2000;
      const steps = 60;
      const increment = numericValue / steps;
      let current = 0;

      const timer = setInterval(() => {
        current += increment;
        if (current >= numericValue) {
          setCount(numericValue);
          clearInterval(timer);
        } else {
          setCount(Math.floor(current));
        }
      }, duration / steps);

      return () => clearInterval(timer);
    }
  }, [numericValue]);

  const displayValue = typeof value === 'string' && value.includes('$') 
    ? `$${count.toFixed(2)}` 
    : count.toLocaleString();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.5 }}
      whileHover={{ y: -5, transition: { duration: 0.2 } }}
    >
      <Card className="relative overflow-hidden border-0 shadow-lg hover:shadow-xl transition-shadow duration-300">
        <div className={`absolute inset-0 bg-gradient-to-br ${gradient} opacity-5`} />
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium text-gray-600">
            {title}
          </CardTitle>
          <motion.div
            whileHover={{ scale: 1.1, rotate: 5 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <div className={`p-2 rounded-lg bg-gradient-to-br ${gradient}`}>
              <Icon className="h-4 w-4 text-white" />
            </div>
          </motion.div>
        </CardHeader>
        <CardContent>
          <div className="text-3xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent">
            {displayValue}
          </div>
          <p className="text-xs text-gray-500 mt-1">{description}</p>
        </CardContent>
      </Card>
    </motion.div>
  );
}
