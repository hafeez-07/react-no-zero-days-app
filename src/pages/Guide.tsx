function Guide() {
  return (
    <div
      className="
        flex justify-center px-4 py-10
        bg-slate-50 dark:bg-slate-950
        min-h-screen
      "
    >
      <div className="w-full max-w-4xl space-y-8">
        {/* Title */}
        <div
          className="
            rounded-2xl p-6
            bg-white dark:bg-slate-800
            border border-slate-200 dark:border-slate-700
            shadow-sm dark:shadow-none
          "
        >
          <h1 className="text-2xl sm:text-3xl font-bold text-slate-800 dark:text-slate-100 mb-3">
            Guide
          </h1>
          <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
            This page explains how each part of NoZeroDays works and how you
            should use it to stay consistent.
          </p>
        </div>

        {/* Timer */}
        <div className="guide-card">
          <h2 className="guide-title">⏱️ Timer</h2>
          <p className="guide-text">
            Use the timer to track how long you work on something meaningful.
            Start it when you begin, pause if needed, and reset when done. Time
            tracked here contributes to your daily activity.
          </p>
        </div>

        {/* Activity */}
        <div className="guide-card">
          <h2 className="guide-title">📝 Activity</h2>
          <p className="guide-text">
            Activity represents the work you logged for a particular day. You
            can manually add or review past activity to make sure every
            productive day is counted.
          </p>
        </div>

        {/* Edit */}
        <div className="guide-card">
          <h2 className="guide-title">✏️ Editing or correcting activity</h2>
          <p className="guide-text">
            If you accidentally log incorrect data or want to update an entry,
            you can simply log the activity again for the same date. The app
            will automatically detect the existing entry and replace it with the
            new one.
          </p>
        </div>

        {/* Delete */}
        <div className="guide-card">
          <h2 className="guide-title">🗑️ Deleting activity</h2>
          <p className="guide-text">
            You can delete individual activity entries or clear all activity.
            For safety, destructive actions show a confirmation and allow a
            short undo window in case of mistakes.
          </p>
        </div>

        {/* Streak */}
        <div className="guide-card">
          <h2 className="guide-title">🔥 Streak</h2>
          <p className="guide-text">
            A streak is the number of consecutive days where you logged
            activity. Missing a day breaks the streak. Even a small effort keeps
            it alive.
          </p>
        </div>

        {/* Dashboard */}
        <div className="guide-card">
          <h2 className="guide-title">📊 Dashboard</h2>
          <p className="guide-text">
            The dashboard shows your progress at a glance — total time spent,
            longest streak, current streak, and consistency over time.
          </p>
        </div>

        {/* Philosophy */}
        <div className="guide-card">
          <h2 className="guide-title">💡 How to use this app effectively</h2>
          <ul className="list-disc list-inside space-y-2 guide-text">
            <li>Don’t aim for perfection — aim for consistency</li>
            <li>Even one focused minute is enough to keep a streak alive</li>
            <li>Use the dashboard to reflect, not judge</li>
            <li>Missing a day is feedback, not failure</li>
          </ul>
        </div>

        {/* Storage */}
        <div className="guide-card">
          <h2 className="guide-title">⚠️ Important: Browser storage</h2>
          <p className="guide-text">
            Your activities and progress are stored securely in your browser.
            Clearing site data or browser storage will permanently remove your
            saved activities and streaks.
          </p>
        </div>

        {/* Footer */}
        <div className="text-center text-slate-500 dark:text-slate-400 text-sm">
          NoZeroDays is about progress, not pressure.
        </div>
      </div>
    </div>
  );
}

export default Guide;
