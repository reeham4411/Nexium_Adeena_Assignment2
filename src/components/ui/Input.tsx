"use client";

import { InputHTMLAttributes, ReactNode, forwardRef } from "react";
import { AlertCircle, CheckCircle } from "lucide-react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  success?: string;
  helperText?: string;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
  variant?: "default" | "filled" | "outlined";
  inputSize?: "sm" | "md" | "lg";
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      label,
      error,
      success,
      helperText,
      leftIcon,
      rightIcon,
      variant = "default",
      inputSize = "md",
      className = "",
      ...props
    },
    ref
  ) => {
    const baseStyles =
      "w-full font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-1 disabled:opacity-50 disabled:cursor-not-allowed";

    const variants = {
      default:
        "border-2 border-gray-200 bg-white focus:border-blue-500 focus:ring-blue-500/20 hover:border-gray-300",
      filled:
        "border-0 bg-gray-50 focus:bg-white focus:ring-blue-500/20 hover:bg-gray-100",
      outlined:
        "border-2 border-gray-300 bg-transparent focus:border-blue-500 focus:ring-blue-500/20 hover:border-gray-400",
    };

    const sizes = {
      sm: "px-3 py-2 text-sm rounded-lg",
      md: "px-4 py-3 text-base rounded-lg",
      lg: "px-5 py-4 text-lg rounded-xl",
    };

    const getInputStyles = () => {
      let styles = `${baseStyles} ${variants[variant]} ${sizes[inputSize]}`;

      if (error) {
        styles += " border-red-500 focus:border-red-500 focus:ring-red-500/20";
      } else if (success) {
        styles +=
          " border-green-500 focus:border-green-500 focus:ring-green-500/20";
      }

      if (leftIcon) {
        styles += " pl-10";
      }

      if (rightIcon || error || success) {
        styles += " pr-10";
      }

      return styles;
    };

    return (
      <div className="w-full">
        {label && (
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            {label}
            {props.required && <span className="text-red-500 ml-1">*</span>}
          </label>
        )}

        <div className="relative">
          {leftIcon && (
            <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
              {leftIcon}
            </div>
          )}

          <input
            ref={ref}
            className={`${getInputStyles()} ${className}`}
            {...props}
          />

          {(rightIcon || error || success) && (
            <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
              {error && <AlertCircle className="w-5 h-5 text-red-500" />}
              {success && <CheckCircle className="w-5 h-5 text-green-500" />}
              {!error && !success && rightIcon && (
                <span className="text-gray-400">{rightIcon}</span>
              )}
            </div>
          )}
        </div>

        {(error || success || helperText) && (
          <div className="mt-2 flex items-center">
            {error && (
              <p className="text-sm text-red-600 flex items-center">
                <AlertCircle className="w-4 h-4 mr-1" />
                {error}
              </p>
            )}
            {success && !error && (
              <p className="text-sm text-green-600 flex items-center">
                <CheckCircle className="w-4 h-4 mr-1" />
                {success}
              </p>
            )}
            {helperText && !error && !success && (
              <p className="text-sm text-gray-500">{helperText}</p>
            )}
          </div>
        )}
      </div>
    );
  }
);

Input.displayName = "Input";

export default Input;
