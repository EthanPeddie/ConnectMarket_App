// import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LoginScreen from "./app/screens/LoginScreen";
import { ClerkProvider, SignedIn, SignedOut } from "@clerk/clerk-expo";
import { Text } from "react-native";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <ClerkProvider publishableKey="pk_test_YXdhcmUtc3F1aXJyZWwtMTguY2xlcmsuYWNjb3VudHMuZGV2JA">
      {/* <NavigationContainer>
        <Stack.Navigator> */}
      <SignedIn>
        <Text className="mt-10">You are Signed in</Text>
      </SignedIn>
      <SignedOut>
        <LoginScreen />
        {/* <Stack.Screen
              name="LoginScreen"
              component={LoginScreen}
              options={{ headerShown: false }}
            /> */}
      </SignedOut>
      {/* </Stack.Navigator> */}
      {/* </NavigationContainer> */}
    </ClerkProvider>
  );
}
