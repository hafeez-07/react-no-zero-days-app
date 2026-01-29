import UserInput from "../components/UserInput";
import type { ActivityType } from "../App";
import TodayStats from "../components/TodayStats";
import DashBoard from "../components/DashBoard";


type HomeProps = {
  activity: ActivityType[];
  setActivity: React.Dispatch<React.SetStateAction<ActivityType[]>>;
};

function Home({ activity, setActivity }: HomeProps) {
  return (
    <div className="flex justify-center px-4 ">
      <div className="w-full max-w-5xl space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <UserInput activity={activity} setActivity={setActivity} />
          <TodayStats activity={activity} />
        </div>
        <div className="hidden sm:block max-w-6xl mx-auto mb-3">
          <DashBoard activity={activity} />
        </div>
      </div>
    </div>
  );
}

export default Home;
