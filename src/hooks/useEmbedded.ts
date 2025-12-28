export const useEmbedded = () => {
  const isEmbedded = process.env.NEXT_PUBLIC_IS_EMBEDDED === "true";
  return { isEmbedded };
};
