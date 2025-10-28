import { v4 as uuid } from "uuid";
import { SiteHeaderLinksProps } from "./types";

export const siteHeaderLinks: SiteHeaderLinksProps[] = [
  {
    id: uuid(),
    linkName: "Services",
    path: "#",
    hasDropdown: true,
    dropdownOptions: [
      { id: uuid(), linkName: "Post a Job", path: "#" },
      { id: uuid(), linkName: "Request an Interview", path: "#" },
    ],
  },
  {
    id: uuid(),
    linkName: "Dashboard",
    path: "/care-provider",
  },
  {
    id: uuid(),
    linkName: "Blogs",
    path: "#",
    hasDropdown: true,
    dropdownOptions: [
      { id: uuid(), linkName: "Post a Job", path: "#" },
      { id: uuid(), linkName: "Request an Interview", path: "#" },
    ],
  },
  {
    id: uuid(),
    linkName: "Write a review",
    path: "#",
  },
  {
    id: uuid(),
    linkName: "Contact Us",
    path: "#",
  },
];
