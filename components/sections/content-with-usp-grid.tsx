import GradCapIcon from "@/lib/svg-icons/grad-cap";
import CheckmarkIcon from "@/lib/svg-icons/checkmark";
import PhotoIcon from "@/lib/svg-icons/photo";
import CameraIcon from "@/lib/svg-icons/camera";
import HtmlIcon from "@/lib/svg-icons/html";
import GitIcon from "@/lib/svg-icons/git-icon";
import GraphqlIcon from "@/lib/svg-icons/graphql-icon";
import NodeIcon from "@/lib/svg-icons/node-icon";
import PostgresIcon from "@/lib/svg-icons/postgres-icon";
import PythonIcon from "@/lib/svg-icons/python-icon";
import ReactIcon from "@/lib/svg-icons/react-icon";
import TailwindIcon from "@/lib/svg-icons/tailwind-icon";
import JavascriptIcon from "@/lib/svg-icons/javascript-icon";
import NextIcon from "@/lib/svg-icons/nextjs-icon";

const description =
  "Experienced in building dynamic web applications with a focus on clean code and efficient performance. Adept at both frontend and backend development, utilizing a variety of modern technologies and tools.";
const data = {
  header: "My Skills and Experience",
  description,
  gridItems: [
    {
      title: "JavaScript",
      description: "Building dynamic and interactive web applications.",
      icon: JavascriptIcon,
    },
    {
      title: "Python",
      description: "Developing backend services and APIs.",
      icon: PythonIcon,
    },
    {
      title: "HTML/CSS",
      description: "Creating responsive and accessible web designs.",
      icon: HtmlIcon,
    },
    {
      title: "React.js",
      description: "Building modern and efficient user interfaces.",
      icon: ReactIcon,
    },
    {
      title: "Next.js",
      description: "Optimizing web applications for performance and SEO.",
      icon: NextIcon,
    },
    {
      title: "SQL Databases",
      description: "Designing and managing relational databases.",
      icon: CheckmarkIcon,
    },
    {
      title: "GraphQL",
      description: "Querying and managing data with a flexible API.",
      icon: GraphqlIcon,
    },
    {
      title: "PostgreSQL",
      description: "Developing and managing PostgreSQL databases.",
      icon: PostgresIcon,
    },
    {
      title: "Node.js",
      description: "Developing server-side applications and APIs.",
      icon: NodeIcon,
    },
    {
      title: "Tailwind CSS",
      description: "Styling web applications with utility-first CSS.",
      icon: TailwindIcon,
    },
    {
      title: "Git",
      description: "Version control workflows.",
      icon: GitIcon,
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
                <span className="shrink-0 rounded-lg bg-gray-400 dark:bg-gray-800 p-2">
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
