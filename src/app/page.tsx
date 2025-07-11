"use client";

import { useState } from "react";
import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";
import HeroSection from "../components/sections/HeroSection";
import FeaturesSection from "../components/sections/FeatureSection";
import BlogUrlForm from "../components/forms/BlogUrlForm";
import SummaryCard from "../components/cards/SummaryCard";
import LoadingSpinner from "../components/shared/LoadingSpinner";

interface SummaryResponse {
  summary: string;
  translation: string;
  message: string;
}

export default function MainPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [summaryData, setSummaryData] = useState<SummaryResponse | null>(null);
  const [error, setError] = useState("");
  const [submittedUrl, setSubmittedUrl] = useState("");

  const handleBlogSubmit = async (url: string) => {
    setIsLoading(true);
    setError("");
    setSummaryData(null);
    setSubmittedUrl(url);

    try {
      // 1. Scrape the blog (mocked on your backend)
      const scrapeRes = await fetch("/api/scrape", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url }),
      });

      const scrapeData = await scrapeRes.json();
      if (!scrapeRes.ok) throw new Error(scrapeData.error || "Scraping failed");

      // 2. Get blogId
      const fetchBlogIdRes = await fetch("/api/fetch-latest-blog");
      const blogMeta = await fetchBlogIdRes.json();
      const blogId = blogMeta?.blogId;
      if (!blogId) throw new Error("Blog ID not found after scraping");

      // 3. Call summary+translate
      const summaryRes = await fetch("/api/summary", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ blogId }),
      });

      const result: SummaryResponse = await summaryRes.json();
      if (!summaryRes.ok) throw new Error(result.message || "Summary failed");

      setSummaryData(result);
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message || "Something went wrong.");
        console.error(err);
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Navbar />
      <main className="min-h-screen px-4 py-8 bg-gray-50 text-gray-900">
        <HeroSection />
        <FeaturesSection />
        <div id="summary-section" className="my-10 max-w-2xl mx-auto">
          <BlogUrlForm onSubmit={handleBlogSubmit} loading={isLoading} />
          {isLoading && <LoadingSpinner />}
          {error && <p className="text-red-600 mt-4">{error}</p>}
          {summaryData && (
            <SummaryCard
              data={{
                id: `summary-${Date.now()}`,
                url: submittedUrl,
                title: "Summarized Blog",
                summary: summaryData.summary,
                urduTranslation: summaryData.translation,
                createdAt: new Date().toISOString(),
                processingTime: 3.2,
                wordCount: summaryData.summary.split(" ").length,
              }}
            />
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}
