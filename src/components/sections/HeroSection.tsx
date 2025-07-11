"use client";

import { useState, useEffect } from "react";
import { ArrowRight, Sparkles, Globe, Zap, Shield, Users } from "lucide-react";
import Button from "../shared/Button";

export default function HeroSection() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const scrollToForm = () => {
    const formElement = document.getElementById("blog-form");
    if (formElement) {
      formElement.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-gradient-to-r from-blue-400/30 to-purple-400/30 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute top-3/4 right-1/4 w-96 h-96 bg-gradient-to-r from-purple-400/20 to-pink-400/20 rounded-full blur-3xl animate-pulse delay-700"></div>
        <div className="absolute top-1/2 right-1/3 w-32 h-32 bg-gradient-to-r from-yellow-400/40 to-orange-400/40 rounded-full blur-2xl animate-bounce"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Column - Content */}
          <div
            className={`space-y-8 transition-all duration-1000 ${
              isVisible
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-8"
            }`}
          >
            <div className="space-y-6">
              <div className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-blue-100 to-purple-100 rounded-full">
                <Sparkles className="w-4 h-4 text-blue-600 mr-2" />
                <span className="text-sm font-medium text-blue-700">
                  AI-Powered Blog Summarization
                </span>
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">
                Transform{" "}
                <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  Long Blogs
                </span>{" "}
                into{" "}
                <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                  Quick Summaries
                </span>
              </h1>

              <p className="text-xl text-gray-600 max-w-lg">
                Get instant AI-powered summaries with seamless Urdu translation.
                Save time, understand better, and never miss important content
                again.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button
                variant="primary"
                size="lg"
                onClick={() => {
                  const section = document.getElementById("summary-section");
                  if (section) section.scrollIntoView({ behavior: "smooth" });
                }}
                rightIcon={<ArrowRight className="w-5 h-5" />}
                className="hover:scale-105 transition-transform"
              >
                Start Summarizing
              </Button>

              {/* <Button
                variant="outline"
                size="lg"
                onClick={() => window.open("#features", "_self")}
                className="hover:scale-105 transition-transform"
              >
                Learn More
              </Button> */}
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-6 pt-8 border-t border-gray-200">
              <div className="text-center">
                <div className="text-2xl font-bold text-gray-900">10k+</div>
                <div className="text-sm text-gray-600">Blogs Summarized</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-gray-900">5s</div>
                <div className="text-sm text-gray-600">Average Processing</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-gray-900">99%</div>
                <div className="text-sm text-gray-600">Accuracy Rate</div>
              </div>
            </div>
          </div>

          {/* Right Column - Visual Elements */}
          <div
            className={`relative transition-all duration-1000 delay-500 ${
              isVisible
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-8"
            }`}
          >
            <div className="relative">
              {/* Main Card */}
              <div className="bg-white rounded-2xl shadow-2xl p-8 transform rotate-3 hover:rotate-0 transition-transform duration-500">
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                        <Globe className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-900">
                          Blog Summary
                        </h3>
                        <p className="text-sm text-gray-500">AI Generated</p>
                      </div>
                    </div>
                    <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                  </div>

                  <div className="space-y-3">
                    <div className="h-4 bg-gradient-to-r from-gray-200 to-gray-100 rounded animate-pulse"></div>
                    <div className="h-4 bg-gradient-to-r from-gray-200 to-gray-100 rounded animate-pulse w-4/5"></div>
                    <div className="h-4 bg-gradient-to-r from-gray-200 to-gray-100 rounded animate-pulse w-3/5"></div>
                  </div>

                  <div className="border-t pt-4">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-500">
                        Urdu Translation
                      </span>
                      <span className="text-sm font-medium text-purple-600">
                        Ready
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Floating Icons */}
              <div className="absolute -top-4 -left-4 w-12 h-12 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full flex items-center justify-center shadow-lg animate-bounce">
                <Zap className="w-6 h-6 text-white" />
              </div>
              <div className="absolute -bottom-4 -right-4 w-12 h-12 bg-gradient-to-r from-green-400 to-teal-500 rounded-full flex items-center justify-center shadow-lg animate-bounce delay-300">
                <Shield className="w-6 h-6 text-white" />
              </div>
              <div className="absolute top-1/2 -right-8 w-10 h-10 bg-gradient-to-r from-pink-400 to-rose-500 rounded-full flex items-center justify-center shadow-lg animate-bounce delay-500">
                <Users className="w-5 h-5 text-white" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-gray-400 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-gray-400 rounded-full mt-2 animate-pulse"></div>
        </div>
      </div>
    </section>
  );
}
