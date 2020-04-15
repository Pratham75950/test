import * as React from 'react';
import { View, Text,Button } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import  UserInfo from './src/screens/userInfo';
import  LatestNews from './src/screens/latesNews';
function HomeScreen() {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Home Screen</Text>
    </View>
  );
}
function Root() {
  return (
      <Stack.Navigator>
        <Stack.Screen name="Visitor Log" component={UserInfo} 
         options={({ navigation, route }) => ({
          headerLeft: () => (
            <Button
              onPress={() => navigation.openDrawer()}
              title="Menu"
              color="black"
            />
          )
        })}
        />
      </Stack.Navigator>
  );
}

function Latestnews() {
  return (
      <Stack.Navigator>
          <Stack.Screen name="Latest News" component={LatestNews} 
         options={({ navigation, route }) => ({
          headerLeft: () => (
            <Button
              onPress={() => navigation.openDrawer()}
              title="Menu"
              color="black"
            />
          )
        })}
        />
      </Stack.Navigator>
  );
}

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();
function App() {
  return (
    <NavigationContainer>
    <Drawer.Navigator initialRouteName="Visitor"
    >
      <Drawer.Screen name="Root" component={Root} 
       />
      <Drawer.Screen name="Latestnews" component={Latestnews} />
    </Drawer.Navigator>
  </NavigationContainer>
  );
}

export default App;
