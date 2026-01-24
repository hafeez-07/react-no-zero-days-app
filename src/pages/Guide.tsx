function Guide() {
  return (
    <div className="flex justify-center px-4 py-10">
      <div className="w-full max-w-4xl space-y-8">
        {/* Title */}
        <div className="bg-slate-800 rounded-2xl p-6 border border-slate-700">
          <h1 className="text-2xl sm:text-3xl font-bold text-slate-100 mb-3">
            Guide
          </h1>
          <p className="text-slate-300 leading-relaxed">
            This page explains how each part of NoZeroDays works and how you
            should use it to stay consistent.
          </p>
        </div>

        {/* Timer */}
        <div className="bg-slate-800 rounded-2xl p-6 border border-slate-700">
          <h2 className="text-xl font-semibold text-slate-100 mb-2">
            ⏱️ Timer
          </h2>
          <p className="text-slate-300 leading-relaxed">
            Use the timer to track how long you work on something meaningful.
            Start it when you begin, pause if needed, and reset when done. Time
            tracked here contributes to your daily activity.
          </p>
        </div>

        {/* Activity */}
        <div className="bg-slate-800 rounded-2xl p-6 border border-slate-700">
          <h2 className="text-xl font-semibold text-slate-100 mb-2">
            📝 Activity
          </h2>
          <p className="text-slate-300 leading-relaxed">
            Activity represents the work you logged for a particular day. You
            can manually add or review past activity to make sure every
            productive day is counted.
          </p>
        </div>

        {/* Streak */}
        <div className="bg-slate-800 rounded-2xl p-6 border border-slate-700">
          <h2 className="text-xl font-semibold text-slate-100 mb-2">
            🔥 Streak
          </h2>
          <p className="text-slate-300 leading-relaxed">
            A streak is the number of consecutive days where you logged
            activity. Missing a day breaks the streak. Even a small effort keeps
            it alive.
          </p>
        </div>

        {/* Dashboard */}
        <div className="bg-slate-800 rounded-2xl p-6 border border-slate-700">
          <h2 className="text-xl font-semibold text-slate-100 mb-2">
            📊 Dashboard
          </h2>
          <p className="text-slate-300 leading-relaxed">
            The dashboard shows your progress at a glance — total time spent,
            longest streak, current streak, and consistency over time.
          </p>
        </div>

        {/* Philosophy */}
        <div className="bg-slate-800 rounded-2xl p-6 border border-slate-700">
          <h2 className="text-xl font-semibold text-slate-100 mb-2">
            💡 How to use this app effectively
          </h2>
          <ul className="list-disc list-inside text-slate-300 space-y-2">
            <li>Don’t aim for perfection — aim for consistency</li>
            <li>Even one focused minute is enough to keep a streak alive</li>
            <li>Use the dashboard to reflect, not judge</li>
            <li>Missing a day is feedback, not failure</li>
          </ul>
        </div>

        {/* Footer note */}
        <div className="text-center text-slate-300 text-sm">
          NoZeroDays is about progress, not pressure.
        </div>
      </div>
    </div>
  );
}

export default Guide;
