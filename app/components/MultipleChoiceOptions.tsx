"use client";

import { MultipleChoiceOption } from "../types";

interface MultipleChoiceOptionsProps {
  options: MultipleChoiceOption[];
  onUpdate: (options: MultipleChoiceOption[]) => void;
}

export default function MultipleChoiceOptions({
  options,
  onUpdate,
}: MultipleChoiceOptionsProps) {
  const handleOptionTextChange = (id: string, text: string) => {
    const updatedOptions = options.map((opt) =>
      opt.id === id ? { ...opt, text } : opt
    );
    onUpdate(updatedOptions);
  };

  const handleAddOption = () => {
    const newOption: MultipleChoiceOption = {
      id: crypto.randomUUID(),
      text: "",
    };
    onUpdate([...options, newOption]);
  };

  const handleDeleteOption = (id: string) => {
    const updatedOptions = options.filter((opt) => opt.id !== id);
    // Ensure at least one option exists
    if (updatedOptions.length === 0) {
      updatedOptions.push({ id: crypto.randomUUID(), text: "" });
    }
    onUpdate(updatedOptions);
  };

  return (
    <div className="mt-4 border-t border-gray-200 pt-4">
      <div className="flex items-center justify-between mb-3">
        <label className="block text-sm font-medium text-gray-700">
          Options
        </label>
        <button
          onClick={handleAddOption}
          className="px-3 py-1.5 text-sm text-blue-600 hover:text-blue-700 hover:bg-blue-50 rounded-lg transition-colors font-medium"
        >
          + Add
        </button>
      </div>
      <div className="space-y-2">
        {options.map((option, index) => (
          <div key={option.id} className="flex items-center gap-2">
            <input
              type="text"
              value={option.text}
              onChange={(e) =>
                handleOptionTextChange(option.id, e.target.value)
              }
              placeholder={`Option ${index + 1}`}
              className="flex-1 px-3 py-2 border border-gray-300 rounded-lg text-gray-900 placeholder:text-gray-400 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            {options.length > 1 && (
              <button
                onClick={() => handleDeleteOption(option.id)}
                className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors shrink-0"
                aria-label={`Delete option ${index + 1}`}
              >
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
