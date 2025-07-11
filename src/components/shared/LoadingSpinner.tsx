"use client";

import { Loader2, Globe, Sparkles } from "lucide-react";

interface LoadingSpinnerProps {
  variant?: "default" | "branded" | "dots" | "pulse";
  size?: "sm" | "md" | "lg";
  text?: string;
  className?: string;
}

export default function LoadingSpinner({
  variant = "default",
  size = "md",
  text,
  className = "",
}: LoadingSpinnerProps) {
  const sizes = {
    sm: "w-4 h-4",
    md: "w-6 h-6",
    lg: "w-8 h-8",
  };

  const textSizes = {
    sm: "text-sm",
    md: "text-base",
    lg: "text-lg",
  };

  if (variant === "branded") {
    return (
      <div
        className={`flex flex-col items-center justify-center space-y-4 ${className}`}
      >
        <div className="relative">
          <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg animate-pulse">
            <Globe className="w-8 h-8 text-white animate-spin" />
          </div>
          <div className="absolute -top-2 -right-2 w-6 h-6 bg-gradient-to-r from-pink-500 to-orange-500 rounded-full flex items-center justify-center animate-bounce">
            <Sparkles className="w-3 h-3 text-white" />
          </div>
        </div>
        {text && (
          <p className={`text-gray-600 font-medium ${textSizes[size]}`}>
            {text}
          </p>
        )}
      </div>
    );
  }

  if (variant === "dots") {
    return (
      <div
        className={`flex flex-col items-center justify-center space-y-4 ${className}`}
      >
        <div className="flex space-x-2">
          <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce"></div>
          <div
            className="w-2 h-2 bg-purple-500 rounded-full animate-bounce"
            style={{ animationDelay: "0.1s" }}
          ></div>
          <div
            className="w-2 h-2 bg-pink-500 rounded-full animate-bounce"
            style={{ animationDelay: "0.2s" }}
          ></div>
        </div>
        {text && (
          <p className={`text-gray-600 font-medium ${textSizes[size]}`}>
            {text}
          </p>
        )}
      </div>
    );
  }

  if (variant === "pulse") {
    return (
      <div
        className={`flex flex-col items-center justify-center space-y-4 ${className}`}
      >
        <div className="relative">
          <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full opacity-75 animate-ping"></div>
          <div className="absolute inset-0 w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full animate-pulse"></div>
        </div>
        {text && (
          <p className={`text-gray-600 font-medium ${textSizes[size]}`}>
            {text}
          </p>
        )}
      </div>
    );
  }

  return (
    <div
      className={`flex flex-col items-center justify-center space-y-3 ${className}`}
    >
      <Loader2 className={`${sizes[size]} animate-spin text-blue-500`} />
      {text && (
        <p className={`text-gray-600 font-medium ${textSizes[size]}`}>{text}</p>
      )}
    </div>
  );
}
