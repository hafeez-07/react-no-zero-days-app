function Motivation() {
  const quotes = [
    "Even if your height looks like it missed a few updates, your dreams don’t have to be small.",

    "Even if you’re not tall in inches, make sure your dreams are tall in ambition.",
    "You may be short on height, but you should never be short on dreams.",

    "Even if your height is on power-saving mode, your dreams should run on full battery.",

    "Even if the top shelf scares you, your future shouldn’t.",

    "Height is just a number; dreams are a whole vision.",
    "You don’t need to be tall to reach high.",
    "Small frame, big dreams, unstoppable future.",

    "Short on height, rich in ambition.",
    "The sky isn’t higher just because you’re shorter.",
    "Being small never stopped greatness.",

    "Even if you stand low, let your dreams rise higher than the clouds.",
    "The world measures height, but success measures courage.",
  ];

  return (
    <div className="flex justify-center px-4 py-10">
      <div className="w-full max-w-4xl space-y-6">
        {/* Page intro card */}
        <div className="bg-slate-800 rounded-2xl p-6 border border-slate-700">
          <h1 className="text-2xl sm:text-3xl font-bold text-slate-100 mb-2">
            Motivation
          </h1>
          <p className="text-slate-300">
            Small reminders to think big and stay consistent.
          </p>
        </div>

        {/* Quotes */}
        {quotes.map((quote, index) => (
          <div
            key={index}
            className="bg-slate-800 rounded-2xl p-6 border border-slate-700"
          >
            <p className="text-slate-200 leading-relaxed">{quote}</p>
          </div>
        ))}

       
         <div className="bg-slate-800 rounded-2xl p-6 border border-slate-700">
          <h1 className="text-2xl sm:text-3xl font-bold text-slate-100 mb-2">
            Acknowledgment
          </h1>
          <p className="text-slate-300">
            Sahana Ansar Shaikh - smallest women on planet earth
          </p>
        </div>
         {/* Footer note */}
        <div className="text-center text-slate-400 text-sm">
          NoZeroDays — consistency over comparison.
        </div>
      </div>
    </div>
  );
}

export default Motivation;
