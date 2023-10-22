import { Text, StyleSheet, View, useWindowDimensions, StatusBar } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import * as React from 'react';
import { TabView, SceneMap, TabBar } from 'react-native-tab-view';
import { themeColor } from "../../utils/theme";

const FirstRoute = () => (
  <View style={{ flex: 1, backgroundColor: '#fff' }} />
);

const SecondRoute = () => (
  <View style={{ flex: 1, backgroundColor: '#fff' }} />
);
const ThirdRoute = () => (
  <View style={{ flex: 1, backgroundColor: '#fff' }} />
);
const renderScene = SceneMap({
  first: FirstRoute,
  second: SecondRoute,
  third: ThirdRoute,
});


export default function BookingScreen() {
  const layout = useWindowDimensions();

  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    { key: 'first', title: 'Đang hoạt động' },
    { key: 'second', title: 'Đã qua' },
    { key: 'third', title: 'Đã hủy' },
  ]);


  return (
    <SafeAreaView style={styles.container}>

      <View style={styles.header}>
        <Text style={styles.headerText}>Chuyến đi</Text>
        <Ionicons style={styles.iconhelp} name="help-circle-outline"></Ionicons>
      </View>


      <TabView
        navigationState={{ index, routes }}
        renderScene={renderScene}
        onIndexChange={setIndex}
        initialLayout={{ width: layout.width }}
        renderTabBar={renderTabBar}
      />
    </SafeAreaView>

  )
}
const renderTabBar = props => (
  <TabBar
    {...props}
    indicatorStyle={{ backgroundColor: 'white' }}
    style={{ backgroundColor: '#0891b2' }}
  />
);
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    backgroundColor: themeColor.bgColor,
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerText: {
    flex: 10,
    color: '#fff',
    fontSize: 24,
    marginVertical: 10
  },
  iconhelp: {
    flex: 1.5,
    fontSize: 32,
    color: '#fff',
    marginBottom: 10,
    marginRight: 20,
  },
})