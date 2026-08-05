## Tip (Type) Konvensiyası

- Heç bir **export olunan** TypeScript `interface`/`type` komponentin öz `.tsx` faylının içində qalmamalıdır.
- Hər qat öz `types/` qovluğuna malik olmalıdır: `src/app/types/`, `src/screens/types/`, `src/shared/types/` (feature-lər əlavə olunduqca `src/features/<ad>/types/`).
- Qayda: tip yalnız 1 faylda istifadə olunursa, həmin qatın öz `types/` qovluğuna yazılsın.
- Tip 2+ fərqli qatda/ekranda istifadə olunursa, `src/shared/types/`-ə köçürülsün.
- Naviqasiya tipləri (`MainTabParamList`, `RootStackParamList` və s.) `src/app/types/navigation.ts`-də saxlanılsın.
- **İstisna:** export edilməyən, yalnız o faylın öz daxili funksiyaları üçün istifadə olunan çox kiçik köməkçi type-lar (məs. `type TabIconProps = {...}`) faylın içində qala bilər — bunlar "public" API deyil, sırf daxili detaldır.
