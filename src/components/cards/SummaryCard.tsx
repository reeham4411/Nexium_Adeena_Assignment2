"use client";

import { useState } from "react";
import {
  FileText,
  Globe,
  Copy,
  Download,
  Share2,
  ExternalLink,
  CheckCircle,
  Languages,
  Calendar,
  Clock,
  Bookmark,
} from "lucide-react";
import Button from "../shared/Button";

interface SummaryData {
  id: string;
  url: string;
  title?: string;
  summary: string;
  urduTranslation: string;
  createdAt: string;
  processingTime?: number;
  wordCount?: number;
  originalWordCount?: number;
}

interface SummaryCardProps {
  data: SummaryData;
  onSave?: (id: string) => void;
  onShare?: (id: string) => void;
  className?: string;
}

export default function SummaryCard({
  data,
  onSave,
  onShare,
  className = "",
}: SummaryCardProps) {
  const [copiedField, setCopiedField] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<"summary" | "translation">(
    "summary"
  );

  const copyToClipboard = async (text: string, field: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedField(field);
      setTimeout(() => setCopiedField(null), 2000);
    } catch (err) {
      console.error("Failed to copy text: ", err);
    }
  };

  const downloadAsText = () => {
    const content = `
Blog Summary
============
URL: ${data.url}
Date: ${new Date(data.createdAt).toLocaleDateString()}

English Summary:
${data.summary}

Urdu Translation:
${data.urduTranslation}
    `.trim();

    const blob = new Blob([content], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `blog-summary-${data.id}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const getReductionPercentage = () => {
    if (!data.originalWordCount || !data.wordCount) return null;
    const reduction =
      ((data.originalWordCount - data.wordCount) / data.originalWordCount) *
      100;
    return Math.round(reduction);
  };

  return (
    <div
      className={`max-w-4xl mx-auto bg-white rounded-2xl shadow-xl border border-gray-200 overflow-hidden ${className}`}
    >
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-500 to-purple-600 p-6 text-white">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <h2 className="text-2xl font-bold mb-2">
              {data.title || "Blog Summary"}
            </h2>
            <div className="flex items-center space-x-4 text-blue-100">
              <a
                href={data.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center hover:text-white transition-colors"
              >
                <ExternalLink className="w-4 h-4 mr-1" />
                <span className="text-sm truncate max-w-xs">{data.url}</span>
              </a>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onSave?.(data.id)}
              className="text-white hover:bg-white/20"
              leftIcon={<Bookmark className="w-4 h-4" />}
            >
              Save
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onShare?.(data.id)}
              className="text-white hover:bg-white/20"
              leftIcon={<Share2 className="w-4 h-4" />}
            >
              Share
            </Button>
          </div>
        </div>
      </div>

      {/* Stats Bar */}
      <div className="bg-gray-50 px-6 py-4 border-b border-gray-200">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center space-x-6">
            <div className="flex items-center text-sm text-gray-600">
              <Calendar className="w-4 h-4 mr-1" />
              {formatDate(data.createdAt)}
            </div>
            {data.processingTime && (
              <div className="flex items-center text-sm text-gray-600">
                <Clock className="w-4 h-4 mr-1" />
                {data.processingTime}s processing time
              </div>
            )}
          </div>
          <div className="flex items-center space-x-6">
            {data.wordCount && (
              <div className="text-sm text-gray-600">
                <span className="font-medium">{data.wordCount}</span> words
              </div>
            )}
            {getReductionPercentage() && (
              <div className="text-sm text-green-600 font-medium">
                {getReductionPercentage()}% reduction
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="border-b border-gray-200">
        <nav className="flex">
          <button
            onClick={() => setActiveTab("summary")}
            className={`flex-1 py-4 px-6 text-sm font-medium transition-colors ${
              activeTab === "summary"
                ? "text-blue-600 border-b-2 border-blue-600 bg-blue-50"
                : "text-gray-500 hover:text-gray-700"
            }`}
          >
            <FileText className="w-4 h-4 inline mr-2" />
            English Summary
          </button>
          <button
            onClick={() => setActiveTab("translation")}
            className={`flex-1 py-4 px-6 text-sm font-medium transition-colors ${
              activeTab === "translation"
                ? "text-blue-600 border-b-2 border-blue-600 bg-blue-50"
                : "text-gray-500 hover:text-gray-700"
            }`}
          >
            <Languages className="w-4 h-4 inline mr-2" />
            Urdu Translation
          </button>
        </nav>
      </div>

      {/* Content */}
      <div className="p-6">
        {activeTab === "summary" ? (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-gray-900 flex items-center">
                <FileText className="w-5 h-5 mr-2 text-blue-500" />
                Summary
              </h3>
              <Button
                variant="outline"
                size="sm"
                onClick={() => copyToClipboard(data.summary, "summary")}
                leftIcon={
                  copiedField === "summary" ? (
                    <CheckCircle className="w-4 h-4 text-green-500" />
                  ) : (
                    <Copy className="w-4 h-4" />
                  )
                }
              >
                {copiedField === "summary" ? "Copied!" : "Copy"}
              </Button>
            </div>
            <div className="prose prose-gray max-w-none">
              <p className="text-gray-700 leading-relaxed text-lg">
                {data.summary}
              </p>
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-gray-900 flex items-center">
                <Globe className="w-5 h-5 mr-2 text-purple-500" />
                اردو ترجمہ
              </h3>
              <Button
                variant="outline"
                size="sm"
                onClick={() =>
                  copyToClipboard(data.urduTranslation, "translation")
                }
                leftIcon={
                  copiedField === "translation" ? (
                    <CheckCircle className="w-4 h-4 text-green-500" />
                  ) : (
                    <Copy className="w-4 h-4" />
                  )
                }
              >
                {copiedField === "translation" ? "Copied!" : "Copy"}
              </Button>
            </div>
            <div className="prose prose-gray max-w-none">
              <p
                className="text-gray-700 leading-relaxed text-lg text-right"
                dir="rtl"
              >
                {data.urduTranslation}
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Actions */}
      <div className="bg-gray-50 px-6 py-4 border-t border-gray-200">
        <div className="flex flex-wrap gap-3 justify-between">
          <div className="flex gap-3">
            <Button
              variant="outline"
              size="sm"
              onClick={downloadAsText}
              leftIcon={<Download className="w-4 h-4" />}
            >
              Download
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() =>
                copyToClipboard(
                  `${data.summary}\n\n${data.urduTranslation}`,
                  "both"
                )
              }
              leftIcon={
                copiedField === "both" ? (
                  <CheckCircle className="w-4 h-4 text-green-500" />
                ) : (
                  <Copy className="w-4 h-4" />
                )
              }
            >
              {copiedField === "both" ? "Copied Both!" : "Copy Both"}
            </Button>
          </div>
          <div className="flex gap-3">
            <Button
              variant="secondary"
              size="sm"
              onClick={() => onSave?.(data.id)}
              leftIcon={<Bookmark className="w-4 h-4" />}
            >
              Save for Later
            </Button>
            <Button
              variant="primary"
              size="sm"
              onClick={() => onShare?.(data.id)}
              leftIcon={<Share2 className="w-4 h-4" />}
            >
              Share Summary
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
