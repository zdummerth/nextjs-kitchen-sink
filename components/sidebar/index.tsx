import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import SidebarLinkGroup from "./sidebar-link-group";
import RotatingArrowIcon from "@/lib/svg-icons/rotating-arrow";
import LeftArrowIcon from "@/lib/svg-icons/left-arrow";
import { ArrowLeftCircleIcon } from "@heroicons/react/24/outline";

interface SidebarProps {
  sidebarOpen: boolean;
  setSidebarOpen: (arg: boolean) => void;
}

const Sidebar = ({ sidebarOpen, setSidebarOpen }: SidebarProps) => {
  const pathname = usePathname();

  const trigger = useRef<any>(null);
  const sidebar = useRef<any>(null);

  let storedSidebarExpanded = "true";
  const [sidebarExpanded, setSidebarExpanded] = useState(
    storedSidebarExpanded === null ? false : storedSidebarExpanded === "true"
  );

  // close on click outside
  useEffect(() => {
    const clickHandler = ({ target }: MouseEvent) => {
      if (!sidebar.current || !trigger.current) return;
      if (
        !sidebarOpen ||
        sidebar.current.contains(target) ||
        trigger.current.contains(target)
      )
        return;
      setSidebarOpen(false);
    };
    document.addEventListener("click", clickHandler);
    return () => document.removeEventListener("click", clickHandler);
  });

  // close if the esc key is pressed
  useEffect(() => {
    const keyHandler = ({ keyCode }: KeyboardEvent) => {
      if (!sidebarOpen || keyCode !== 27) return;
      setSidebarOpen(false);
    };
    document.addEventListener("keydown", keyHandler);
    return () => document.removeEventListener("keydown", keyHandler);
  });

  useEffect(() => {
    localStorage.setItem("sidebar-expanded", sidebarExpanded.toString());
    if (sidebarExpanded) {
      document.querySelector("body")?.classList.add("sidebar-expanded");
    } else {
      document.querySelector("body")?.classList.remove("sidebar-expanded");
    }
  }, [sidebarExpanded]);

  return (
    <aside
      ref={sidebar}
      className={`fixed left-0 top-0 z-9999 flex h-screen w-72.5 flex-col overflow-y-hidden duration-300 ease-linear bg-gray-100 dark:bg-gray-700 ${
        sidebarOpen ? "translate-x-0" : "-translate-x-full"
      }`}
    >
      {/* <!-- SIDEBAR HEADER --> */}
      <div className="flex items-center justify-end gap-2 px-6 py-5.5 lg:py-6.5">
        <button
          ref={trigger}
          onClick={() => setSidebarOpen(!sidebarOpen)}
          aria-controls="sidebar"
          aria-expanded={sidebarOpen}
          className="block"
        >
          <ArrowLeftCircleIcon className="h-8 w-8" />
        </button>
      </div>
      {/* <!-- SIDEBAR HEADER --> */}

      <div className="no-scrollbar flex flex-col overflow-y-auto duration-300 ease-linear">
        {/* <!-- Sidebar Menu --> */}
        <nav className="mt-5 py-4 px-4 lg:mt-9 lg:px-6">
          {/* <!-- Menu Group --> */}
          <div>
            <h3 className="mb-4 ml-4 text-sm font-semibold">Menu</h3>

            <ul className="mb-6 flex flex-col gap-1.5">
              <li>
                <Link
                  href="/"
                  className={`group relative flex items-center gap-2.5 rounded-sm py-2 px-4 font-medium duration-300 ease-in-out hover:bg-graydark hover:text-white dark:hover:bg-meta-4 ${
                    pathname.includes("/") && "bg-graydark dark:bg-meta-4"
                  }`}
                >
                  Home
                </Link>
              </li>
              {/* <!-- Menu Item Dashboard --> */}
              {/* <SidebarLinkGroup
                activeCondition={
                  pathname === "/" || pathname.includes("ecommerce")
                }
              >
                {(handleClick, open) => {
                  return (
                    <React.Fragment>
                      <Link
                        href="#"
                        className={`group block relative flex justify-between gap-2.5 rounded-sm py-2 px-4 font-medium duration-300 ease-in-out hover:bg-graydark hover:text-white dark:hover:bg-meta-4 ${
                          pathname === "/" && "bg-graydark dark:bg-meta-4"
                        }`}
                        onClick={(e) => {
                          e.preventDefault();
                          sidebarExpanded
                            ? handleClick()
                            : setSidebarExpanded(true);
                        }}
                      >
                        <span>Ecommerce</span>
                        <span className="pr-4">
                          <RotatingArrowIcon open={open} />
                        </span>
                      </Link>
                      <div
                        className={`translate transform overflow-hidden ${
                          !open && "hidden"
                        }`}
                      >
                        <ul className="mt-4 mb-5.5 flex flex-col gap-2.5 pl-6">
                          <li>
                            <Link
                              href="/ecommerce"
                              className={`group relative flex items-center gap-2.5 rounded-md px-4 font-medium duration-300 ease-in-out hover:bg-graydark hover:text-white `}
                            >
                              Home
                            </Link>
                          </li>
                          <li>
                            <Link
                              href="/ecommerce/catalog"
                              className={`group relative flex items-center gap-2.5 rounded-md px-4 font-medium duration-300 ease-in-out hover:bg-graydark hover:text-white `}
                            >
                              Catalog
                            </Link>
                          </li>
                        </ul>
                      </div>
                    </React.Fragment>
                  );
                }}
              </SidebarLinkGroup> */}
              <li>
                <Link
                  href="/social"
                  className={`group relative flex items-center gap-2.5 rounded-sm py-2 px-4 font-medium duration-300 ease-in-out hover:bg-graydark hover:text-white dark:hover:bg-meta-4 ${
                    pathname.includes("social") && "bg-graydark dark:bg-meta-4"
                  }`}
                >
                  Social
                </Link>
              </li>
              <li>
                <Link
                  href="/contacts"
                  className={`group relative flex items-center gap-2.5 rounded-sm py-2 px-4 font-medium duration-300 ease-in-out hover:bg-graydark hover:text-white dark:hover:bg-meta-4 ${
                    pathname.includes("contacts") &&
                    "bg-graydark dark:bg-meta-4 text-white"
                  }`}
                >
                  Contacts
                </Link>
              </li>
              <li>
                <Link
                  href="/tickets"
                  className={`group relative flex items-center gap-2.5 rounded-sm py-2 px-4 font-medium duration-300 ease-in-out hover:bg-graydark hover:text-white dark:hover:bg-meta-4 ${
                    pathname.includes("tickets") &&
                    "bg-graydark dark:bg-meta-4 text-white"
                  }`}
                >
                  Tickets
                </Link>
              </li>
            </ul>
          </div>
        </nav>
      </div>
    </aside>
  );
};

export default Sidebar;
