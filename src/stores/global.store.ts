import { MOBILE_SIZE, TABLET_SIZE } from "@/utils/theme";
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
  if (width <= TABLET_SIZE && width > MOBILE_SIZE) {
    return "tablet";
  } else if (width <= MOBILE_SIZE) {
    return "mobile";
  } else {
    return "desktop";
  }
};
