import React from "react";
import { StyleSheet, View } from "react-native";
import SearchBar from "../component/SearchBar";
import UserList from "../container/UserList";
import { useTheme } from "../context/ThemeContext";


const Search = ({ navigation }) => {
    const [searchKey, setSearchKey] = React.useState(null);
    const [theme, setTheme] = useTheme();

    return (
        <View style={styles.root}>
            <View style={{ ...styles.searchBar, backgroundColor: theme.colors.card }}>
                <SearchBar onTextChange={setSearchKey} />
            </View>
            {
                searchKey &&
                <UserList navigation={navigation}
                    loader={(request, setList, setNext) => getUsers(request, setList, setNext, searchKey)}
                    loaderNext={getNext} />
            }
        </View>
    );
}

const styles = StyleSheet.create({
    root: {
        flex: 1,
    },
    searchBar: {
        width: "100%",
        padding: 20,
        marginTop: 30,
        elevation: 3,
        justifyContent: 'center',
    }
});

const getUsers = async (request, setList, setNext, key) => {

    const res = await request("api/user/list/" + key);

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

export default Search;
