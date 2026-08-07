## Tip (Type) Konvensiyası

- Heç bir **export olunan** TypeScript `interface`/`type` komponentin öz `.tsx` faylının içində qalmamalıdır.
- `src/app/` **təmiz saxlanılmalıdır** — öz `types/` qovluğu olmamalıdır. `src/app/`-da istifadə olunan tiplər (naviqasiya daxil) birbaşa `src/shared/types/`-ə yazılır.
- Digər qatlar öz `types/` qovluğuna malik ola bilər: `src/shared/types/` (feature-lər əlavə olunduqca `src/features/<ad>/types/`). Ekranlar (`src/app/screens/`) `app/`-ın bir hissəsi olduğu üçün öz `types/` qovluğuna malik deyil — eyni qayda tətbiq olunur.
- Qayda: tip yalnız 1 faylda istifadə olunursa, həmin qatın öz `types/` qovluğuna yazılsın (`src/app/` istisnadır — həmişə `src/shared/types/`).
- Tip 2+ fərqli qatda/ekranda istifadə olunursa, `src/shared/types/`-ə köçürülsün.
- Naviqasiya tipləri (`MainTabParamList`, `RootStackParamList` və s.) `src/shared/types/navigation.ts`-də saxlanılsın.
- **İstisna:** export edilməyən, yalnız o faylın öz daxili funksiyaları üçün istifadə olunan çox kiçik köməkçi type-lar (məs. `type TabIconProps = {...}`) faylın içində qala bilər — bunlar "public" API deyil, sırf daxili detaldır.

## Fayl Strukturu Konvensiyası

- Ekranlar (screen components) `src/app/screens/` daxilində saxlanılır — `app/` qatının bir hissəsidir, çünki ekranlar naviqasiyanın composition-una aiddir.
- `features/<domen>/components/` daxilindəki kiçik, təkrar istifadə oluna bilən komponentlər ekranların daxilində yığılıb tam bir ekran halına gətirilir.
- Naviqasiya faylları (`Navigation.tsx`, `BottomTabs.tsx`) yalnız `app/screens/`-dən ekran import edib qeydiyyata alır.

## Müvəqqəti Dev Alətləri

- `src/app/DevNavigationSheet.tsx` — yalnız development mərhələsi üçün əlavə olunmuş, bütün ekranlara sürətli keçid üçün bottom sheet menyusu. Real istifadəçi tərəfindən görünməməlidir, production-a çıxmadan əvvəl silinməlidir.
- Bu komponenti silmək üçün: `App.tsx`-dən `<DevNavigationSheet />` çağırışını çıxar, `src/app/DevNavigationSheet.tsx` faylını sil.
- İstifadəçi "dev navigation sheet-i sil" desə, bu addımları birbaşa tətbiq et, əlavə sual vermə.

### Müvəqqəti Dev Alətləri (davamı)

- `RootNavigator` (`src/app/Navigation.tsx`) hazırda **həm `Main`, həm `Auth` route-larını** eyni vaxtda qeydiyyata alır (yalnız `initialRouteName` `isLoggedIn`-ə görə seçilir). Bu, **müvəqqəti** bir strukturdur — məqsədi, `DevNavigationSheet`-in development zamanı istənilən ekrana (login vəziyyətindən asılı olmadan) sərbəst keçid edə bilməsidir.
- **Real production strukturunda bu, belə OLMAMALIDIR** — real istifadəçi üçün `Main` və `Auth` **qarşılıqlı istisna edici** olmalıdır (istifadəçi ya login olub `Main`-i görür, ya olmayıb `Auth`-u görür, ikisi eyni anda "mövcud" olmamalıdır).
- İstifadəçi "DevNavigationSheet-i sil" desə, bunu da et: `RootNavigator`-u əvvəlki (şərti, yalnız bir route mövcud olan) formasına qaytar:
```tsx
{isLoggedIn ? (
  <Stack.Screen name="Main" component={MainTabs} />
) : (
  <Stack.Screen name="Auth" component={AuthNavigator} />
)}
```
- Yəni "DevNavigationSheet-i sil" tapşırığı 2 hissədən ibarətdir: (1) `DevNavigationSheet.tsx` faylını və `App.tsx`-dəki çağırışını sil, (2) `RootNavigator`-u yuxarıdakı şərti (conditional) formaya qaytar. Hər ikisini et, əlavə sual vermə.
