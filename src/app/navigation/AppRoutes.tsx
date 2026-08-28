import { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import BootSplash from 'react-native-bootsplash';
import { useHasHydrated } from '@/shared/store';
import RootNavigator from './Navigation';

/**
 * Single, central place for "what should the app boot into" decisions.
 *
 * Today that's just one gate: wait for the MMKV-backed user store to
 * rehydrate before mounting the real navigator. Zustand's persist rehydration
 * is asynchronous even though MMKV reads are synchronous (see
 * src/shared/store/userStore.ts's onRehydrateStorage), so without this gate
 * RootNavigator can render on the default (logged-out) state and flash the
 * login screen even though the user is still authenticated — this happens on
 * every cold start, including the common Android case where the OS silently
 * kills the JS engine while the app is backgrounded and a "quick return" is
 * actually a fresh cold start.
 *
 * Future boot-time conditions — a force-update check, resolving a deep link's
 * initial route, an onboarding-complete flag, etc. — should be added HERE as
 * additional gates before <RootNavigator /> mounts, instead of being spread
 * across individual navigators.
 */
function AppRoutes() {
  const hasHydrated = useHasHydrated();

  useEffect(() => {
    // Splash-hide bug fix preserved: only hide once hydration confirms the
    // real auth state, so the native splash covers the brief "not yet known"
    // window instead of the navigator flashing the wrong root screen.
    if (hasHydrated) {
      BootSplash.hide({ fade: true });
    }
  }, [hasHydrated]);

  if (!hasHydrated) {
    return null;
  }

  return (
    <NavigationContainer>
      <RootNavigator />
    </NavigationContainer>
  );
}

export default AppRoutes;
