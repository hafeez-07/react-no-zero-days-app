function About() {
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
            About NoZeroDays
          </h1>
          <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
            NoZeroDays is a productivity and habit-tracking app built on a
            simple idea — never let a day pass without doing something
            meaningful.
          </p>
        </div>

        {/* Philosophy */}
        <div
          className="
            rounded-2xl p-6
            bg-white dark:bg-slate-800
            border border-slate-200 dark:border-slate-700
            shadow-sm dark:shadow-none
          "
        >
          <h2 className="text-xl font-semibold text-slate-800 dark:text-slate-100 mb-2">
            The Idea
          </h2>
          <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
            Progress does not come from big actions done once in a while, but
            from small efforts repeated consistently. Even one focused minute
            counts. Zero effort does not.
          </p>
        </div>

        {/* What you can do */}
        <div
          className="
            rounded-2xl p-6
            bg-white dark:bg-slate-800
            border border-slate-200 dark:border-slate-700
            shadow-sm dark:shadow-none
          "
        >
          <h2 className="text-xl font-semibold text-slate-800 dark:text-slate-100 mb-4">
            What this app helps you do
          </h2>

          <ul className="space-y-2 text-slate-600 dark:text-slate-300">
            <li>• Track time spent on meaningful work</li>
            <li>• Build and maintain daily streaks</li>
            <li>• Visualize consistency and missed days</li>
            <li>• Understand your habits through simple statistics</li>
          </ul>
        </div>

        {/* Who it is for */}
        <div
          className="
            rounded-2xl p-6
            bg-white dark:bg-slate-800
            border border-slate-200 dark:border-slate-700
            shadow-sm dark:shadow-none
          "
        >
          <h2 className="text-xl font-semibold text-slate-800 dark:text-slate-100 mb-2">
            Who it’s for
          </h2>
          <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
            NoZeroDays is built for students, developers, creators, and anyone
            trying to stay consistent with their goals — without pressure or
            perfection.
          </p>
        </div>

        {/* Footer note */}
        <div className="text-center text-slate-500 dark:text-slate-400 text-sm">
          Built as a personal accountability tool and learning project.
        </div>
      </div>
    </div>
  );
}

export default About;
