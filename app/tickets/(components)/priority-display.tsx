import { FireIcon } from "@heroicons/react/16/solid";

const PriorityDisplay = ({ priority }: { priority: number }) => {
  return (
    <div className="flex justify-start align-baseline">
      <FireIcon
        className={`w-5 h-5 ${
          priority > 0 ? " text-red-500" : " text-slate-400"
        }`}
      />
      <FireIcon
        className={`w-5 h-5 ${
          priority > 1 ? " text-red-500" : " text-slate-400"
        }`}
      />
      <FireIcon
        className={`w-5 h-5 ${
          priority > 2 ? " text-red-500" : " text-slate-400"
        }`}
      />
      <FireIcon
        className={`w-5 h-5 ${
          priority > 3 ? " text-red-500" : " text-slate-400"
        }`}
      />
      <FireIcon
        className={`w-5 h-5 ${
          priority > 4 ? " text-red-500" : " text-slate-400"
        }`}
      />
    </div>
  );
};

export default PriorityDisplay;
