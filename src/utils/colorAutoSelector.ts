import { COLORS } from "@/assets/colors/colors";

function hashToSevenBuckets(str) {
  let hash = 5381;
  for (let i = 0; i < str.length; i++) {
    hash = (hash * 33) ^ str.charCodeAt(i);
  }
  return Math.abs(hash) % 7; // 결과: 0 ~ 6
}

export const colorAutoSelector = (id: string) => {
  const hashedId = hashToSevenBuckets(id);
  switch (hashedId) {
    case 0:
      return COLORS.orange0;
    case 1:
      return COLORS.orange1;
    case 2:
      return COLORS.orange2;
    case 3:
      return COLORS.orange3;
    case 4:
      return COLORS.orange4;
    case 5:
      return COLORS.orange5;
    case 6:
      return COLORS.orange6;
    case 7:
      return COLORS.gray1;
  }
};
