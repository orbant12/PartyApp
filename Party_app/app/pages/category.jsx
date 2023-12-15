//<********************************************>
//LAST EDITED DATE: 2023.12.03
//EDITED BY: Orban Tamas
//DESCRIPTION: This is the category page, where the user can choose from the categories
//<********************************************>

//COMPONENTS
import React,{ useState } from 'react';
import { StyleSheet, TextInput, View, FlatList,Text } from 'react-native';


export default function TabTwoScreen({navigation}) {

//<********************VARIABLES************************>

//POSTS
const [posts, setPosts] = useState([1]);

//<********************FUNCTIONS************************>

//NAVIGATION LOGIC | CATEEGORY INPUT
const handleNavigation = (type) => {
  navigation.navigate('SelectedCategoryPage', { navigation:navigation });
}

return (
<View style={styles.container}>
  <FlatList
  
    data={posts}
    ListHeaderComponent={
      <View>
        <Text>Time till refresh</Text>
        <Text style={styles.gridText}>Categories</Text>
      </View>
    }
    renderItem={({ item }) => (
      <View>
        <Text>Valamasood</Text>
      </View>
    )}
    style={styles.gridContainer}
  />
</View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
  },
  searchBar: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    width: '80%',
    marginVertical: 20,
    paddingHorizontal: 10,
    borderRadius: 10,
  },
  gridContainer: {
    flexDirection: 'column',
    width: '100%', // Set the width of the grid container
    marginTop:30
  },
  gridRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  gridItem: {
    flex: 1,
    aspectRatio: 1, // To make the boxes square
    backgroundColor: `url('https://picsum.photos/seed/picsum/200')`,
    marginHorizontal: 5,
    width: '48%', // Adjusted width to accommodate spacing
  },
  gridText:{
    fontSize: 20,
    fontWeight: "800",
    color: "#fff",
    marginTop:50,
    textAlign: 'center',
    textAlignVertical: 'center',
  },
  gridImage:{
   flex: 1, 
   aspectRatio: 1,
    marginVertical: 10,
    marginHorizontal: 10,
    width: '100%',
    borderColor:"balck",
    borderWidth: 2,
    blurRadius:10,
    

  }
});
