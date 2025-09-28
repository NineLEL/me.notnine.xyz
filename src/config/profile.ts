export const skillIcons: Record<string, string> = {
  HTML: "skill-icons:html",
  CSS: "skill-icons:css",
  JavaScript: "skill-icons:javascript",
  TypeScript: "skill-icons:typescript",
  "Node.js": "skill-icons:nodejs-dark",
  "npm": "skill-icons:npm-dark",
  "pnpm": "skill-icons:pnpm-dark",
  "Tailwind CSS": "skill-icons:tailwindcss-dark",
  Astro: "skill-icons:astro",
  Python: "skill-icons:python-dark",
  "C++": "skill-icons:cpp",
};

export interface SocialLink {
  platform: string;
  url: string;
  icon: string;
  bg: string;
  hover: string;
  text: string;
}

export interface Role {
  name: string;
  color: string;
}

export interface ProfileData {
  profilePic: string;
  name: string;
  title: string;
  birthday: string;
  aboutMe: string;
  skills: string[];
  skillIcons: Record<string, string>;
  roles: Role[];
  socialLinks: SocialLink[];
  discordUserId: string;
  discordConnectEnabled: boolean; // Toggle to enable/disable Discord integration
  bannerUrl: string;
}

export const profileData: ProfileData = {
  profilePic: "https://cdn.discordapp.com/attachments/1391958348592844812/1421180018385621123/nideout.gif?ex=68d81888&is=68d6c708&hm=9bef4f535d9768572c91e27c44d3abc4f2fa701dbf7abb49a382ca8b455fc500", // temp
  name: "Nine",
  title: "Student",
  birthday: "Soon!",
  aboutMe: `Soon!`,
  skills: [
    "HTML",
    "CSS",
    "JavaScript",
    "TypeScript",
    "Node.js",
    "npm",
    "pnpm",
    "Tailwind CSS",
    "Astro",
    "Python",
    "C++",
  ],
  skillIcons,
  roles: [
    { name: "Hobbyist Web Developer", color: "bg-teal-500" },
    { name: "Student", color: "bg-red-500" },
    { name: "Gamer", color: "bg-yellow-500" },
    { name: "Geography POSN", color: "bg-blue-500" },
  ],
  socialLinks: [
    {
      platform: "Discord",
      url: "https://discord.com/users/584264698367705116",
      icon: "simple-icons:discord",
      bg: "bg-blue-600 dark:bg-blue-500",
      hover: "hover:bg-blue-700 dark:hover:bg-blue-600",
      text: "text-white",
    },
    {
      platform: "GitHub",
      url: "https://github.com/NineLEL",
      icon: "simple-icons:github",
      bg: "bg-gray-800 dark:bg-gray-700",
      hover: "hover:bg-gray-900 dark:hover:bg-gray-600",
      text: "text-white",
    },
  ],
  discordUserId: "330506366621974528", // Required when discordConnectEnabled is true
  discordConnectEnabled: true, // Main priority when enabled - Discord integration toggle
  bannerUrl: "https://cdn.discordapp.com/attachments/1391958348592844812/1421180018385621123/nideout.gif?ex=68d81888&is=68d6c708&hm=9bef4f535d9768572c91e27c44d3abc4f2fa701dbf7abb49a382ca8b455fc500", // temp
};
