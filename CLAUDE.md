## Tip (Type) Konvensiyası

- Heç bir **export olunan** TypeScript `interface`/`type` komponentin öz `.tsx` faylının içində qalmamalıdır.
- `src/app/` **təmiz saxlanılmalıdır** — öz `types/` qovluğu olmamalıdır. `src/app/`-da istifadə olunan tiplər (naviqasiya daxil) birbaşa `src/shared/types/`-ə yazılır.
- Digər qatlar öz `types/` qovluğuna malik ola bilər: `src/screens/types/`, `src/shared/types/` (feature-lər əlavə olunduqca `src/features/<ad>/types/`).
- Qayda: tip yalnız 1 faylda istifadə olunursa, həmin qatın öz `types/` qovluğuna yazılsın (`src/app/` istisnadır — həmişə `src/shared/types/`).
- Tip 2+ fərqli qatda/ekranda istifadə olunursa, `src/shared/types/`-ə köçürülsün.
- Naviqasiya tipləri (`MainTabParamList`, `RootStackParamList` və s.) `src/shared/types/navigation.ts`-də saxlanılsın.
- **İstisna:** export edilməyən, yalnız o faylın öz daxili funksiyaları üçün istifadə olunan çox kiçik köməkçi type-lar (məs. `type TabIconProps = {...}`) faylın içində qala bilər — bunlar "public" API deyil, sırf daxili detaldır.
