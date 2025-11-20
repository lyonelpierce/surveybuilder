"use client";

import { useState } from "react";
import { Question, SurveyDefinition, SurveyResponses } from "../types";
import QuestionEditor from "./QuestionEditor";
import SurveyPreview from "./SurveyPreview";
import JSONDisplay from "./JSONDisplay";

export default function SurveyBuilder() {
  const [title, setTitle] = useState("Customer Feedback Survey");
  const [description, setDescription] = useState(
    "Help us improve by sharing your feedback"
  );
  const [questions, setQuestions] = useState<Question[]>([]);
  const [surveyResponses, setSurveyResponses] = useState<SurveyResponses>({});

  const handleAddQuestion = () => {
    const newQuestion: Question = {
      id: crypto.randomUUID(),
      label: "",
      type: "text",
      required: false,
    };
    setQuestions([...questions, newQuestion]);
  };

  const handleUpdateQuestion = (updatedQuestion: Question) => {
    setQuestions((prev) =>
      prev.map((q) => (q.id === updatedQuestion.id ? updatedQuestion : q))
    );
  };

  const handleDeleteQuestion = (questionId: string) => {
    setQuestions((prev) => prev.filter((q) => q.id !== questionId));
    // Also remove the response for this question
    setSurveyResponses((prev) => {
      const updated = { ...prev };
      delete updated[questionId];
      return updated;
    });
  };

  const handleResponsesChange = (responses: SurveyResponses) => {
    setSurveyResponses(responses);
  };

  const surveyDefinition: SurveyDefinition = {
    title,
    description,
    questions,
  };

  return (
    <>
      {/* Three Column Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Panel: Survey Builder */}
        <div className="lg:col-span-1 space-y-6">
          <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">
              Survey Details
            </h2>

            {/* Survey Details */}
            <div className="space-y-4 mb-6 pb-6 border-b border-gray-200">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Title
                </label>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Survey title"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg text-gray-900 placeholder:text-gray-400 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Description
                </label>
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Survey description"
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg text-gray-900 placeholder:text-gray-400 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                />
              </div>
            </div>

            {/* Questions Section */}
            <div>
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900">
                  Questions ({questions.length})
                </h3>
                <button
                  onClick={handleAddQuestion}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors text-sm font-medium"
                >
                  + Add
                </button>
              </div>
              {questions.length === 0 ? (
                <div className="text-center py-8 text-gray-500">
                  <p className="mb-4">No questions yet.</p>
                  <button
                    onClick={handleAddQuestion}
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors text-sm font-medium"
                  >
                    Add Your First Question
                  </button>
                </div>
              ) : (
                <div className="space-y-4">
                  {questions.map((question) => (
                    <QuestionEditor
                      key={question.id}
                      question={question}
                      onUpdate={handleUpdateQuestion}
                      onDelete={() => handleDeleteQuestion(question.id)}
                    />
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Middle Panel: Preview */}
        <div className="lg:col-span-1">
          <SurveyPreview
            title={title}
            description={description}
            questions={questions}
            onResponsesChange={handleResponsesChange}
          />
        </div>

        {/* Right Panel: JSON Export */}
        <div className="lg:col-span-1">
          <JSONDisplay
            surveyDefinition={surveyDefinition}
            surveyResponses={surveyResponses}
          />
        </div>
      </div>
    </>
  );
}
