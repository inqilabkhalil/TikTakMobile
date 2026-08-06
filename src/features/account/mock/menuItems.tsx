import type { FC } from 'react';
import type { SvgProps } from 'react-native-svg';

import InfoIcon from '../../../shared/assets/icons/info.svg';
import FavoritesIcon from '../../../shared/assets/icons/favorites.svg';
import HistoryIcon from '../../../shared/assets/icons/history.svg';
import LogoutIcon from '../../../shared/assets/icons/logout.svg';

export interface MenuItemData {
  id: string;
  Icon: FC<SvgProps>;
  title: string;
}

export const MENU_ITEMS: MenuItemData[] = [
  {
    id: 'account-info',
    Icon: InfoIcon,
    title: 'Hesab məlumatlarım',
  },
  {
    id: 'favorites',
    Icon: FavoritesIcon,
    title: 'Siyahılarım',
  },
  {
    id: 'order-history',
    Icon: HistoryIcon,
    title: 'Sifariş tarixçəsi',
  },
  {
    id: 'logout',
    Icon: LogoutIcon,
    title: 'Çıxış',
  },
];