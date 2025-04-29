export const noteColors = [
  {
    id: "white-black",
    name: "White Black",
    background: "white",
    text: "black",
  },
  {
    id: "cotton-blush",
    name: "Cotton Blush",
    background: "#FFDFDE",
    text: "#6A7BA2",
  },
  {
    id: "coral-ink",
    name: "Coral Ink",
    background: "#ed6f63",
    text: "#2D2926",
  },
  {
    id: "golden-navy",
    name: "Golden Navy",
    background: "#DDA94B",
    text: "#1E4174",
  },
  {
    id: "rose-cream",
    name: "Rose Cream",
    background: "#A4193D",
    text: "#FFDFB9",
  },
  {
    id: "forest-sage",
    name: "Forest Sage",
    background: "#07553B",
    text: "#CED46A",
  },
  {
    id: "deep-ocean",
    name: "Deep Ocean",
    background: "#02343F",
    text: "#F0EDCC",
  },
  {
    id: "deep-blue-steel",
    name: "Deep Blue Steel",
    background: "#195190",
    text: "#A2A2A1",
  },
  {
    id: "royal-rose",
    name: "Royal Rose",
    background: "#333D79",
    text: "#FAEBEF",
  },
  {
    id: "twilight-moss",
    name: "Twilight Moss",
    background: "#331B3F",
    text: "#ACC7B4",
  },
  {
    id: "vintage-blush",
    name: "Vintage Blush",
    background: "#815854",
    text: "#F9EBDE",
  },
];

// export const initialNote = [
//   {
//     id: "1",
//     title: "Welcome!",
//     text: "Welcome, Fellow Internet Explorer! You've just stumbled upon the coolest corner of the web—congrats on your excellent taste! 🚀 Here's the deal: We’ve got amazing stuff here (seriously, even our imaginary friends love it). Feel free to click around—don’t worry, nothing bites… except maybe the 'Buy Now' button. 😉",
//     color: noteColors[1].background,
//     tags: [
//       { value: "peace", label: "Peace" },
//       { value: "intro", label: "Intro" },
//     ],
//   },
//   {
//     id: "2",
//     title: "Ctrl + Z for Life?",
//     text: "If only we had an undo button for every awkward moment, right? Until then, enjoy your time here—no regrets, only good vibes. 😎 Carry on.",
//     color: noteColors[2].background,
//     tags: [
//       { value: "fun", label: "Fun!" },
//       { value: "good vibes", label: "Good Vibes" },
//     ],
//   },
//   {
//     id: "3",
//     title: "🚀 THE FUTURE CALLED—YOU’RE ALREADY HERE! 🚀",
//     text: "Congratulations! You’ve made it to the only page on the internet that combines 5% genius, 10% curiosity, and 85% coffee-fueled creativity. Stay curious. Stay awesome. 😎",
//     color: noteColors[3].background,
//     tags: [
//       { value: "future", label: "Future" },
//       { value: "creativity", label: "Creativity" },
//     ],
//   },
//   {
//     id: "4",
//     title: "WELCOME TO THE PANDA-MONIUM! 🐼",
//     text: "Did you know pandas spend up to 14 hours a day eating bamboo? Same energy as you bingeing snacks on a lazy Sunday. 🍿 Stick around—you might just learn something unbearably cool! 🐾 Stay fluffy.",
//     color: noteColors[4].background,
//     tags: [
//       { value: "fun", label: "Fun" },
//       { value: "panda", label: "Panda" },
//     ],
//   },
//   {
//     id: "5",
//     title: "MOTIVATION? CHECK. ✅",
//     text: "Today’s agenda: 1) Breathe. 2) Drink coffee. 3) Pretend to be productive. 4) Actually get stuff done. You got this! 💪",
//     color: noteColors[5].background,
//     tags: [
//       { value: "motivation", label: "Motivation" },
//       { value: "productivity", label: "Productivity" },
//     ],
//   },
//   {
//     id: "6",
//     title: "PROCRASTINATORS UNITE… TOMORROW!",
//     text: "We all know the best ideas come *right* before a deadline. So go ahead, take a break… then panic later. 😂",
//     color: noteColors[6].background,
//     tags: [
//       { value: "fun", label: "Fun" },
//       { value: "procrastination", label: "Procrastination" },
//     ],
//   },
//   {
//     id: "7",
//     title: "STAY HYDRATED 💧",
//     text: "Water is basically a free life hack. Drink some now. Your future self will thank you. Cheers! 🥤",
//     color: noteColors[7].background,
//     tags: [
//       { value: "health", label: "Health" },
//       { value: "self-care", label: "Self-care" },
//     ],
//   },
//   {
//     id: "8",
//     title: "FUN FACT! 🎉",
//     text: "Octopuses have three hearts. That’s two more than most of us can handle emotionally. 😅",
//     color: noteColors[8].background,
//     tags: [
//       { value: "fun", label: "Fun" },
//       { value: "random", label: "Random" },
//     ],
//   },
//   {
//     id: "9",
//     title: "A FRIENDLY REMINDER",
//     text: "Your worth is not measured by your productivity. It’s okay to rest. 💖",
//     color: noteColors[9].background,
//     tags: [
//       { value: "self-care", label: "Self-care" },
//       { value: "mental health", label: "Mental Health" },
//     ],
//   },
//   {
//     id: "10",
//     title: "TODAY'S MOOD: RETRO VIBES 🎵",
//     text: "Blast some old-school tunes, grab a milkshake, and pretend it's the '90s again. Life was simpler back then. ☎️",
//     color: noteColors[10].background,
//     tags: [
//       { value: "music", label: "Music" },
//       { value: "retro", label: "Retro" },
//     ],
//   },
// ];

