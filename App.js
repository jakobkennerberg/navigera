import React from 'react';
import { StyleSheet, Text, View, SafeAreaView } from 'react-native';
import ProductList from "./components/ProductList";
import CameraScreen from './Camera';
import SearchPage from './components/SearchPage';
import MapPage from './components/MapPage';
import { createMaterialTopTabNavigator } from 'react-navigation-tabs';
import { createAppContainer } from 'react-navigation';
import { Icon } from "@up-shared/components";
import { setCustomText } from 'react-native-global-props';


export default class App extends React.Component {
	constructor(props) {
		super(props);

		setCustomText(customTextProps);

		this.addItemCallback = this.addItemCallback.bind(this);
		this.removeItemCallback = this.removeItemCallback.bind(this);
	}

	state = {
		products: [],
	};

	render() {
		return (
			<SafeAreaView style={styles.container}>
				<AppContainer screenProps={{
					products: this.state.products,
					modalVisible: this.state.modalVisible,
					addItemCallback: this.addItemCallback,
					removeItemCallback: this.removeItemCallback,
				}}/>
			</SafeAreaView>
		);
	}

	removeItemCallback(id, num){
		var list = this.state.products;
		for(var i = 0; i < list.length; i++){
			if(list[i].product_info.id == id){
				if(list[i].amount > num){
					list[i].amount -= num;
					break;
				} else {
					list.splice(i, 1);
					break;
				}
			}
		}
		this.setState({ products: list });
	}

	addItemCallback(item, num){
		var exists = false;
		var list = this.state.products;
		for(var i = 0; i < list.length; i++){
			if(list[i].product_info.id == item.product_info.id){
				exists = true;
				if(list[i].amount){
					//item exists with an amount
					list[i].amount += num;
				} else {
					//item exists with no amount
					list[i].amount = num + 1;
				}
			}
		}
		if(!exists){
			//item does not exist
			item.amount = num;
			list.push(item);
		}
		this.setState({ products: list });
	}
}

const AppTabNavigator = createMaterialTopTabNavigator({
	Camera: {
		screen: CameraScreen,
		navigationOptions: {
			tabBarLabel: 'Camera',
			tabBarIcon: ({ tintColor }) => (
				<Icon name="scan" size={30} color={tintColor} />
			)
		}
	},
	// Search: {
	// 	screen: SearchPage,
	// 	navigationOptions: {
	// 		tabBarLabel: 'Search',
	// 		tabBarIcon: ({ tintColor }) => (
	// 			<Icon name="search-24" size={30} color={tintColor} />
	// 		)
	// 	}
	// },
	List: {
		screen: ProductList,
		navigationOptions: {
			tabBarLabel: 'List',
			tabBarIcon: ({ tintColor }) => (
				<Icon name="list" size={30} color={tintColor} />
			)
		}
	},
	// Map: {
	// 	screen: MapPage,
	// 	navigationOptions: {
	// 		tabBarLabel: 'Map',
	// 		tabBarIcon: ({ tintColor }) => (
	// 			<Icon name="store" size={30} color={tintColor} />
	// 		)
	// 	}
	// },
},
	{
		initialRouteName: 'Camera',
		tabBarPosition: 'bottom',
		swipeEnabled: true,
		lazy: true,
		tabBarOptions: {
			activeTintColor: 'blue',
			inactiveTintColor: 'black',
			style: {
				backgroundColor: 'white',
				height: 50,
			},
			iconStyle: {
				width: 30,
				margin: 0,
			},
			indicatorStyle: {
				height: 0.
			},
			showIcon: true,
			showLabel: false,
		},
	}
);

const AppContainer = createAppContainer(AppTabNavigator);

const customTextProps = {
	style: {
		fontFamily: 'NotoIKEAArabic-Regular' // light gray
	}
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: 'white',
	},
});
