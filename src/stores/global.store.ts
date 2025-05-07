import { create } from "zustand";

export interface IScreenSize {
  height: number;
  width: number;
  screen: "desktop" | "tablet" | "mobile";
}

export interface IGlobalStore {
  screenSize: IScreenSize;
  setScreenSize: (size: Pick<IScreenSize, "height" | "width">) => void;
}

export const useGlobalStore = create<IGlobalStore>((set, get) => ({
  screenSize: {
    width: 0,
    height: 0,
    screen: "desktop",
    size: "greaterThan1367",
  },
  setScreenSize: ({ width, height }) => {
    set({
      screenSize: {
        width,
        height,
        screen: screenCalculator(width),
      },
    });
  },
}));

const screenCalculator = (width: number): IScreenSize["screen"] => {
  if (width <= 800 && width > 450) {
    return "tablet";
  } else if (width <= 450) {
    return "mobile";
  } else {
    return "desktop";
  }
};
