import Colors from "@/constants/Colors";
import { useEffect, useState } from "react";
import { View, StyleSheet, TextInput, Pressable, Text, Alert, Switch } from "react-native";
import CloseIcon from '../../assets/close-square-svgrepo-com.svg'
import { Texts } from "@/constants/Texts";
import { FirebaseService } from "@/Services/firebase/Firebase_service";
import { db } from "../../data/firebase_config";


export function SaveRecipeModal({ open, setOpen, itens, prepareMode, dbService }: any) {
    const [recipeName, setRecipeName] = useState('')
    const [ativo, setAtivo] = useState(false);
    if (!open) return null

    const newRecipe = () => {
        return {
            id: Math.random() + Date.now(),
            nome: recipeName,
            ingredients: itens,
            prepareMode: prepareMode
        }
    }

    const saveRecipe = async () => {
        if (!recipeName.trim()) {
            alert("Informe o nome da receita.");
            return;
        }

        if (itens.length === 0) {
            alert("Adicione pelo menos um ingrediente.");
            return;
        }

        if (prepareMode === "") {
            alert("Adicione o modo de preparo.");
            return;
        }

        try {
            await dbService.saveRecipe(newRecipe(), ativo);
            setRecipeName("");
            setOpen(false);
            Alert.alert("receita salva", "Parabens, sua receita foi salva")
        } catch (error) {
            console.error("Erro ao salvar receita:", error);
            alert("Não foi possível salvar a receita.");
        }
    }


    return (
        <View style={styles.container}>
            <View style={styles.ModalBg} />

            <View style={styles.Modal}>
                <Pressable
                    style={styles.closeButton}
                    onPress={() => setOpen(false)}
                >
                    <CloseIcon width={28} height={28} />
                </Pressable>

                <View style={styles.SerchBar}>
                    <Text style={Texts.Title}>Qual o nome da sua receita?</Text>
                    <TextInput style={styles.SearchInput}
                        onChangeText={(value) => {
                            if (value == "") {
                                Alert.alert(
                                    'Valor inválido',
                                    'Esse campo não pode ser vazio.'
                                );
                                return;
                            }
                            setRecipeName(value);
                        }}
                        placeholder="digite aqui" />

                </View>

                <View style={styles.switchContainer}>
                    <Switch
                        value={ativo}
                        onValueChange={setAtivo}
                        trackColor={{
                            false: '#767577',
                            true: '#588157'
                        }}
                        thumbColor={ativo ? '#FFFFFF' : '#f4f3f4'}
                    />

                    <Text style={{ flex: 1 }}>
                        usar IA para corrigir erros ortograficos do modo de preparo?{' '}{ativo ? 'Sim' : 'Não'}
                    </Text>
                </View>


                <Pressable
                    style={styles.AddButton}
                    onPress={saveRecipe}
                >
                    <Text>Salvar receita</Text>
                </Pressable>
            </View>


        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        justifyContent: "center",
        alignItems: "center",
        zIndex: 999
    },

    ModalBg: {
        ...StyleSheet.absoluteFill,
        backgroundColor: "#383737",
        opacity: 0.7
    },

    Modal: {
        width: "85%",
        minHeight: 300,
        backgroundColor: Colors.surface,
        borderRadius: 15,
        padding: 20,
        zIndex: 1
    },

    SerchBar: {
        width: "100%",
        flexDirection: "column",
        alignItems: "center",
        gap: 15,
        marginTop: 25
    },

    SearchInput: {
        color: "#000",
        width: "100%",
        padding: 12,
        borderWidth: 1,
        borderColor: "#000",
        borderRadius: 10,
    },

    AddButton: {
        width: "100%",
        backgroundColor: Colors.background,
        borderRadius: 15,
        padding: 12,
        alignItems: "center",
        marginTop: 65
    },
    closeButton: {
        position: 'absolute',
        top: 10,
        right: 10,
        zIndex: 2,
    },
    switchContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: 10,
        gap: 10,
    },
});