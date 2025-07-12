"use client";

import { useState } from "react";
import {
  Zap,
  Globe,
  Shield,
  Clock,
  FileText,
  Languages,
  Database,
  Sparkles,
} from "lucide-react";

const features = [
  {
    icon: Zap,
    title: "Lightning Fast",
    description:
      "Get your blog summaries in under 5 seconds with our optimized AI pipeline",
    color: "from-yellow-400 to-orange-500",
    delay: 0,
  },
  {
    icon: Globe,
    title: "Smart Summarization",
    description:
      "Advanced AI extracts key points while maintaining context and meaning",
    color: "from-blue-500 to-purple-600",
    delay: 100,
  },
  {
    icon: Languages,
    title: "Urdu Translation",
    description:
      "Seamless translation to Urdu with cultural context preservation",
    color: "from-green-400 to-teal-500",
    delay: 200,
  },
  {
    icon: Shield,
    title: "Secure & Private",
    description: "Your data is encrypted and never shared with third parties",
    color: "from-purple-500 to-pink-600",
    delay: 300,
  },
  {
    icon: Database,
    title: "Cloud Storage",
    description:
      "Access your summaries anywhere with secure cloud synchronization",
    color: "from-indigo-500 to-blue-600",
    delay: 400,
  },
  {
    icon: FileText,
    title: "Multiple Formats",
    description: "Export summaries in various formats including TXT, and more",
    color: "from-rose-400 to-red-500",
    delay: 500,
  },
];

export default function FeaturesSection() {
  // const [hoveredFeature, setHoveredFeature] = useState<number | null>(null);

  return (
    <section id="features" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-blue-100 to-purple-100 rounded-full mb-6">
            <Sparkles className="w-4 h-4 text-blue-600 mr-2" />
            <span className="text-sm font-medium text-blue-700">
              Powerful Features
            </span>
          </div>
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Everything You Need for{" "}
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Smart Summarization
            </span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Our AI-powered platform combines cutting-edge technology with
            intuitive design to deliver the best blog summarization experience.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <div
                key={index}
                className={`group relative bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 cursor-pointer`}
                style={{ animationDelay: `${feature.delay}ms` }}
                // onMouseEnter={() => setHoveredFeature(index)}
                // onMouseLeave={() => setHoveredFeature(null)}
              >
                {/* Background Gradient */}
                <div
                  className={`absolute inset-0 bg-gradient-to-r ${feature.color} opacity-0 group-hover:opacity-5 rounded-2xl transition-opacity duration-300`}
                ></div>

                {/* Icon */}
                <div
                  className={`relative w-16 h-16 bg-gradient-to-r ${feature.color} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}
                >
                  <Icon className="w-8 h-8 text-white" />
                </div>

                {/* Content */}
                <div className="relative">
                  <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-gray-800 transition-colors">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed group-hover:text-gray-700 transition-colors">
                    {feature.description}
                  </p>
                </div>

                {/* Decorative Elements */}
                <div className="absolute -top-2 -right-2 w-4 h-4 bg-gradient-to-r from-pink-400 to-rose-500 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 animate-pulse"></div>
                <div className="absolute -bottom-2 -left-2 w-3 h-3 bg-gradient-to-r from-blue-400 to-purple-500 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 animate-pulse delay-150"></div>
              </div>
            );
          })}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-16">
          <div className="inline-flex items-center space-x-2 text-gray-600">
            <Clock className="w-5 h-5" />
            <span className="text-lg">
              Ready to transform your reading experience?
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
