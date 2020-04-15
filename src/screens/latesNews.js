import React, { Component } from 'react';
import { View, StyleSheet, Button, TouchableOpacity, Text, Image, Dimensions, Alert } from 'react-native';

const width = Dimensions.get('window').width
const height = Dimensions.get('window').height




export default class LatestNews extends Component {
    constructor(props) {
        super(props)
        this.state = {
           
        }
    }
    

    render() {
        return (
           
                <View style={styles.container}>
              </View>
           

        );
    }
}

const styles = StyleSheet.create({
    container: {
        height: height * 0.9,
        justifyContent: 'center',
        padding: 20,
        backgroundColor: '#ffffff',
    }
});