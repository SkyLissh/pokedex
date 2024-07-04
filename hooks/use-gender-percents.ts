export function useGenderPercents(genderRate?: number) {
  if (!genderRate) return { male: 0, female: 0 };

  const percent = (genderRate * 100) / 8;

  return {
    male: 100 - percent,
    female: percent,
  };
}
