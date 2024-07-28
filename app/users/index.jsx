import React from "react";
import { View } from "react-native";
import AcceptButton from "@/components/AcceptButton";
import SearchBar from "@/components/SearchBar";
import User from "@/components/UsersList/User";
import UserList from "@/components/UsersList/UserList";
import { useLocalSearchParams, useNavigation } from "expo-router";

const ShowUserList = () => {
    const [searchKey, setSearchKey] = React.useState(null);
    const params = useLocalSearchParams();
    const navigation = useNavigation();

    
    React.useLayoutEffect(() => {
        navigation.setOptions({
            title: params.type,
        });
    }, [navigation, params]);


    return (
        <View style={{ flex: 1 }}>
            <SearchBar onTextChange={setSearchKey} />
            {
                <UserList navigation={navigation}
                    loader={(request, setList, setNext) => getUsers(request, setList, setNext, searchKey, params.username, params.type)}
                    map={(e, showUser) => map(e, showUser, params.type)}
                    loaderNext={getNext} />
            }
        </View>
    );
}


const map = (e, showUser, type) => {

    if (type === "followers" || type === "requests") {
        return (
            <User user={e?.user} onPress={showUser} >
                {
                    !e.is_verified && <AcceptButton follow={e} />
                }
            </User>
        )
    }

    return <User user={e?.following} onPress={showUser} />
}


const getUsers = async (request, setList, setNext, key, username, type) => {

    var url = "";
    var quary = "?";

    type === "requests" ? (quary += "unverified=true") : (quary += "unverified=false");

    key && (quary += "&key=" + key);

    if (type === "following") {
        url = `api/follow/${username}/following/list`;
    } else if (type === "followers" || type === "requests") {
        url = `api/follow/${username}/followers/list`;
    }

    const res = await request(url + quary);

    if (res.ok) {
        const js = await res.json();
        setNext(js.next);
        setList(js.results);
    }
}

const getNext = async (request, next, setList, setNext, setProcessing) => {
    if (!next) return;

    setProcessing(true);

    const res = await request(next);

    if (res.ok) {
        const js = await res.json();
        setNext(js.next);
        setList(e => ([...e, ...js.results]));
    }

    setProcessing(false);
}

export default ShowUserList;