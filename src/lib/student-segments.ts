export const STUDENT_SEGMENT_OPTIONS = [
  "Educação Infantil",
  "Ensino Fundamental I",
  "Ensino Fundamental II",
  "Ensino Médio",
  "EJA",
] as const;

export type StudentSegment = (typeof STUDENT_SEGMENT_OPTIONS)[number];
