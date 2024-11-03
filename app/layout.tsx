"use client"

import React from "react";
import { Amplify } from "aws-amplify";
import { Authenticator } from "@aws-amplify/ui-react";
import "@aws-amplify/ui-react/styles.css";
import outputs from "@/amplify_outputs.json";
import "./globals.css";
import { ThemeProvider } from "./contexts/ThemeContext";
import { ThemeToggle } from "./components/ThemeToggle";

Amplify.configure(outputs);

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-white dark:bg-gray-900">
        <ThemeProvider>
          <Authenticator>
            {children}
          </Authenticator>
          <ThemeToggle />
        </ThemeProvider>
      </body>
    </html>
  )
}
