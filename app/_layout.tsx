import { Stack } from "expo-router";
import AuthCheck from './components/AuthCheck';

export default function RootLayout() {
  return( 
  <Stack
  screenOptions={{
    headerShown: false,
    animation: 'slide_from_right',
  }}
/>
) 
}
