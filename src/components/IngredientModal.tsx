import Colors from "@/constants/Colors";
import { useState } from "react";
import { View, StyleSheet, TextInput, Pressable, Text, Alert } from "react-native";
import CloseIcon from '../../assets/close-square-svgrepo-com.svg'

export function IngredientModal({ open, setOpen, setItens, itens }: any) {
    const [ingredient, setIngredient] = useState('')
    const [quantity, setQuantity] = useState('')

    if (!open) return null

    const addItem = () => {

        if (/\d/.test(ingredient) || ingredient == "") {
            Alert.alert(
                'Valor inválido no campo ingrediente',
                'Esse campo deve conter apenas letras (insira a quantia no campo abaixo).'
            );
            return;
        }

        if (itens.some(
            item => item.nome.toLowerCase() === ingredient.toLowerCase()
        )) {
            Alert.alert(
                'Esse ingrediente ja existe, tem certeza que deseja adiciona-lo novamente?', "", [
                {
                    text: 'Sim',
                    style: 'default',
                    onPress: () => {
                        setItens(prev => [
                            ...prev,
                            {
                                id: Date.now(),
                                nome: ingredient,
                                quantia: quantity
                            }
                        ]);

                        setIngredient('');
                        setQuantity('');
                        setOpen(false);
                    }
                },
                {
                    text: 'Não, foi um acidente',
                    style: 'destructive',
                    onPress: () => {
                        console.log('Receita excluída!');
                        return;
                    },
                },
            ]);

            return;
        }

        if (!/^\d+$/.test(quantity)) {
            Alert.alert(
                'Valor inválido no campo quantia',
                'Esse campo deve conter apenas números (insira o nome no campo acima).'
            );
            return;
        }

        setItens(prev => [
            ...prev,
            {
                id: Date.now(),
                nome: ingredient,
                quantia: quantity
            }
        ]);

        setIngredient('');
        setQuantity('');
        setOpen(false);


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

                    <TextInput style={styles.SearchInput}
                        onChangeText={(value) => {
                            setIngredient(value);
                        }}
                        placeholder="Nome do ingrediente?" />

                    <TextInput style={styles.SearchInput} keyboardType="numeric" placeholder="Quantas gramas do ingrediente?"
                        onChangeText={(value) => {
                            setQuantity(value.replace(/\D/g, ""))
                        }}
                    />

                </View>

                <Pressable
                    style={styles.AddButton}
                    onPress={addItem}
                >
                    <Text>Adicionar</Text>
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
});