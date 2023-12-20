import GradCapIcon from "@/lib/svg-icons/grad-cap";
import CheckmarkIcon from "@/lib/svg-icons/checkmark";
import PhotoIcon from "@/lib/svg-icons/photo";
import CameraIcon from "@/lib/svg-icons/camera";

const lorem =
  "Lorem ipsum dolor sit amet consectetur adipisicing elit. Error cumque tempore est ab possimus quisquam reiciendis tempora animi! Quaerat, saepe?";
const data = {
  header: "What makes us special",
  description: lorem,
  gridItems: [
    {
      title: "Lorem, ipsum dolor.",
      description: lorem,
      icon: GradCapIcon,
    },
    {
      title: "Lorem, ipsum dolor.",
      description: lorem,
      icon: CheckmarkIcon,
    },
    {
      title: "Lorem, ipsum dolor.",
      description: lorem,
      icon: PhotoIcon,
    },
    {
      title: "Lorem, ipsum dolor.",
      description: lorem,
      icon: CameraIcon,
    },
    {
      title: "Lorem, ipsum dolor.",
      description: lorem,
      icon: GradCapIcon,
    },
    {
      title: "Lorem, ipsum dolor.",
      description: lorem,
      icon: CheckmarkIcon,
    },
  ],
};

export default function ContentWithUspGrid() {
  return (
    <section className="">
      <div className="max-w-screen-xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8 lg:py-16">
        <div className="max-w-xl">
          <h2 className="text-3xl font-bold sm:text-4xl">{data.header}</h2>
          <p className="mt-4 text-gray-600 dark:text-gray-300">
            {data.description}
          </p>
        </div>

        <div className="mt-8 grid grid-cols-1 gap-8 md:mt-16 md:grid-cols-2 md:gap-12 lg:grid-cols-3">
          {data.gridItems.map((item, index) => {
            const Icon = item.icon;

            return (
              <div key={index} className="flex items-start gap-4">
                <span className="shrink-0 rounded-lg bg-gray-400 dark:bg-gray-800 p-4">
                  <Icon />
                </span>

                <div>
                  <h2 className="text-lg font-bold">{item.title}</h2>

                  <p className="mt-1 text-sm text-gray-600 dark:text-gray-300">
                    {item.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
