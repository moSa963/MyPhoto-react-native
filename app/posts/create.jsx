import React from 'react';
import { StyleSheet, View, ScrollView, Switch, Text } from 'react-native';
import TextInput from '@/components/TextInput';
import { useTheme } from '@/hooks/ThemeContext';
import ImageInput from '@/components/ImageInput/ImageInput';
import { useRequest } from '@/hooks/RequestContext';
import { useNavigation } from 'expo-router';
import LoadingButton from "@/components/Buttons/LoadingButton";
import ThemedText from "@/components/ThemedText";

const CreatePost = () => {
    const [input, setInput] = React.useState({});
    const [processing, setProcessing] = React.useState(false);
    const { theme } = useTheme();
    const request = useRequest();
    const navigation = useNavigation()

    const handleChange = (key, value) => {
        input[key] = value;
        setInput({ ...input });
    }

    const handleImageChange = (list) => {
        setInput({ ...input, images: list });
    }

    const handlePress = async () => {
        if (processing) return;

        setProcessing(true);

        if (await create(request, input)) {
            navigation.goBack();
        }

        setProcessing(false);
    }

    return (
        <ScrollView showsHorizontalScrollIndicator={false}>
            <View style={styles.root}>
                <TextInput onChangeText={(input) => handleChange("title", input)} placeholder="Title..." />
                <TextInput onChangeText={(input) => handleChange("description", input)} placeholder="Description..." multiline />

                <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center' }}>
                    <Text style={{ color: theme.colors.text }}>Private</Text>
                    <Switch value={Boolean(input?.private)} onChange={() => handleChange('private', !input?.private)} />
                </View>

                <ImageInput onChange={handleImageChange} list={input.images || []} />

                <LoadingButton processing={processing} onPress={handlePress}>
                    <ThemedText type="defaultSemiBold" >Save</ThemedText>
                </LoadingButton>
            </View>
        </ScrollView>
    );
}


const styles = StyleSheet.create({
    root: {
        flexDirection: 'column',
        padding: 25,
    },
    button: {
        width: '100%',
        height: 30,
        justifyContent: 'center',
        alignItems: 'center',
        overflow: 'hidden'
    }
});

const create = async (request, post) => {

    const form = new FormData();
    post.title && form.append("title", post.title);
    post.description && form.append("description", post.description);
    post?.private != undefined && form.append("private", post.private);

    post.images?.forEach((element, i) => {
        const [type] = element.uri.split('.').reverse();

        const file = {
            uri: element.uri,
            type: "image/" + type,
            name: ("img" + i + '.' + type),
        };

        form.append("images", file);
    });

    const res = await request("api/posts/", "POST", form, "all");

    return res && res.ok;
}

export default CreatePost;