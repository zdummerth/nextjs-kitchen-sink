import CheckmarkIcon from "@/lib/svg-icons/checkmark";
import Image from "next/image";
import Link from "next/link";
import { ArrowTopRightOnSquareIcon } from "@heroicons/react/24/outline";

export default function TripleImageWithContent() {
  return (
    <div className="max-w-[85rem] px-4 py-10 sm:px-6 lg:px-8 lg:py-14 mx-auto">
      <div className="lg:grid lg:grid-cols-12 lg:gap-16 lg:items-center">
        <div className="lg:col-span-7">
          <div className="grid grid-cols-12 gap-2 sm:gap-6 items-center lg:-translate-x-10">
            <div className="col-span-4">
              <Image
                src="https://images.unsplash.com/photo-1606868306217-dbf5046868d2?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1981&q=80"
                alt="Image 1"
                width={500}
                height={500}
                className="rounded-xl"
              />
            </div>

            <div className="col-span-3">
              <Image
                src="https://images.unsplash.com/photo-1605629921711-2f6b00c6bbf4?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=987&q=80"
                alt="Image 2"
                width={500}
                height={500}
                className="rounded-xl"
              />
            </div>

            <div className="col-span-5">
              <Image
                src="https://images.unsplash.com/photo-1600194992440-50b26e0a0309?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=987&q=80"
                alt="Image 3"
                width={500}
                height={500}
                className="rounded-xl"
              />
            </div>
          </div>
        </div>

        <div className="mt-5 sm:mt-10 lg:mt-0 lg:col-span-5">
          <div className="space-y-6 sm:space-y-8 dark:text-gray-400">
            <div className="space-y-2 md:space-y-4">
              <h2 className="font-bold text-3xl lg:text-4xl text-gray-800 dark:text-gray-100">
                View my other projects
              </h2>
            </div>
            <ul role="list" className="space-y-2 sm:space-y-4">
              <li className="flex space-x-3">
                <span className="mt-0.5 h-5 w-5 flex justify-center items-center rounded-full bg-blue-50 text-blue-600 dark:bg-blue-800/30 dark:text-blue-500">
                  <CheckmarkIcon />
                </span>

                <span className="text-sm sm:text-base">
                  <a
                    href="https://www.ninthfool.com/"
                    className="text-blue-600 dark:text-blue-400 block mr-4"
                    target="_blank"
                  >
                    <div className="flex items-center gap-4">
                      <span>The Ninth Fool</span>
                      <ArrowTopRightOnSquareIcon className="h-5 w-5 inline-block" />
                    </div>
                  </a>
                </span>
              </li>

              <li className="flex space-x-3">
                <span className="mt-0.5 h-5 w-5 flex justify-center items-center rounded-full bg-blue-50 text-blue-600 dark:bg-blue-800/30 dark:text-blue-500">
                  <CheckmarkIcon />
                </span>

                <span className="text-sm sm:text-base">
                  <a
                    href="https://www.outdoorsbychaz.com/"
                    className="text-blue-600 dark:text-blue-400 block mr-4"
                    target="_blank"
                  >
                    <div className="flex items-center gap-4">
                      <span>Outdoors By Chaz</span>
                      <ArrowTopRightOnSquareIcon className="h-5 w-5 inline-block" />
                    </div>
                  </a>
                </span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
