"use client";

import { useState } from "react";
import { Globe, Sparkles, Link2, Send } from "lucide-react";
import Input from "../ui/Input";
import Button from "../shared/Button";
import LoadingSpinner from "../shared/LoadingSpinner";

interface BlogUrlFormProps {
  onSubmit: (url: string) => void;
  loading?: boolean;
}

export default function BlogUrlForm({
  onSubmit,
  loading = false,
}: BlogUrlFormProps) {
  const [url, setUrl] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const validateUrl = (url: string) => {
    const urlPattern =
      /^https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)$/;
    return urlPattern.test(url);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!url.trim()) {
      setError("Please enter a blog URL");
      return;
    }

    if (!validateUrl(url)) {
      setError(
        "Please enter a valid URL (must start with http:// or https://)"
      );
      return;
    }

    setSuccess("Valid URL detected!");
    onSubmit(url);
  };

  const handleUrlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newUrl = e.target.value;
    setUrl(newUrl);
    setError("");
    setSuccess("");

    if (newUrl && validateUrl(newUrl)) {
      setSuccess("Valid URL format");
    }
  };

  return (
    <div className="max-w-2xl mx-auto">
      {/* Header */}
      <div id="blog-form" className="text-center mb-8">
        <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl shadow-lg mb-4">
          <Globe className="w-10 h-10 text-white" />
        </div>
        <h2 className="text-3xl font-bold text-gray-900 mb-2">
          Transform Your Blog
        </h2>
        <p className="text-gray-600 text-lg">
          Enter a blog URL to get an AI-powered summary with Urdu translation
        </p>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="relative">
          <Input
            type="url"
            placeholder="https://example.com/blog-post"
            value={url}
            onChange={handleUrlChange}
            error={error}
            success={success}
            leftIcon={<Link2 className="w-5 h-5" />}
            inputSize="lg"
            variant="outlined"
            disabled={loading}
            className="text-center sm:text-left"
          />
        </div>

        <Button
          type="submit"
          variant="primary"
          size="lg"
          loading={loading}
          disabled={!url.trim() || !!error}
          rightIcon={<Send className="w-5 h-5" />}
          className="w-full"
        >
          {loading ? "Processing..." : "Summarize & Translate"}
        </Button>
      </form>

      {/* Loading State */}
      {loading && (
        <div className="mt-8 p-6 bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl border border-blue-200">
          <LoadingSpinner
            variant="branded"
            text="Analyzing your blog post..."
            size="md"
          />
          <div className="mt-4 space-y-2">
            <div className="flex items-center text-sm text-gray-600">
              <div className="w-2 h-2 bg-blue-500 rounded-full mr-2 animate-pulse"></div>
              Fetching content...
            </div>
            <div className="flex items-center text-sm text-gray-600">
              <div className="w-2 h-2 bg-purple-500 rounded-full mr-2 animate-pulse"></div>
              Generating summary...
            </div>
            <div className="flex items-center text-sm text-gray-600">
              <div className="w-2 h-2 bg-pink-500 rounded-full mr-2 animate-pulse"></div>
              Translating to Urdu...
            </div>
          </div>
        </div>
      )}

      {/* Examples */}
      <div className="mt-8 p-6 bg-gray-50 rounded-xl">
        <h3 className="font-semibold text-gray-900 mb-3 flex items-center">
          <Sparkles className="w-5 h-5 mr-2 text-yellow-500" />
          Try these examples:
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <button
            type="button"
            onClick={() => setUrl("https://medium.com/@example/article")}
            className="p-3 bg-white rounded-lg border border-gray-200 hover:border-blue-300 hover:shadow-md transition-all text-left"
            disabled={loading}
          >
            <div className="font-medium text-gray-900">Medium Article</div>
            <div className="text-sm text-gray-500">
              medium.com/@example/article
            </div>
          </button>
          <button
            type="button"
            onClick={() => setUrl("https://dev.to/example/post")}
            className="p-3 bg-white rounded-lg border border-gray-200 hover:border-blue-300 hover:shadow-md transition-all text-left"
            disabled={loading}
          >
            <div className="font-medium text-gray-900">Dev.to Post</div>
            <div className="text-sm text-gray-500">dev.to/example/post</div>
          </button>
        </div>
      </div>
    </div>
  );
}
