import type { ActivityType } from "../App";

export function sortActivityByDateDesc(activity: ActivityType[]) {
  return [...activity].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );
}
