/* eslint-disable */
import * as Router from 'expo-router';

export * from 'expo-router';

declare module 'expo-router' {
  export namespace ExpoRouter {
    export interface __routes<T extends string = string> extends Record<string, unknown> {
      StaticRoutes: `/` | `/(auth)` | `/(auth)/` | `/(auth)/onboarding` | `/(auth)/signin` | `/(auth)/signup` | `/(main)` | `/(main)/(tabs)` | `/(main)/(tabs)/dishes` | `/(main)/(tabs)/home` | `/(main)/(tabs)/profile` | `/(main)/DishForm` | `/(main)/Settings` | `/(main)/dishes` | `/(main)/home` | `/(main)/profile` | `/(tabs)` | `/(tabs)/dishes` | `/(tabs)/home` | `/(tabs)/profile` | `/DishForm` | `/Settings` | `/_sitemap` | `/dishes` | `/home` | `/onboarding` | `/profile` | `/signin` | `/signup`;
      DynamicRoutes: never;
      DynamicRouteTemplate: never;
    }
  }
}