export const customStyles = {
  control: (baseStyles) => ({
    ...baseStyles,
    fontSize: "16px",
    color: "black",
    backgroundColor: "transparent",
    height: "100%",
    boxShadow: "none",
    border: "none",
    "&:hover": {
      border: "none",
    },
  }),
  input: (baseStyles) => ({
    ...baseStyles,
    outline: "none",
  }),
  clearIndicator: (baseStyles) => ({
    ...baseStyles,
    display: "none",
  }),
  dropdownIndicator: (base) => ({
    ...base,
    display: "none",
    color: "black",
    opacity: "70%",
    "&:hover": {
      opacity: "100%",
    },
  }),
  indicatorSeparator: (base) => ({
    ...base,
    display: "none",
  }),
  multiValue: (base, { data }) => ({
    ...base,
    backgroundColor: data.color || "#3c404320",
    borderRadius: "100px",
    padding: "3px 0 3px 6px",
    display: "flex",
    alignItems: "center",
  }),
  multiValueLabel: (base, { data }) => ({
    ...base,
    color: data.textColor || "#3c4043",
    fontWeight: "600",
    fontSize: "12px",
  }),
  multiValueRemove: (base, { data }) => ({
    ...base,
    color: data.textColor || "#333",
    cursor: "pointer",
    padding: "6px",
    borderRadius: "100%",
    ":hover": {
      backgroundColor: data.hoverColor || "#3c404340",
      color: "white",
    },
  }),
  menu: (base) => ({
    ...base,
    backgroundColor: "#fff",
    borderRadius: "8px",
    boxShadow: "0px 4px 12px rgba(0,0,0,0.2)", // Softer shadow for a modern look
    padding: "5px",
    margin: "30px 0 0 0",
  }),
  menuList: (base) => ({
    ...base,
    padding: "5px",
    maxHeight: "200px",
    overflowY: "auto",

    /* Firefox */
    // scrollbarWidth: "thin",
    // scrollbarColor: "#bbb #f1f1f1",

    /* Chrome, Edge, Safari */
    "&::-webkit-scrollbar": {
      width: "6px",
    },
    "&::-webkit-scrollbar-track": {
      background: "#f1f1f1",
      borderRadius: "10px",
    },
    "&::-webkit-scrollbar-thumb": {
      background: "#bbb",
      borderRadius: "10px",
      transition: "background 0.3s ease",
    },
    "&::-webkit-scrollbar-thumb:hover": {
      background: "#888",
    },
  }),
  option: (base, { isFocused, isSelected }) => ({
    ...base,
    backgroundColor: isFocused ? "#dfe6e9" : "#fff",
    color: isSelected ? "#fff" : "#2d3436",
    padding: "10px",
  }),
};
