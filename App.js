import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LoginScreen from "./app/screens/LoginScreen";
import { ClerkProvider, SignedIn, SignedOut } from "@clerk/clerk-expo";
import { Text } from "react-native";
import TabNavigation from "./app/navigations/TabNavigation";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <ClerkProvider publishableKey="pk_test_YXdhcmUtc3F1aXJyZWwtMTguY2xlcmsuYWNjb3VudHMuZGV2JA">
      <SignedIn>
        <NavigationContainer>
          <TabNavigation />
        </NavigationContainer>
      </SignedIn>
      <SignedOut>
        <LoginScreen />
      </SignedOut>
    </ClerkProvider>
  );
}
