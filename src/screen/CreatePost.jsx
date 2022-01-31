import React from 'react';
import { StyleSheet, View, ScrollView, Switch, Text, ActivityIndicator } from 'react-native';
import TextInput from '../component/TextInput';
import { useTheme } from '../context/ThemeContext';
import ImageInput from '../component/ImageInput';
import ButtonList from '../component/ButtonActions';
import { useRequest } from '../context/RequestContext';


const CreatePost = ({ navigation }) => {
    const [input, setInput] = React.useState({ images: [] });
    const [errors, setErrors] = React.useState({ images: [] });
    const [processing, setProcessing] = React.useState(false);
    const [theme, setTheme] = useTheme();
    const request = useRequest();

    const handleChange = (key, value) => {
        input[key] = value;
        setInput({ ...input });
    }

    const handleImageChange = (list) => {
        setInput({ ...input, images: list });
    }

    const handlePress = () => {
        if (processing) return;
        create(request, input, setProcessing, setErrors, navigation);
    }

    return (
        <ScrollView showsHorizontalScrollIndicator={false}>
            <View style={styles.root}>
                <TextInput onChangeText={(input) => handleChange("title", input)} placeholder="Title..." />
                <TextInput onChangeText={(input) => handleChange("description", input)} placeholder="Description..." multiline />
                <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center' }}>
                    <Text style={{ color: theme.colors.text }}>Private</Text>
                    <Switch value={input?.is_private} onChange={() => handleChange('is_private', !input?.is_private)} />
                </View>
                <ImageInput onChange={handleImageChange} list={input.images} theme={theme} />
                <ButtonList style={{ borderRadius: 10, width: '100%', height: 30, borderColor: 'blue', borderWidth: 0.5 }}
                    onPress={() => handlePress()}
                    effectWidth={1}
                    index={processing ? 0 : 1}>
                    <View style={{ width: '100%', height: 30, justifyContent: 'center', alignItems: 'center', overflow: 'hidden' }} >
                        <ActivityIndicator color="blue" size="small" />
                    </View>
                    <View style={{ width: '100%', height: 30, justifyContent: 'center', alignItems: 'center', overflow: 'hidden' }}>
                        <Text style={{ color: theme.colors.text }}>Save</Text>
                    </View>
                </ButtonList>
            </View>
        </ScrollView>
    );
}


const styles = StyleSheet.create({
    root: {
        flexDirection: 'column',
        padding: 25,
    },
    cont: {
        position: 'relative',
        borderWidth: 0.5,
        flexDirection: 'row',
        flexWrap: 'wrap',
        borderRadius: 1,
        borderStyle: 'dashed',
        justifyContent: 'center',
        marginVertical: 25,
    },
    itemCont: {
        width: '45%',
        height: '100%',
        aspectRatio: 1,
        borderRadius: 1,
        borderStyle: 'dashed',
        borderWidth: 1,
        margin: 5,
        justifyContent: 'center',
        alignItems: 'center',
    }
});

const create = async (request, { title = "", description = "", is_private = false, images = [] }, setProcessing, setErrors, navigation) => {
    setProcessing(true);

    const form = new FormData();
    title && form.append("title", title);
    description && form.append("description", description);
    form.append("is_private", is_private);

    images.forEach((element, i) => {
        const [type] = element.uri.split('.').reverse();

        const file = {
            uri: element.uri,
            type: "image/" + type,
            name: ("img" + i + '.' + type),
        };
        form.append("image", file);
    });

    const res = await request("api/post/", "POST", form);

    if (res){
        if (res.ok) {
            navigation.goBack();
            return;
    
        } else if (res.status === 400) {
            const js = await res.json();
            setErrors({ ...js });
        }
    }

    setProcessing(false);
}

export default CreatePost;