import { COLORS } from "@/assets/colors/colors";

export const colorAutoSelector = (id: number) => {
  switch (id % 5) {
    case 0:
      return COLORS.orange5;
    case 1:
      return COLORS.orange4;
    case 2:
      return COLORS.orange3;
    case 3:
      return COLORS.orange2;
    case 4:
      return COLORS.gray1;
  }
};
