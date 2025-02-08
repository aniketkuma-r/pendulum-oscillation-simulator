import { Language } from "../enums/language";
import { PendulumEnglishLanguageEnums } from "../enums/pendulumEnglishLanguageEnums";
import { PendulumHindiLanguageEnums } from "../enums/pendulumHindiLanguageEnums";

interface TextParams {
  key: string;
  LanguageId: Language;
}

export const getTextByLanguage = ({ key, LanguageId }: TextParams): string => {
  switch (LanguageId) {
    case Language.ENGLISH:
      return (PendulumEnglishLanguageEnums as any)[key] || key;
    case Language.HINDI:
      return (PendulumHindiLanguageEnums as any)[key] || key;
  }
};
