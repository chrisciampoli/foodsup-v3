import React, { useState, useEffect } from 'react';
import { TextInput, View, Text, FlatList } from 'react-native';
import axios from 'axios';

const SanityAutocomplete = () => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const { data } = await axios.get(
        `https://YOUR_SANITY_API_ENDPOINT.cdn.sanity.io/data/query?query=*[_type == "YOUR_TYPE_NAME" && title match "${query}*"]{title}`
      );
      setResults(data.result);
    };
    if (query.length > 2) {
      fetchData();
    }
  }, [query]);

  return (
    <View>
      <TextInput
        style={{ height: 40, borderColor: 'gray', borderWidth: 1 }}
        onChangeText={(text) => setQuery(text)}
        value={query}
        placeholder="Search for a product"
      />
      <FlatList
        data={results}
        renderItem={({ item }) => <Text>{item.title}</Text>}
        keyExtractor={(item) => item._id}
      />
    </View>
  );
};

export default SanityAutocomplete;
