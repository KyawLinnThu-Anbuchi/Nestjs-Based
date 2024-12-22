import { Global, Module } from '@nestjs/common';
import { TranslationService } from './translationService';
import { I18nTranslationLoader } from './i18nTranslateLoader';

@Global()
@Module({
  imports: [],
  providers: [TranslationService, I18nTranslationLoader],
  exports: [TranslationService, I18nTranslationLoader],
})
export class TranslationModule {}
