"use client";

import { Question, SurveyResponses } from "../types";
import { useState, useEffect } from "react";

interface SurveyPreviewProps {
  title: string;
  description: string;
  questions: Question[];
  onResponsesChange: (responses: SurveyResponses) => void;
}

export default function SurveyPreview({
  title,
  description,
  questions,
  onResponsesChange,
}: SurveyPreviewProps) {
  const [responses, setResponses] = useState<SurveyResponses>({});

  useEffect(() => {
    // Initialize responses for all questions
    setResponses((prev) => {
      const updated: SurveyResponses = {};
      questions.forEach((question) => {
        const prevResponse = prev[question.id];
        if (prevResponse !== undefined) {
          // Check if response type matches question type
          const isArray = Array.isArray(prevResponse);
          const shouldBeArray = question.type === "multipleChoice";
          if (isArray === shouldBeArray) {
            // Preserve existing response if types match
            updated[question.id] = prevResponse;
          } else {
            // Reset response if question type changed
            updated[question.id] = shouldBeArray ? "" : "";
          }
        } else {
          // Initialize new question response
          updated[question.id] = question.type === "multipleChoice" ? "" : "";
        }
      });
      return updated;
    });
  }, [questions]);

  useEffect(() => {
    onResponsesChange(responses);
  }, [responses, onResponsesChange]);

  const handleTextChange = (questionId: string, value: string) => {
    setResponses((prev) => ({ ...prev, [questionId]: value }));
  };

  const handleMultipleChoiceChange = (
    questionId: string,
    optionText: string
  ) => {
    setResponses((prev) => ({ ...prev, [questionId]: optionText }));
  };

  return (
    <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6">
      <div className="mb-6 pb-4 border-b border-gray-200">
        <h2 className="text-xl font-semibold text-gray-900 mb-2">
          {title || "Survey Preview"}
        </h2>
        {description && <p className="text-gray-600 text-sm">{description}</p>}
      </div>

      {questions.length === 0 ? (
        <div className="text-center py-12 text-gray-500">
          <p>Add questions to see the preview here.</p>
        </div>
      ) : (
        <div className="space-y-6">
          {questions.map((question, index) => (
            <div key={question.id} className="space-y-3">
              <label className="block text-base font-medium text-gray-900">
                {question.label || "Untitled Question"}
                {question.required && (
                  <span className="text-red-500 ml-1">*</span>
                )}
              </label>

              {question.type === "text" ? (
                <input
                  type="text"
                  value={(responses[question.id] as string) || ""}
                  onChange={(e) =>
                    handleTextChange(question.id, e.target.value)
                  }
                  placeholder="Short answer"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg text-gray-900 placeholder:text-gray-400 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required={question.required}
                />
              ) : (
                <div className="space-y-2">
                  {question.options && question.options.length > 0 ? (
                    question.options.map((option) => (
                      <label
                        key={option.id}
                        className="flex items-center p-3 hover:bg-gray-50 rounded-lg cursor-pointer border border-transparent hover:border-gray-200 transition-colors"
                      >
                        <input
                          type="radio"
                          name={`question-${question.id}`}
                          value={option.text}
                          checked={
                            (responses[question.id] as string) === option.text
                          }
                          onChange={() =>
                            handleMultipleChoiceChange(question.id, option.text)
                          }
                          className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                          required={question.required}
                        />
                        <span className="ml-3 text-gray-700">
                          {option.text || "Untitled option"}
                        </span>
                      </label>
                    ))
                  ) : (
                    <p className="text-gray-500 text-sm italic">
                      No options available. Add options in the question editor.
                    </p>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {questions.length > 0 && (
        <div className="mt-8 pt-6 border-t border-gray-200">
          <button className="w-full px-4 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 transition-colors font-medium">
            Submit Survey
          </button>
        </div>
      )}
    </div>
  );
}
