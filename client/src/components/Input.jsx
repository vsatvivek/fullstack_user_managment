import React, { forwardRef } from 'react';

const Input = forwardRef(({ label, error, ...props }, ref) => {
  return (
    <div className="flex flex-col mb-3 w-full">
      {label && (
        <label className="mb-1 text-sm text-gray-600">
          {label}
        </label>
      )}
      <input
        ref={ref}   // ✅ important for react-hook-form
        className={`border rounded px-3 py-2 focus:outline-none focus:ring-2 ${
          error
            ? "border-red-500 focus:ring-red-400"
            : "border-gray-300 focus:ring-purple-400"
        }`}
        {...props}
      />
      {error && <span className="text-sm text-red-500 mt-1">{error}</span>}
    </div>
  );
});

export default Input;
