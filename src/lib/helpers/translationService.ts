import { Inject, Injectable } from '@nestjs/common';
import { CustomPrismaService } from 'nestjs-prisma';
import { ExtendedPrismaClient } from './prisma.extension';

@Injectable()
export class TranslationService {
  constructor(
    @Inject('PrismaService')
    private prisma: CustomPrismaService<ExtendedPrismaClient>
  ) {}

  async getSupportedLanguages() {
    const supportedLanguages = await this.prisma.client.lang.findMany({
      where: {
        status: 'ACTIVE',
      },
    });
    return supportedLanguages.map((lang) => lang.shortName.toLowerCase());
  }

  async getTranslations(language: string) {
    const translations = await this.prisma.client.translation.findMany({
      where: {
        Lang: {
          shortName: language.toUpperCase() || 'EN',
        },
      },
    });

    return translations.reduce((acc, translation) => {
      acc[translation.key] = translation.value;
      return acc;
    }, {});
  }
}
