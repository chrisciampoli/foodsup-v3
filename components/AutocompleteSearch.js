import React, { useState, useEffect } from 'react';
import { View, TextInput, FlatList, TouchableOpacity, Text, Image } from 'react-native';
import sanityClient from "../sanity";
import { useNavigation } from '@react-navigation/native'

const people = [
    {
        id: 1,
        name: 'Leslie Alexander',
        imageUrl:
            'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    },
    {
        id: 2,
        name: 'Michael Davis',
        imageUrl:
            'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    },
    {
        id: 3,
        name: 'Jessica Johnson',
        imageUrl:
            'https://images.unsplash.com/photo-1544005313-94ddf0286df2?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    },
    {
        id: 4,
        name: 'Maria Rodriguez',
        imageUrl:
            'https://images.unsplash.com/photo-1517849845537-4d257902454a?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    },
];

export default function AutocompleteSearch() {
    const [query, setQuery] = useState('');
    const [showSuggestions, setShowSuggestions] = useState(false);
    const [suggestions, setSuggestions] = useState([]);
    const navigation = useNavigation();

    const handleSelectSuggestion = (item) => {
        setShowSuggestions(false);  // hide suggestions when a person is selected
        // Lets then go to the restaurant screen
        navigation.navigate("Restaurant", {
          key: item._id,
          id:item._id,
          imgUrl: item.image,
          title:item.name,
          rating:item.rating,
          genre:item.type?.name,
          address:item.address,
          short_description: item.short_description,
          dishes: item.dishes,
          long: item.long,
          lat: item.lat
        })
    };


    useEffect(() => {
        if (query.length > 0) {
            sanityClient
            .fetch(`*[_type == "restaurant" && name match "${query}*"]{
              ...,
              dishes[]->{
                ...,
                "restaurant": ^-> {
                  ...,
                }
              }
            }`)
            .then((res) => setSuggestions(res))
            .catch((err) => console.error(err));
          }
    }, [query]);

    return (
        <View>
            <View>
                <TextInput
                    value={query}
                    onChangeText={text => {
                        setQuery(text);
                        setShowSuggestions(true);  // show suggestions when text is entered
                    }}
                    placeholder="Start typing"
                />
                {query !== '' && showSuggestions && (
                    <FlatList
                        data={suggestions}
                        keyExtractor={(item) => item._id.toString()}
                        renderItem={({ item }) => (
                            <TouchableOpacity onPress={() => handleSelectSuggestion(item)} style={({ pressed }) => ({
                                backgroundColor: pressed ? 'lightgray' : 'white',
                            })}>
                                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                    <Image
                                        source={{ uri: item.imageUrl }}
                                        style={{ width: 50, height: 50, borderRadius: 25 }}
                                    />
                                    <Text>{item.name}</Text>
                                </View>
                            </TouchableOpacity>
                        )}
                    />
                )}
            </View>
        </View>
    );
}