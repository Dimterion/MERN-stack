import mediumImg from "../assets/images/mediumImg.jpg";
import twitterImg from "../assets/images/twitterImg.jpg";
import gitHubImg from "../assets/images/gitHubImg.jpg";
import personalSiteImg from "../assets/images/personalSiteImg.jpg";

export const skills = [
  {
    id: 0,
    name: "",
  },
  {
    id: 1,
    name: "html",
    level: 6,
    levelOneDesc: "Can make a Hello world page.",
    levelTwoDesc: "Knows how to link CSS stylesheet.",
    levelThreeDesc:
      "Easily enters a debate on whether HTML is a programming language and can support any of the arguing parties.",
  },
  {
    id: 2,
    name: "css",
    level: 5,
    levelOneDesc: "Can center a div.",
    levelTwoDesc: "Can center a div without Flexbox.",
    levelThreeDesc:
      "Uses only Tailwind CSS and regularly talks about its advantages over Bootstrap and regular CSS.",
  },
  {
    id: 3,
    name: "javaScript",
    level: 4,
    levelOneDesc: "Logs custom messages to the console.",
    levelTwoDesc: "Fizz Buzzes with minimum googling.",
    levelThreeDesc:
      "Read Eloquent JavaScript from beginning to end and completed all of the exercises without looking at solutions.",
  },
  {
    id: 5,
    name: "react",
    level: 4,
    levelOneDesc: "Can start a project with CRA or Vite.",
    levelTwoDesc: "Uses useState and useEffect properly.",
    levelThreeDesc:
      "Switched to Next.js, became Vercel ambassador and regularly talks about the advantages of using server components.",
  },
  {
    id: 6,
    name: "git",
    level: 4,
    levelOneDesc: "Knows the difference between Git and GitHub.",
    levelTwoDesc: "Writes proper commit messages in present tense.",
    levelThreeDesc:
      "Keeps contributions streak for more than a year by contributing to other devs repos every day.",
  },
];

export const archives = [
  {
    id: 0,
    name: "Blog",
    link: "https://medium.com/@dimterion",
    img: mediumImg,
    alt: "Letter M in a circle.",
  },
  {
    id: 1,
    name: "GitHub",
    link: "https://github.com/Dimterion",
    img: gitHubImg,
    alt: "GitHub logo.",
  },
  {
    id: 2,
    name: "xTwitter",
    link: "https://twitter.com/Dimterion",
    img: twitterImg,
    alt: "Letter X in a circle.",
  },
  {
    id: 3,
    name: "Personal page",
    link: "https://dimterion.github.io/",
    img: personalSiteImg,
    alt: "Letter D.",
  },
];
