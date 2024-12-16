const languageMap: { [key: string]: string } = {
  "en-US": "English",
  "es-ES": "Spanish",
};

export const getLanguageName = (code: string): string | undefined => {
  return languageMap[code];
};

export const getLanguageCode = (name: string): string | undefined => {
  const entry = Object.entries(languageMap).find(
    ([_, value]) => value === name
  );
  return entry ? entry[0] : undefined;
};
