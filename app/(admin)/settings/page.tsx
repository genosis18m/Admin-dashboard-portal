"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Moon, Sun, Bell, Palette } from "lucide-react";
import { motion } from "framer-motion";
import { useTheme } from "@/components/theme-provider";
import { useState } from "react";

export default function SettingsPage() {
  const { theme, setTheme } = useTheme();
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [pushNotifications, setPushNotifications] = useState(false);

  return (
    <div className="min-h-screen p-6 md:p-10 page-transition max-w-7xl mx-auto">
      {/* Header */}
      <div className="mb-10">
        <h1 className="text-4xl md:text-5xl font-bold text-gradient-teal mb-3">Settings</h1>
        <p className="text-muted-foreground text-lg">Customize your dashboard experience</p>
      </div>

      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {/* Appearance Settings */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0, duration: 0.4 }}
          className="lg:col-span-2"
        >
          <Card className="border-0 shadow-premium bg-card h-full">
            <CardHeader>
              <div className="flex items-center gap-4">
                <div className="h-14 w-14 rounded-2xl gradient-teal flex items-center justify-center shadow-lg">
                  <Palette className="h-7 w-7 text-white" />
                </div>
                <div>
                  <CardTitle className="text-2xl">Appearance</CardTitle>
                  <CardDescription className="text-base">Choose your preferred theme mode</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <Label className="text-sm font-semibold mb-5 block text-foreground/80">
                  Theme Mode
                </Label>
                <div className="grid grid-cols-2 gap-6">
                  <motion.button
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    onClick={() => setTheme("light")}
                    className={`flex flex-col items-center gap-4 p-8 rounded-2xl border-2 transition-all ${
                      theme === "light"
                        ? "border-teal-500 bg-gradient-to-br from-teal-50 to-cyan-50 dark:from-teal-950/30 dark:to-cyan-950/30 shadow-xl"
                        : "border-border hover:border-teal-300 dark:hover:border-teal-700 bg-muted/30"
                    }`}
                  >
                    <div className={`p-4 rounded-2xl ${theme === "light" ? "gradient-teal shadow-lg" : "bg-muted"}`}>
                      <Sun className={`h-8 w-8 ${theme === "light" ? "text-white" : "text-muted-foreground"}`} />
                    </div>
                    <div className="text-center">
                      <span className={`block text-base font-semibold ${theme === "light" ? "text-teal-700 dark:text-teal-400" : "text-foreground"}`}>
                        Light Mode
                      </span>
                      <span className="text-xs text-muted-foreground mt-1 block">
                        Bright and clean
                      </span>
                    </div>
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    onClick={() => setTheme("dark")}
                    className={`flex flex-col items-center gap-4 p-8 rounded-2xl border-2 transition-all ${
                      theme === "dark"
                        ? "border-teal-500 bg-gradient-to-br from-teal-50 to-cyan-50 dark:from-teal-950/30 dark:to-cyan-950/30 shadow-xl"
                        : "border-border hover:border-teal-300 dark:hover:border-teal-700 bg-muted/30"
                    }`}
                  >
                    <div className={`p-4 rounded-2xl ${theme === "dark" ? "gradient-teal shadow-lg" : "bg-muted"}`}>
                      <Moon className={`h-8 w-8 ${theme === "dark" ? "text-white" : "text-muted-foreground"}`} />
                    </div>
                    <div className="text-center">
                      <span className={`block text-base font-semibold ${theme === "dark" ? "text-teal-700 dark:text-teal-400" : "text-foreground"}`}>
                        Dark Mode
                      </span>
                      <span className="text-xs text-muted-foreground mt-1 block">
                        Easy on the eyes
                      </span>
                    </div>
                  </motion.button>
                </div>
              </div>
              <div className="pt-2 px-4 py-3 rounded-xl bg-muted/50 border border-border/50">
                <p className="text-sm text-muted-foreground">
                  💡 Your theme preference will be saved automatically and applied across all sessions
                </p>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Notifications Settings */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.4 }}
        >
          <Card className="border-0 shadow-premium bg-card h-full">
            <CardHeader>
              <div className="flex items-center gap-4">
                <div className="h-14 w-14 rounded-2xl gradient-orange flex items-center justify-center shadow-lg">
                  <Bell className="h-7 w-7 text-white" />
                </div>
                <div>
                  <CardTitle className="text-2xl">Notifications</CardTitle>
                  <CardDescription className="text-base">Manage alerts</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between p-4 rounded-xl bg-muted/50 border border-border/50">
                <div className="flex-1 pr-4">
                  <p className="font-semibold text-foreground">Email Updates</p>
                  <p className="text-sm text-muted-foreground mt-0.5">Product & inventory alerts</p>
                </div>
                <motion.button
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setEmailNotifications(!emailNotifications)}
                  className={`relative inline-flex h-7 w-12 items-center rounded-full transition-all ${
                    emailNotifications ? "gradient-teal shadow-lg" : "bg-muted-foreground/30"
                  }`}
                >
                  <motion.span
                    layout
                    className="inline-block h-5 w-5 transform rounded-full bg-white shadow-md"
                    style={{
                      x: emailNotifications ? 24 : 4,
                    }}
                    transition={{ type: "spring", stiffness: 500, damping: 30 }}
                  />
                </motion.button>
              </div>
              <div className="flex items-center justify-between p-4 rounded-xl bg-muted/50 border border-border/50">
                <div className="flex-1 pr-4">
                  <p className="font-semibold text-foreground">Push Alerts</p>
                  <p className="text-sm text-muted-foreground mt-0.5">Instant notifications</p>
                </div>
                <motion.button
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setPushNotifications(!pushNotifications)}
                  className={`relative inline-flex h-7 w-12 items-center rounded-full transition-all ${
                    pushNotifications ? "gradient-teal shadow-lg" : "bg-muted-foreground/30"
                  }`}
                >
                  <motion.span
                    layout
                    className="inline-block h-5 w-5 transform rounded-full bg-white shadow-md"
                    style={{
                      x: pushNotifications ? 24 : 4,
                    }}
                    transition={{ type: "spring", stiffness: 500, damping: 30 }}
                  />
                </motion.button>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}
