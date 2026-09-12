export const matchesFaq = (question: string, answer: string, query: string): boolean => {
  const normalize = (value: string) => value.toLocaleLowerCase().replace(/ё/g, "е").trim();
  return normalize(query)
    .split(/\s+/)
    .filter(Boolean)
    .every((word) => normalize(`${question} ${answer}`).includes(word));
};
