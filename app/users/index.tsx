import React, { useMemo } from "react";
import { View } from "react-native";
import SearchBar from "@/components/SearchBar";
import { useLocalSearchParams, useNavigation } from "expo-router";
import UserList from "@/components/UsersList/UserList";

const ShowUserList = () => {
    const [searchKey, setSearchKey] = React.useState<string | null>(null);
    const params = useLocalSearchParams();
    const navigation = useNavigation();

    const url = useMemo(() => {
        switch (params.type) {
            case "following": return `api/follow/${params.username}/following/list`;
            case "followers": return `api/follow/${params.username}/followers/list`;
            default: return `api/follow/${params.username}/followers/list?unverified=true`;
        }
    }, [searchKey, params]);

    React.useLayoutEffect(() => {
        navigation.setOptions({
            title: params.type,
        });
    }, [navigation, params]);

    return (
        <View style={{ flex: 1 }}>
            <SearchBar onTextChange={setSearchKey} />
            <UserList
                url={url}
                request={params.type == "requests"}
                itemExtractor={(item) => item.user}
            />
        </View>
    );
}

export default ShowUserList;