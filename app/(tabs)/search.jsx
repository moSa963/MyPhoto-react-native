import React from "react";
import { StyleSheet, View } from "react-native";
import SearchBar from "@/components/SearchBar";
import UserList from "@/components/UsersList/UserList";
import { useTheme } from "@/hooks/ThemeContext";


const Search = () => {
    const [searchKey, setSearchKey] = React.useState(null);
    const { theme } = useTheme();

    return (
        <View style={styles.root}>
            <View style={[styles.searchBar, { backgroundColor: theme.colors.card }]}>
                <SearchBar onTextChange={setSearchKey} />
            </View>
            {
                searchKey && <UserList url={`api/users/list?key=${searchKey}`} />
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

export default Search;
