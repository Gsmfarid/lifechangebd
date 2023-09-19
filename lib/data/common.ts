import { IFooterData, ILinkLabel } from "@/interface";

export const commonNavItems: ILinkLabel[] = [
  {
    label: "Home",
    link: "/",
  },
  {
    label: "About",
    link: "/",
  },
  {
    label: "Contact",
    link: "/",
  },
  {
    label: "Courses",
    link: "/",
  },
];

export const footerItems: IFooterData = {
  title: "COMPANY",
  policy: ["Careers", "Contact Us", "Terms and conditions", "Privacy Policy"],
  option: [
    {
      title: "VIRTUAL OFFICE ADDRESS",
      text: "We work DLF Forum, Cybercity, phase lll, gurugram, Haryana 122002.",
    },
    {
      title: "OFFICE ADDRESS",
      text: "Kansat, chapainowabgonj,Rajshahi",
    },
    {
      copyright: `Copyright © 2019 - ${new Date().getFullYear()} Life Change Bd® All rights reserved.`,
    },
  ],
};