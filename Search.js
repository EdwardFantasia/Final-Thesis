import { TextInput, View, Text, SafeAreaView } from "react-native";
import SearchedUser from "./SearchedUser";
import { Searchbar } from "react-native-paper";

export default function Search(props){
    return(
        <SafeAreaView style = {{paddingTop: '15%'}}>
            <View style = {{alignItems: 'center'}}>
                <Text style = {{fontSize: 19, textAlign: 'center'}}>Search Users</Text>
                <Searchbar style = {{marginHorizontal: '5%', borderStyle: "solid", borderWidth: 1, borderRadius: 10, textAlign: 'center', backgroundColor: 'rgba(0, 0, 0, 0)', marginBottom: 10}} theme={{ colors: { primary: 'blue' } }} />
                <SearchedUser></SearchedUser>
            </View>
        </SafeAreaView>
    )
}