import React, { Component } from 'react';
import { View, StyleSheet, Button, TouchableOpacity, Text, Image, Dimensions, Alert } from 'react-native';
import t from 'tcomb-form-native';
import moment from "moment";
import DateTimePicker from '@react-native-community/datetimepicker';
import ImagePicker from 'react-native-image-picker';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scrollview'
import AsyncStorage from '@react-native-community/async-storage';

const width = Dimensions.get('window').width
const height = Dimensions.get('window').height

const Form = t.form.Form;

const User = t.struct({
    Name: t.String,
    Email: t.String,
    PersontoVisit: t.String,
    Typeofvisit: t.enums({
        'MET': 'Meeting',
        'DEL': 'Delivery',
        'PER': 'Personal'
    }, 'Country'),
    Dateofentry: t.Date,
});

const options = {
    fields: {
        Dateofentry: {
            label: "Date of entry",
            mode: 'date', // display the Date field as a DatePickerAndroid
            config: {
                format: (date) => {
                    return moment(date).format('DD-MM-YYYY');
                }
            }

        },
        Name: {
            label: "Name",
            placeholder: ' Please enter your name '
        },
        Email: {
            label: "Email",
            placeholder: ' Please enter your email '
        },
        PersontoVisit: {
            label: "Person to Visit",
            placeholder: 'Name the person to meet'
        },
        Typeofvisit: {
            label: "Type of visit",
            placeholder: 'Name the person to meet'
        }
    }
};

// const optionsImage = {
//     title: 'Select Avatar',
//     customButtons: [{ name: 'fb', title: 'Choose Photo from Facebook' }],
//     storageOptions: {
//         skipBackup: true,
//         path: 'images',
//     },
// };

export default class UserInfo extends Component {
    constructor(props) {
        super(props)
        this.state = {
            avatarSource: null
        }
    }
    componentDidMount() {
        AsyncStorage.getItem('vendorDetails').then((logvendor) => {
            let vendorDetails = JSON.parse(logvendor)
            console.log("vendorDetails", vendorDetails)
        })
     
    }
    clearForm() {
        // clear content from all textbox
        this.setState({ value: null });
      }

    handleSubmit = () => {
        const value = this._form.getValue();
        console.log('value: ', value)
        if (value && (value.Name && value.Email && value.PersontoVisit && value.Typeofvisit && value.Dateofentry) && this.state.avatarSource) {
           let wholeInfo={
            vendorDetails:value,
            vemdorImage:this.state.avatarSource
           }
            AsyncStorage.setItem('vendorDetails',wholeInfo)
            alert('Data successfully saved!')
            console.log('value: ', value, this.state.avatarSource);
            this.clearForm();
        } else {
            Alert.alert("Error", "Please fill all the details.")
        }
    }
    chooseImage = () => {
        ImagePicker.showImagePicker(options, (response) => {
            console.log('Response = ', response);

            if (response.didCancel) {
                console.log('User cancelled image picker');
            } else if (response.error) {
                console.log('ImagePicker Error: ', response.error);
            } else if (response.customButton) {
                console.log('User tapped custom button: ', response.customButton);
            } else {
                const source = { uri: response.data };

                // You can also display the image using data:
                // const source = { uri: 'data:image/jpeg;base64,' + response.data };

                this.setState({
                    avatarSource: source.uri,
                });
                console.log("this,state.avatar source", this.state.avatarSource)
            }
        });
    }


    render() {
        return (
            <KeyboardAwareScrollView>
                <View style={styles.container}>
                    <Image
                        style={styles.tinyLogo}
                        source={this.state.avatarSource ? { uri: `data:image/gif;base64,${this.state.avatarSource}` } : require('../assets/images/dummyuser.png')}
                    />
                    <TouchableOpacity onPress={this.chooseImage} style={styles.btnSection}  >
                        <Text style={styles.btnText}>Click me to take photo</Text>
                    </TouchableOpacity>

                    <Form
                        ref={c => this._form = c}
                        value={this.state.value}
                        type={User}
                        options={options}
                    />

                    <Button
                        title="Sign Up!"
                        onPress={this.handleSubmit}
                    />



                </View>
            </KeyboardAwareScrollView>

        );
    }
}

const styles = StyleSheet.create({
    container: {
        height: height * 0.9,
        justifyContent: 'center',
        padding: 20,
        backgroundColor: '#ffffff',
    },
    tinyLogo: {
        width: "25%",
        height: "15%",
        margin: "5%"
    },
    btnText: {
        color: 'gray',
        fontSize: 20,
        fontWeight: 'bold',
        paddingVertical: "2%"
    },
    entryexittime: {
        fontSize: 18,
        marginTop: "5%"
    },
    btnSection: {
        marginBottom: "3%"
    }
});