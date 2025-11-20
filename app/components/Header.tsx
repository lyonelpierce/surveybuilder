"use client";

export default function Header() {
  return (
    <div className="mb-6 flex items-center justify-between">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 mb-1">
          Survey Builder
        </h1>
        <p className="text-gray-600">Create, preview, and export surveys</p>
      </div>
    </div>
  );
}
