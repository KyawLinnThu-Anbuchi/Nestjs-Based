import { Injectable } from '@nestjs/common';
import { I18nLoader, I18nTranslation } from 'nestjs-i18n';
import { TranslationService } from './translationService';
import { Observable } from 'rxjs';

@Injectable()
export class I18nTranslationLoader implements I18nLoader {
  constructor(private readonly translationService: TranslationService) {
    console.log('injected #####################');
  }
  async languages(): Promise<string[] | Observable<string[]>> {
    const languages = await this.translationService.getSupportedLanguages();
    console.log('language called log');
    console.log(languages);
    return languages;
  }

  async load(): Promise<I18nTranslation | Observable<I18nTranslation>> {
    console.log('loading...');
    const languages = await this.translationService.getSupportedLanguages();
    const translations = {};

    for (const language of languages) {
      translations[language] =
        await this.translationService.getTranslations(language);
    }

    return translations;
  }
}
