import React from "react";
import { ActivityIndicator, ScrollView, StyleSheet, Text, View } from "react-native";
import ButtonList from "./ButtonActions";
import TextInput from "./TextInput";
import { Validator } from "../http/Validator";
import { AuthStatus, Types } from "../context/AuthContext";

const validator = new Validator({
    first_name: {min: 3, max: 50},
    last_name:  {min: 3, max: 50},
    username:   {min: 3, max: 50, match:/^[A-Za-z]+([._-]?[A-Za-z0-9]+)*$/s},
    email:      {min: 8, max: 50, match:/^[a-zA-z]+([._]?[a-zA-z0-9]+)*[@][a-zA-z]+[.][a-zA-z]+$/s},
    password:   {min: 8, max: 50},
    password_confirmation: { min: 8, max: 50, confirm: 'password'},
});


const SignupCard = ({ auth, setAuth })=>{
    const [input, setInput] = React.useState({});
    const [errors, setErrors] = React.useState({});

    const handlePress = ()=>{
        const errs = validator.validate(input);
        
        if (errs){
            setErrors(errs);
            return;
        }
        
        setAuth(Types.SIGNUP, input, setErrors);
    }

    const handleChange = (key, value = "")=>{
        input[key] = value;
        setInput({...input});
        errors[key] = validator.validateOne(key, input);
        setErrors({...errors});
    }


    return (
        <ScrollView  contentContainerStyle={styles.root} 
        nestedScrollEnabled={true}

                showsVerticalScrollIndicator={false}
                overScrollMode="never"
            >
                <TextInput placeholder="First name..."
                    error={errors?.first_name}
                    onChangeText={(text)=>handleChange('first_name', text)}/>
                
                <TextInput placeholder="Last name..."
                    error={errors?.last_name}
                    onChangeText={(text)=>handleChange('last_name', text)}/>

                <TextInput placeholder="Username..."
                    error={errors?.username}
                    onChangeText={(text)=>handleChange('username', text)}/>

                <TextInput placeholder="Email..."
                    textContentType="emailAddress"
                    error={errors?.email}
                    onChangeText={(text)=>handleChange('email', text)} />

                <TextInput placeholder="Password" 
                    error={errors?.password}
                    secureTextEntry 
                    textContentType="password" 
                    onChangeText={(text)=>handleChange('password', text)} />

                <TextInput placeholder="password confirmation..." 
                    error={errors?.password_confirmation}
                    secureTextEntry 
                    textContentType="password" 
                    onChangeText={(text)=>handleChange('password_confirmation', text)} />

                <ButtonList style={{borderRadius: 10, width: '100%', height: 30, borderColor: 'blue', borderWidth: 0.5}}
                    onPress={handlePress}
                    effectWidth={1}
                    index={auth.status !== AuthStatus.WAITING === false ? 0 : 1}>

                    <View style={styles.button} >
                        <ActivityIndicator color="blue"  size="small"/>
                    </View>
                    <View style={styles.button}>
                        <Text>SignUp</Text>
                    </View>
                    
                </ButtonList>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    root:{
        padding: 15, 
    },
    button: {
        width: '100%', 
        height: 30, 
        justifyContent: 'center', 
        alignItems: 'center', 
        overflow: 'hidden'
    }
});

export default SignupCard;