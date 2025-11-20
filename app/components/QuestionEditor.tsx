"use client";

import { Question, MultipleChoiceOption } from "../types";
import MultipleChoiceOptions from "./MultipleChoiceOptions";
import { useState } from "react";

interface QuestionEditorProps {
  question: Question;
  onUpdate: (updatedQuestion: Question) => void;
  onDelete: () => void;
}

export default function QuestionEditor({
  question,
  onUpdate,
  onDelete,
}: QuestionEditorProps) {
  const [isExpanded, setIsExpanded] = useState(true);

  const handleLabelChange = (label: string) => {
    onUpdate({ ...question, label });
  };

  const handleTypeChange = (type: Question["type"]) => {
    const updatedQuestion: Question = {
      ...question,
      type,
      // Initialize options for multiple choice if switching to that type
      options:
        type === "multipleChoice"
          ? question.options || [{ id: crypto.randomUUID(), text: "" }]
          : undefined,
    };
    onUpdate(updatedQuestion);
  };

  const handleRequiredChange = (required: boolean) => {
    onUpdate({ ...question, required });
  };

  const handleOptionsUpdate = (options: MultipleChoiceOption[]) => {
    onUpdate({ ...question, options });
  };

  const getQuestionSummary = () => {
    if (question.label) {
      return question.label;
    }
    return `Untitled Question (${
      question.type === "text" ? "Freeform Text" : "Multiple Choice"
    })`;
  };

  return (
    <div className="border border-gray-200 rounded-lg bg-white overflow-hidden shadow-sm hover:shadow-md transition-shadow">
      {/* Collapsible Header */}
      <div
        className="flex items-center justify-between p-4 cursor-pointer hover:bg-gray-50 transition-colors"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <div className="flex items-center gap-3 flex-1 min-w-0">
          <svg
            className={`w-5 h-5 text-gray-400 shrink-0 transition-transform ${
              isExpanded ? "transform rotate-90" : ""
            }`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 5l7 7-7 7"
            />
          </svg>
          <h3 className="text-base font-medium text-gray-900 truncate">
            {getQuestionSummary()}
          </h3>
          <span className="text-xs text-gray-500 shrink-0 px-2 py-1 bg-gray-100 rounded">
            {question.type === "text" ? "Short Text" : "Multiple Choice"}
          </span>
        </div>
        <button
          onClick={(e) => {
            e.stopPropagation();
            onDelete();
          }}
          className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded transition-colors shrink-0"
          aria-label="Delete question"
        >
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
            />
          </svg>
        </button>
      </div>

      {/* Collapsible Content */}
      {isExpanded && (
        <div className="px-4 pb-4 space-y-4 border-t border-gray-200">
          {/* Question Label */}
          <div className="pt-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Question
            </label>
            <textarea
              value={question.label}
              onChange={(e) => handleLabelChange(e.target.value)}
              placeholder="Enter your question..."
              onClick={(e) => e.stopPropagation()}
              rows={2}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg text-gray-900 placeholder:text-gray-400 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
            />
          </div>

          {/* Question Type */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Question Type
            </label>
            <select
              value={question.type}
              onChange={(e) =>
                handleTypeChange(e.target.value as Question["type"])
              }
              onClick={(e) => e.stopPropagation()}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg text-gray-900 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="text">Freeform Text</option>
              <option value="multipleChoice">Multiple Choice</option>
            </select>
          </div>

          {/* Required Toggle */}
          <div className="flex items-center">
            <input
              type="checkbox"
              id={`required-${question.id}`}
              checked={question.required}
              onChange={(e) => handleRequiredChange(e.target.checked)}
              onClick={(e) => e.stopPropagation()}
              className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
            />
            <label
              htmlFor={`required-${question.id}`}
              className="ml-2 text-sm font-medium text-gray-700"
            >
              Required
            </label>
          </div>

          {/* Multiple Choice Options */}
          {question.type === "multipleChoice" && question.options && (
            <div onClick={(e) => e.stopPropagation()}>
              <MultipleChoiceOptions
                options={question.options}
                onUpdate={handleOptionsUpdate}
              />
            </div>
          )}
        </div>
      )}
    </div>
  );
}
