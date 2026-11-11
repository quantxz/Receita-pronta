import { StyleSheet, View, ScrollView, Text, Pressable, TextInput } from 'react-native';
import MenuIcon from '../../assets/menu-alt-1-svgrepo-com.svg';
import TrashIcon from '../../assets/trash-xmark-svgrepo-com.svg';

import { useEffect, useRef, useState } from 'react';
import { Texts } from '@/constants/Texts';
import Colors from '@/constants/Colors';
import AppTabs from '@/components/app-tabs';
import { IngredientModal } from '@/components/IngredientModal';
import { SaveRecipeModal } from '@/components/SaveRecipeModal';
import { FirebaseService } from '@/Services/firebase/Firebase_service';
import { auth, db } from '../../data/firebase_config';
import { Tomatos } from '@/constants/Tomatos';

export default function ReceitasScreen() {
  const [itens, setItens] = useState([])

  const [ingredientModal, setIngredientModal] = useState(false)
  const [saveRecipeModal, setsaveRecipeModal] = useState(false)
  const [prepareMode, setPrepareMode] = useState("");

  const firebaseService = useRef<FirebaseService | null>(null);

  useEffect(() => {
    firebaseService.current = new FirebaseService(db, auth);
  }, []);

  return (
    <View style={styles.container}>
      <IngredientModal open={ingredientModal} setItens={setItens} setOpen={setIngredientModal} itens={itens} />
      <SaveRecipeModal open={saveRecipeModal} itens={itens} setOpen={setsaveRecipeModal} dbService={firebaseService.current} prepareMode={prepareMode} />
      <View style={Tomatos.decorations} pointerEvents="none">
        <Text style={Tomatos.tomato1}>🍅</Text>
        <Text style={Tomatos.tomato2}>🍅</Text>
        <Text style={Tomatos.tomato3}>🍅</Text>
        <Text style={Tomatos.tomato4}>🍅</Text>
        <Text style={Tomatos.tomato5}>🍅</Text>
      </View>
      <View style={styles.header}>
        <MenuIcon
          width={35}
          height={35}
          style={styles.menu}
        />
      </View>

      <ScrollView
        style={styles.content}
        contentContainerStyle={styles.contentInner}
      >
        <View style={styles.ingredientsContainer}>
          <View style={styles.ingredients}>
            {itens.map((ingredient: any, index) => (
              <View style={styles.ingredientContainer} key={ingredient.id}>
                <View style={styles.ingredient}>
                  <Text style={Texts.IngredientTitle}>{ingredient.nome}</Text>
                  <Text style={Texts.IngredientSubtitle}>{ingredient.quantia}g</Text>

                </View>
                <Pressable
                  onPress={() => {
                    setItens(prev =>
                      prev.filter(item => item.id !== ingredient.id)
                    );
                  }}
                >
                  <TrashIcon width={35} height={35} />
                </Pressable>
              </View>
            ))}

            <Pressable
              style={styles.AddButton}
              onPress={() => setIngredientModal(true)}
            >
              <Text style={styles.AddButtonText}>
                Adicionar ingrediente
              </Text>
            </Pressable>
          </View>

        </View>
      </ScrollView>

      <View style={styles.PrepareMode}>
        <TextInput style={styles.PrepareModeInput}
          multiline={true}
          textAlignVertical="top"
          value={prepareMode}
          onChangeText={setPrepareMode}
          placeholder="Descreva o modo de preparo..." />
      </View>

      <View style={styles.SaveButtonsContainer}>

        <Pressable
          style={styles.SaveButton}
          onPress={() => setsaveRecipeModal(true)}
        >
          <Text style={styles.SaveButtonText}>
            Salvar receita
          </Text>
        </Pressable>

        <Pressable
          style={styles.SaveButton}
          onPress={() => setsaveRecipeModal(true)}
        >
          <Text style={styles.SaveButtonText}>
            Salvar e publicar receita
          </Text>
        </Pressable>

      </View>

    </View >
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
    padding: 10,
  },

  header: {
    height: 70,
    justifyContent: "center",
    alignItems: "flex-start",
  },

  content: {
    flex: 1,
  },
  menu: {
    position: "absolute",
    top: 30,
    left: 15
  },

  contentInner: {
    paddingVertical: 15,
    alignItems: "center",
  },

  ingredientsContainer: {
    width: "100%",
    borderRadius: 15,
    padding: 15,
    alignItems: "stretch",
  },

  ingredients: {
    width: "100%",
    flexDirection: "column",
    gap: 15,
  },

  ingredientContainer: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },

  ingredient: {
    flex: 1,
    minWidth: 0,
    minHeight: 50,
    borderRadius: 15,
    padding: "5",
    paddingLeft: "15",
    backgroundColor: Colors.surface,
    alignItems: "flex-start",
    justifyContent: "center",
    color: Colors.primary
  },

  AddButton: {
    width: "100%",
    minHeight: 50,
    backgroundColor: Colors.button,
    borderRadius: 15,
    padding: 12,
    alignItems: "center",
    marginTop: 25
  },

  AddButtonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "600",
  },

  PrepareMode: {
    width: "100%",
    minHeight: 200,
    backgroundColor: Colors.deep,
    borderRadius: 15,
    marginBottom: 20,
    borderWidth: 1.5,
    borderColor: "#11111146"
  },

  PrepareModeInput: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "flex-start",
    textAlign: "start"
  },

  SaveButtonsContainer: {
    width: "100%",
    minHeight: 100,
    marginBottom: 15,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    padding: 12,
    gap: 10
  },

  SaveButton: {
    width: "50%",
    minHeight: 65,
    backgroundColor: Colors.button,
    borderRadius: 15,
    padding: 12,
    alignItems: "center",
    justifyContent: "center",
    textAlign: "center"
  },

  SaveButtonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "600",
    alignItems: "center",
    justifyContent: "center",
    textAlign: "center"
  },
});