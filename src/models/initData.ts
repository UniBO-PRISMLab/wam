import { License, Lang } from './choice';

export interface InitData {
  name: string;
  version: string;
  description: string;
  keywords: string | string[];
  author: string;
  license: License;
  selfVersion: string;
  language: Lang;
}
