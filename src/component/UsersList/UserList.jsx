import React from "react";
import { ActivityIndicator, FlatList } from "react-native";
import FollowButton from "../component/FollowButton";
import User from "../component/User";
import { useAuth } from "../context/AuthContext";
import { useRequest } from "../context/RequestContext";
import { useTheme } from "../context/ThemeContext";


const defaultMap = (user, showUser) => {
    return <User onPress={showUser} user={user} >
        <FollowButton user={user} />
    </User>
}


const UserList = ({ ListHeaderComponent, loader, loaderNext, navigation, map = defaultMap }) => {
    const [list, setList] = React.useState([]);
    const [next, setNext] = React.useState(null);
    const [processing, setProcessing] = React.useState(false);
    const [theme] = useTheme();
    const [auth] = useAuth();
    const request = useRequest();


    React.useEffect(() => {
        loader(request, setList, setNext);
    }, [loader]);

    const handleScroll = (e) => {
        if (e.nativeEvent.contentOffset.y + 10 >= (e.nativeEvent.contentSize.height - e.nativeEvent.layoutMeasurement.height)) {
            if (!processing) {
                loaderNext(request, next, setList, setNext, setProcessing);
            }
        }
    }

    const showUser = (user) => {
        if (!navigation) return;

        if (user?.username === auth.user?.username) {
            navigation.navigate('Profile', { screen: 'Profile', });
            return;
        }

        navigation.navigate('ShowUser', { username: user?.username });
    }

    return (
        <FlatList style={{ flex: 1 }}
            data={list}
            stickyHeaderIndices={ListHeaderComponent ? [0] : null}
            onScroll={(e) => handleScroll(e)}
            ListHeaderComponent={ListHeaderComponent}
            ListFooterComponent={next !== null && <ActivityIndicator color={theme.colors.text} size="large" />}
            keyExtractor={(item, index) => "key" + index}
            renderItem={({ item }) => map(item, showUser)}
        />
    );
}

export default UserList;