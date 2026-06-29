import React from "react";

const EmptyState = () => {
  return (
    <div
      className="
      flex
      justify-center
      items-center
      py-24
      "
    >
      <div
        className="
        max-w-lg
        w-full
        bg-white/10
        backdrop-blur-xl
        border
        border-white/10
        rounded-3xl
        p-10
        text-center
        shadow-2xl
        "
      >
        <div className="text-8xl mb-6">
          📒
        </div>

        <h2 className="text-3xl font-bold text-white">
          No Notes Yet
        </h2>

        <p className="text-gray-400 mt-4 leading-relaxed">
          Your notebook is empty.
          <br />
          Create your first note to start organizing your
          thoughts.
        </p>

        <div className="mt-8">
          <span
            className="
            px-5
            py-2
            rounded-full
            bg-cyan-500/20
            text-cyan-400
            "
          >
            ✨ Start Writing
          </span>
        </div>
      </div>
    </div>
  );
};

export default EmptyState;