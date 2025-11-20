"use client";

import { useState } from "react";
import { SurveyDefinition, SurveyResponses } from "../types";

interface JSONDisplayProps {
  surveyDefinition: SurveyDefinition;
  surveyResponses: SurveyResponses;
}

export default function JSONDisplay({
  surveyDefinition,
  surveyResponses,
}: JSONDisplayProps) {
  const [activeTab, setActiveTab] = useState<"definition" | "responses">(
    "definition"
  );
  const [copied, setCopied] = useState(false);

  // Transform the survey definition to match the expected JSON format
  const transformedDefinition = {
    title: surveyDefinition.title,
    description: surveyDefinition.description,
    questions: surveyDefinition.questions.map((q) => ({
      id: q.id,
      type: q.type === "multipleChoice" ? "multiple-choice" : q.type,
      question: q.label,
      required: q.required,
      ...(q.options &&
        q.options.length > 0 && {
          options: q.options.map((opt) => opt.text),
        }),
    })),
  };

  const currentJSON =
    activeTab === "definition" ? transformedDefinition : surveyResponses;

  const handleCopy = () => {
    navigator.clipboard.writeText(JSON.stringify(currentJSON, null, 2));
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6">
      <div className="mb-4 border-b border-gray-200">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-xl font-semibold text-gray-900">JSON Export</h2>
            <p className="text-sm text-gray-600 mt-1">
              Survey data in JSON format
            </p>
          </div>
          <button
            onClick={handleCopy}
            className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition-colors text-sm font-medium"
          >
            {copied ? "Copied!" : "Copy"}
          </button>
        </div>
        {/* Tabs */}
        <div className="flex gap-1">
          <button
            onClick={() => setActiveTab("definition")}
            className={`px-4 py-2 text-sm font-medium transition-colors rounded-t-lg ${
              activeTab === "definition"
                ? "text-blue-600 bg-white border-b-2 border-blue-600"
                : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
            }`}
          >
            Survey Definition
          </button>
          <button
            onClick={() => setActiveTab("responses")}
            className={`px-4 py-2 text-sm font-medium transition-colors rounded-t-lg ${
              activeTab === "responses"
                ? "text-blue-600 bg-white border-b-2 border-blue-600"
                : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
            }`}
          >
            Survey Responses
          </button>
        </div>
      </div>
      <div className="bg-gray-50 rounded-lg p-4">
        <pre className="text-xs text-gray-800 font-mono whitespace-pre-wrap wrap-break-word leading-relaxed">
          {JSON.stringify(currentJSON, null, 2)}
        </pre>
      </div>
    </div>
  );
}
