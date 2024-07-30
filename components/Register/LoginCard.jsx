import React from "react";
import { ScrollView, StyleSheet, Text, View, ActivityIndicator } from "react-native";
import ButtonList from "@/components/Buttons/ButtonActions";
import TextInput from "@/components/TextInput";
import { useAuth } from "@/hooks/AuthContext";
import { Validator } from "@/utils/Validator";

const validator = new Validator({
    username: { min: 3, max: 50, match: /^[A-Za-z]+([._-]?[A-Za-z0-9]+)*$/s },
    password: { min: 8, max: 50, }
});

const LoginCard = () => {
    const [input, setInput] = React.useState({});
    const [errors, setErrors] = React.useState({});
    const auth = useAuth();

    const handlePress = () => {
        const errs = validator.validate(input);

        if (errs) {
            setErrors(errs);
            return;
        }

        auth.login(input);
    }

    const handleChange = (key, value = "") => {
        input[key] = value;
        setInput({ ...input });
        errors[key] = validator.validateOne(key, input);
        setErrors({ ...errors });
    }

    return (
        <ScrollView contentContainerStyle={styles.root}
            nestedScrollEnabled={true}
            showsVerticalScrollIndicator={false}
            overScrollMode="never"
        >
            <TextInput placeholder="Username..."
                error={errors?.username}
                onChangeText={(text) => handleChange('username', text)} />

            <TextInput placeholder="Password"
                error={errors?.password}
                secureTextEntry
                textContentType="password"
                onChangeText={(text) => handleChange('password', text)} />

            <ButtonList style={{ borderRadius: 10, width: '100%', height: 30, borderColor: 'blue', borderWidth: 0.5 }}
                onPress={handlePress}
                effectWidth={1}
                index={auth.status !== "waiting" === false ? 0 : 1}>
                <View style={styles.button} >
                    <ActivityIndicator color="blue" size="small" />
                </View>
                <View style={styles.button}>
                    <Text>Login</Text>
                </View>
            </ButtonList>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    root: {
        padding: 30,
    },
    button: {
        width: '100%',
        height: 30,
        justifyContent: 'center',
        alignItems: 'center',
        overflow: 'hidden'
    }
});

export default LoginCard;