
import {
  StyleSheet,
  View,
  TextInput,
  Text,
  ScrollView,
  Pressable,
} from 'react-native';
import { SideMenu } from '@/components/SideMenu';

import SearchIcon from '../../assets/search-svgrepo-com.svg';
import MenuIcon from '../../assets/menu-alt-1-svgrepo-com.svg';
import Eye from '../../assets/eye-svgrepo-com.svg';

import { useEffect, useRef, useState } from 'react';
import Colors from '@/constants/Colors';
import { Texts } from '@/constants/Texts';
import { Tomatos } from '@/constants/Tomatos';
import { auth, db } from '../../data/firebase_config';
import { FirebaseService } from '@/Services/firebase/Firebase_service';
import { useRouter } from 'expo-router';

type Receita = {
  id: string;
  nome: string;
  prepareMode: string;
};

export default function HomeScreen() {
  const [text, onChangeText] = useState('');
  const firebaseService = useRef<FirebaseService | null>(null);
  const [receitas, setReceitas] = useState<Receita[]>([]);
  const [menuVisible, setMenuVisible] = useState(false);
  const router = useRouter();

  useEffect(() => {
    firebaseService.current = new FirebaseService(db, auth);

    async function carregarReceitas() {
      try {
        const dados = await firebaseService.current?.getReceitas(6);
        setReceitas((dados ?? []) as Receita[]);
        console.log(dados);
      } catch (error) {
        console.error('Erro ao carregar receitas:', error);
      }
    }

    carregarReceitas();
  }, []);

  const abrirReceita = (id: string) => {
    router.push({
      pathname: '/Recipe',
      params: { id: String(id) },
    });
  };

  const renderReceitas = (titulo: string) => (
    <View style={styles.CardsContainers}>
      <Text style={Texts.h1}>{titulo}</Text>

      {receitas.map((item) => (
        <View key={String(item.id)} style={styles.card}>
          <View style={styles.CardInfos}>
            <Text style={Texts.Title}>
              {item.nome}
            </Text>

            <Text style={Texts.h2} numberOfLines={2}>
              {item.prepareMode}
            </Text>
          </View>

          <Pressable onPress={() => abrirReceita(item.id)}>
            <Eye width={35} height={35} />
          </Pressable>
        </View>
      ))}
    </View>
  );

  return (
    <View style={styles.MainScreen}>
      <View style={Tomatos.decorations} pointerEvents="none">
        <Text style={Tomatos.tomato1}>🍅</Text>
        <Text style={Tomatos.tomato2}>🍅</Text>
        <Text style={Tomatos.tomato3}>🍅</Text>
        <Text style={Tomatos.tomato4}>🍅</Text>
        <Text style={Tomatos.tomato5}>🍅</Text>
      </View>
      <SideMenu
        visible={menuVisible}
        onClose={() => setMenuVisible(false)}
      />
      <View style={styles.HeaderContainer}>
        <Pressable onPress={() => setMenuVisible(true)}>
          <MenuIcon width={35} height={35} />
        </Pressable>

        <View style={styles.SerchBar}>
          <SearchIcon width={25} height={25} />

          <TextInput
            style={styles.SearchInput}
            value={text}
            onChangeText={onChangeText}
            placeholder="Pesquise por uma receita"
          />
        </View>
      </View>

      <ScrollView
        style={styles.ContentContainer}
        contentContainerStyle={styles.Content}
        showsVerticalScrollIndicator={false}
      >
        {renderReceitas('Receitas mais vistas na semana')}
        {renderReceitas('As mais bombadas')}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  MainScreen: {
    flex: 1,
    justifyContent: 'flex-start',
    flexDirection: 'column',
    alignItems: 'center',
    paddingTop: '15%',
    backgroundColor: Colors.background,
  },

  HeaderContainer: {
    width: '100%',
    height: '10%',
    flexDirection: 'row',
    gap: 15,
    padding: 10,
  },

  SerchBar: {
    width: '85%',
    height: '70%',
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 15,
    paddingLeft: 10,
    borderWidth: 2,
  },

  SearchInput: {
    color: '#000',
    flex: 1,
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
    width: '100%',
    flexDirection: 'column',
    padding: 5,
    gap: 12,
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
    flex: 1,
    flexDirection: 'column',
    padding: 5,
  },
});
