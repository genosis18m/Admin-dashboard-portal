"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, Package, Settings, HelpCircle, Sparkles } from "lucide-react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

const navigation = [
  { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { name: "Products", href: "/products", icon: Package },
  { name: "Settings", href: "/settings", icon: Settings },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <div className="flex h-screen w-64 flex-col bg-white border-r border-gray-100 shadow-xl">
      {/* Logo Area */}
      <div className="flex h-16 items-center gap-3 border-b border-gray-100 px-6">
        <motion.div
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ type: "spring", duration: 0.8 }}
          className="flex h-10 w-10 items-center justify-center rounded-xl gradient-purple shadow-premium"
        >
          <Sparkles className="h-5 w-5 text-white" />
        </motion.div>
        <div>
          <h1 className="text-xl font-bold text-gradient-purple">AdminHub</h1>
          <p className="text-xs text-gray-500">Pro Dashboard</p>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 space-y-2 p-4">
        {navigation.map((item, index) => {
          const isActive = pathname === item.href || pathname.startsWith(item.href + "/");
          const Icon = item.icon;

          return (
            <motion.div
              key={item.name}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Link
                href={item.href}
                className={cn(
                  "group relative flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition-all duration-200",
                  isActive
                    ? "text-white shadow-premium"
                    : "text-gray-700 hover:bg-purple-50 hover:text-purple-700"
                )}
              >
                {isActive && (
                  <motion.div
                    layoutId="activeTab"
                    className="absolute inset-0 rounded-xl gradient-purple"
                    transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                  />
                )}
                <Icon
                  className={cn(
                    "relative h-5 w-5 transition-transform group-hover:scale-110",
                    isActive ? "text-white" : "text-gray-500"
                  )}
                />
                <span className="relative">{item.name}</span>
                {isActive && (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="relative ml-auto h-2 w-2 rounded-full bg-white"
                  />
                )}
              </Link>
            </motion.div>
          );
        })}
      </nav>

      {/* Bottom Help Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="border-t border-gray-100 p-4"
      >
        <div className="rounded-xl bg-gradient-to-br from-purple-50 to-blue-50 p-4">
          <div className="mb-2 flex h-8 w-8 items-center justify-center rounded-lg gradient-purple">
            <HelpCircle className="h-4 w-4 text-white" />
          </div>
          <h3 className="mb-1 font-semibold text-gray-900">Need Help?</h3>
          <p className="mb-3 text-xs text-gray-600">
            Check our docs for guidance
          </p>
          <button className="w-full rounded-lg bg-white px-3 py-2 text-xs font-medium text-purple-700 shadow-sm hover:shadow-md transition-all">
            View Docs
          </button>
        </div>
      </motion.div>
    </div>
  );
}
