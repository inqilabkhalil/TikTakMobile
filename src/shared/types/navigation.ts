import type { NavigatorScreenParams } from '@react-navigation/native';

export type AuthStackParamList = {
  Welcome: undefined;
  Login: undefined;
  Register: undefined;
};

export type HomeStackParamList = {
  HomeMain: undefined;
  Products: { categoryId: number; categoryName: string };
};

export type AccountStackParamList = {
  AccountHome: undefined;
  PersonalInfo: undefined;
  OrderHistory: undefined;
  OrderDetail: undefined;
  Favorites: undefined;
};

export type BasketStackParamList = {
  BasketHome: undefined;
  Checkout: undefined;
  OrderSuccess: undefined;
};

export type MainTabParamList = {
  Home: NavigatorScreenParams<HomeStackParamList> | undefined;
  Search: undefined;
  Account: NavigatorScreenParams<AccountStackParamList> | undefined;
};

export type RootStackParamList = {
  Auth: NavigatorScreenParams<AuthStackParamList> | undefined;
  Main: NavigatorScreenParams<MainTabParamList> | undefined;
  Basket: NavigatorScreenParams<BasketStackParamList> | undefined;
};
