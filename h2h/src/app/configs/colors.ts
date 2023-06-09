const COLOR_NAMES = [
  // "veryPeri",
  "illuminating",
  // "classicBlue",
  "livingCoral",
  "ultraViolet",
  "greenery",
  "serenity",
  "marsala",
  "radiandOrchid",
  "emerald",
  "tangerineTango",
  "honeysucle",
  "turquoise",
  "mimosa",
  "blueIris",
  "chiliPepper",
  // "blueTurquoise",
  "tigerlily",
  "aquaSky",
  // "trueRed",
  "fuchsiaRose",
] as const;

export const COLOR_SHADES: Record<
  typeof COLOR_NAMES[number],
  [string, string, string, string, string, string, string, string, string, string]
> = {
  // veryPeri: [
  //   "#eeeeff",
  //   "#cdcee9",
  //   "#adadd4",
  //   "#8c8dc1",
  //   "#6b6cae",
  //   "#515294",
  //   "#3f4074",
  //   "#2c2e54",
  //   "#1a1b35",
  //   "#080818",
  // ],
  illuminating: [
    "#fffbdd",
    "#fbf2b3",
    "#f8e985",
    "#f6e156",
    "#f3d829",
    "#d9be12",
    "#a99409",
    "#796a04",
    "#483f00",
    "#1a1500",
  ],
  // classicBlue: [
  //   "#e6f2ff",
  //   "#c4d5ee",
  //   "#a1b9dd",
  //   "#7d9dce",
  //   "#5981c0",
  //   "#3f67a6",
  //   "#315082",
  //   "#22395e",
  //   "#12223b",
  //   "#020b1a",
  // ],
  livingCoral: [
    "#ffe2e0",
    "#ffb2b1",
    "#ff867f",
    "#ff5c4d",
    "#fe201b",
    "#e5010a",
    "#b30014",
    "#810019",
    "#4f0017",
    "#20000d",
  ],
  ultraViolet: [
    "#f0edfe",
    "#d3cfe7",
    "#b5b0d1",
    "#9990bc",
    "#7e71a8",
    "#66578e",
    "#4d4470",
    "#353051",
    "#1e1c32",
    "#090a18",
  ],
  greenery: [
    "#edf9e4",
    "#d6e9c4",
    "#bfd9a4",
    "#a8ca81",
    "#93ba5e",
    "#7ca145",
    "#5c7d34",
    "#3d5924",
    "#203713",
    "#051300",
  ],
  serenity: [
    "#e7f2ff",
    "#c7d4ec",
    "#a4b7da",
    "#819bca",
    "#5f7eba",
    "#4565a0",
    "#354e7e",
    "#25385b",
    "#142239",
    "#040b19",
  ],
  marsala: [
    "#ffece8",
    "#eacccb",
    "#d5acab",
    "#c18c8b",
    "#ae6b6a",
    "#955251",
    "#753f3f",
    "#552c2c",
    "#35191a",
    "#1a0505",
  ],
  radiandOrchid: [
    "#ffebfa",
    "#eac9e4",
    "#d8a8cf",
    "#c686bb",
    "#b564a6",
    "#9b4a8d",
    "#7a396f",
    "#57284f",
    "#361731",
    "#170415",
  ],
  emerald: [
    "#dafff1",
    "#adffdf",
    "#7dffd0",
    "#4dffc4",
    "#24ffbc",
    "#12e6a9",
    "#00b389",
    "#008059",
    "#004e30",
    "#001c0e",
  ],
  tangerineTango: [
    "#ffe5e3",
    "#fabeba",
    "#f09890",
    "#e87463",
    "#e05338",
    "#c72e1f",
    "#9c1917",
    "#6f0f14",
    "#45060c",
    "#1e0008",
  ],
  honeysucle: [
    "#ffe6f3",
    "#f5bfd4",
    "#e997b3",
    "#de6d92",
    "#d3456d",
    "#ba2c5d",
    "#922150",
    "#69163f",
    "#410b2a",
    "#1d0012",
  ],
  turquoise: [
    "#defbf4",
    "#c0ece2",
    "#9eddd0",
    "#7bcec1",
    "#58c0b3",
    "#3fa79c",
    "#2e8273",
    "#1d5e4f",
    "#09392b",
    "#00160b",
  ],
  mimosa: [
    "#fff7de",
    "#fae6b5",
    "#f4d589",
    "#f0c45b",
    "#ecb32f",
    "#d29a16",
    "#a4780f",
    "#755509",
    "#473301",
    "#1a1100",
  ],
  blueIris: [
    "#ecefff",
    "#cccee9",
    "#acaed4",
    "#8b8dc1",
    "#6a6dae",
    "#515395",
    "#3f4175",
    "#2c2e55",
    "#1a1c36",
    "#080819",
  ],
  chiliPepper: [
    "#ffe7e8",
    "#f5c0bf",
    "#e99698",
    "#de6d73",
    "#d44551",
    "#ba2b3c",
    "#922132",
    "#69161e",
    "#400b0d",
    "#1c0301",
  ],
  // blueTurquoise: [
  //   "#dff7fa",
  //   "#c3e8ea",
  //   "#a3d7d9",
  //   "#81c8c8",
  //   "#60b9b5",
  //   "#469d9f",
  //   "#34767c",
  //   "#225059",
  //   "#0c2c36",
  //   "#001015",
  // ],
  tigerlily: [
    "#ffe9e3",
    "#f9c4ba",
    "#ef9f90",
    "#e77964",
    "#df5439",
    "#c63a20",
    "#9b2c18",
    "#6f1e11",
    "#451007",
    "#1e0200",
  ],
  aquaSky: [
    "#e1f8fb",
    "#c2e8eb",
    "#a1d9db",
    "#7fcdcd",
    "#5db8bf",
    "#4498a5",
    "#327080",
    "#214c5c",
    "#0c2938",
    "#000c14",
  ],
  // trueRed: [
  //   "#ffe6e6",
  //   "#f8bdbe",
  //   "#ed9399",
  //   "#e36874",
  //   "#da3e52",
  //   "#c1253d",
  //   "#971b27",
  //   "#6d1115",
  //   "#430908",
  //   "#1d0200",
  // ],
  fuchsiaRose: [
    "#ffe8f3",
    "#f1c3d7",
    "#e29dba",
    "#d5779f",
    "#c75183",
    "#ae386a",
    "#882a52",
    "#631d3b",
    "#3d1023",
    "#1a020e",
  ],
};

export const COLORS = {
  roseQuartz: "#F7CAC9",
  sandDollar: "#DFCFBE",
  ceruleanBlue: "#98B4D4",
  ultimateGray: "#939597",
};
