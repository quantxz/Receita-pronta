import { StyleSheet, View, TextInput, Text, FlatList, ScrollView } from 'react-native';
import SearchIcon from '../../assets/search-svgrepo-com.svg';
import MenuIcon from '../../assets/menu-alt-1-svgrepo-com.svg';
import Eye from '../../assets/eye-svgrepo-com.svg';
import { SearchBar } from 'react-native-screens';
import { useState } from 'react';
import Colors from '@/constants/Colors';
import { Texts } from '@/constants/Texts';
import { Tomatos } from '@/constants/Tomatos';

export default function HomeScreen() {
  const [text, onChangeText] = useState('Pesquise por uma receita')
  const receitas = [
    { id: 1, titulo: 'Bolo', desc: "asmdiujas8duhnasiudnuia8sdnhuasnbduyiasbnd" },
    { id: 2, titulo: 'Bolinho', desc: "asydubasuydghaysudgbyuiasbdyu" },
    { id: 3, titulo: 'Bolão', desc: "asdhbyuasdguysabgyudb7asuydbyuhsbaud" },
    { id: 4, titulo: 'Bolão', desc: "asdhbyuasdguysabgyudb7asuydbyuhsbaud" },
  ];

  return (
    <View style={styles.MainScreen}>
      <View style={Tomatos.decorations} pointerEvents="none">
        <Text style={Tomatos.tomato1}>🍅</Text>
        <Text style={Tomatos.tomato2}>🍅</Text>
        <Text style={Tomatos.tomato3}>🍅</Text>
        <Text style={Tomatos.tomato4}>🍅</Text>
        <Text style={Tomatos.tomato5}>🍅</Text>
      </View>
      <View style={styles.HeaderContainer}>
        <MenuIcon
          width={35}
          height={35}
        />

        <View style={styles.SerchBar}>
          <SearchIcon
            width={25}
            height={25}
          />
          <TextInput style={styles.SearchInput} onChangeText={onChangeText}
            placeholder={text} />
        </View>
      </View>


      <ScrollView style={styles.ContentContainer} contentContainerStyle={styles.Content}>

        <FlatList
          style={styles.CardsContainers}
          data={receitas}
          keyExtractor={(item) => item.id.toString()}

          contentContainerStyle={styles.ListContent}

          ListHeaderComponent={
            <Text style={Texts.h1}>
              Receitas mais vistas na semana
            </Text>
          }

          renderItem={({ item }) => (
            <View style={styles.card}>
              <View style={styles.CardInfos}>
                <Text style={Texts.Title}>{item.titulo}</Text>
                <Text style={Texts.h2}>{item.desc}</Text>
              </View>

              <Eye width={35} height={35} />
            </View>
          )}

          ItemSeparatorComponent={() => (
            <View style={{ height: 12 }} />
          )}

          showsVerticalScrollIndicator={false}
        />

        <FlatList
          style={styles.CardsContainers}
          data={receitas}
          keyExtractor={(item) => item.id.toString()}

          contentContainerStyle={styles.ListContent}

          ListHeaderComponent={
            <Text style={Texts.h1}>
              As mais bombadas
            </Text>
          }

          renderItem={({ item }) => (
            <View style={styles.card}>
              <View style={styles.CardInfos}>
                <Text style={Texts.Title}>{item.titulo}</Text>
                <Text style={Texts.h2}>{item.desc}</Text>
              </View>

              <Eye width={35} height={35} />
            </View>
          )}

          ItemSeparatorComponent={() => (
            <View style={{ height: 12 }} />
          )}

          showsVerticalScrollIndicator={false}
        />
      </ScrollView>

    </View>
  );
}



const styles = StyleSheet.create({
  MainScreen: {
    flex: 1,
    justifyContent: 'flex-start',
    flexDirection: 'column',
    alignItems: "center",
    paddingTop: "15%",
    backgroundColor: Colors.background,
  },

  HeaderContainer: {
    width: "100%",
    height: "10%",
    display: "flex",
    flexDirection: "row",
    gap: 15,
    padding: 10,
  },

  SerchBar: {
    width: "85%",
    height: "70%",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 15,
    paddingLeft: 10,
    borderWidth: 2
  },
  SearchInput: {
    color: "#000"
  },

  ContentContainer: {
    flex: 1,
    width: '100%',
  },

  Content: {
    padding: 15,
    paddingBottom: 50,
    gap: 35,
  },

  CardsContainers: {
    width: "100%",
    height: "90%",
    display: "flex",
    flexDirection: "column",
    padding: 5,
    gap: 5
  },

  card: {
    width: '100%',
    minHeight: 100,
    flexDirection: 'row',
    padding: 10,
    alignItems: 'center',
    gap: 15,
    borderWidth: 2,
    borderRadius: 15,
    backgroundColor: Colors.surface,
    borderColor: Colors.border,
  },

  CardInfos: {
    width: "85%",
    height: "90%",
    display: "flex",
    flexDirection: "column",
    padding: 5
  },

  ListContent: {
    paddingBottom: 20,
    gap: 10,
  },


})
