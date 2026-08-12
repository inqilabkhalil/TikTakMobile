import type { HomeCategoryItem } from '../types/homeCategory';

const CATEGORY_IMAGE = require('../../../shared/assets/images/pam.png');

export const CATEGORIES: HomeCategoryItem[] = Array.from({ length: 9 }, (_, index) => ({
  id: `category-${index + 1}`,
  title: 'Tərəvəz',
  image: CATEGORY_IMAGE,
}));
