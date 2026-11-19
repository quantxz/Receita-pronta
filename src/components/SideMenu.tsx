
import React, { useEffect, useRef } from 'react';
import {
    Modal,
    View,
    Text,
    Pressable,
    StyleSheet,
    ScrollView,
} from 'react-native';
import { useRouter, type Href } from 'expo-router';
import Colors from '@/constants/Colors';
import { Animated, Dimensions } from 'react-native';
type SideMenuProps = {
    visible: boolean;
    onClose: () => void;
};

export function SideMenu({ visible, onClose }: SideMenuProps) {
    const router = useRouter();
    const MENU_WIDTH = Dimensions.get('window').width * 0.78;

    const slideAnim = useRef(new Animated.Value(-MENU_WIDTH)).current;

    useEffect(() => {
        Animated.timing(slideAnim, {
            toValue: visible ? 0 : -MENU_WIDTH,
            duration: 300,
            useNativeDriver: true,
        }).start();
    }, [visible, slideAnim]);


    const navegar = (rota: Href) => {
        onClose();
        router.push(rota);
    };

    return (
        <Modal
            visible={visible}
            transparent
            animationType="none"
            onRequestClose={onClose}
            statusBarTranslucent
        >
            <View style={styles.overlay}>
                <Animated.View
                    style={[
                        styles.menu,
                        {
                            transform: [{ translateX: slideAnim }],
                        },
                    ]}
                >
                    <View style={styles.header}>
                        <Text style={styles.title}>🍅 Receita Pronta</Text>

                        <Pressable onPress={onClose}>
                            <Text style={styles.close}>✕</Text>
                        </Pressable>
                    </View>

                    <ScrollView contentContainerStyle={styles.options}>
                        <Pressable
                            style={styles.option}
                            onPress={() => navegar('/')}
                        >
                            <Text style={styles.optionText}>🏠 Início</Text>
                        </Pressable>

                        <Pressable
                            style={styles.option}
                            onPress={() => navegar('/Receitas')}
                        >
                            <Text style={styles.optionText}>📖 Minhas receitas</Text>
                        </Pressable>

                        <Pressable
                            style={styles.option}
                            onPress={() => navegar('/NewRecipeScreen')}
                        >
                            <Text style={styles.optionText}>➕ Criar receita</Text>
                        </Pressable>

                        <Pressable
                            style={styles.option}
                            onPress={() => navegar('/Perfil')}
                        >
                            <Text style={styles.optionText}>👤 Meu perfil</Text>
                        </Pressable>
                    </ScrollView>
                </Animated.View>

                <Pressable
                    style={styles.backdrop}
                    onPress={onClose}
                />
            </View>
        </Modal >
    );
}

const styles = StyleSheet.create({
    overlay: {
        flex: 1,
        flexDirection: 'row',
        backgroundColor: 'rgba(0,0,0,0.5)',
    },
    menu: {
        width: '78%',
        maxWidth: 320,
        height: '100%',
        backgroundColor: Colors.surface,
        paddingTop: 55,
        paddingHorizontal: 20,
    },
    backdrop: {
        flex: 1,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 35,
    },
    title: {
        fontSize: 22,
        fontWeight: 'bold',
        color: Colors.text ?? '#344E41',
    },
    close: {
        fontSize: 25,
        color: '#344E41',
    },
    options: {
        gap: 12,
    },
    option: {
        paddingVertical: 17,
        paddingHorizontal: 15,
        borderRadius: 12,
        backgroundColor: Colors.secondary,
    },
    optionText: {
        fontSize: 17,
        fontWeight: '500',
        color: '#344E41',
    },
});
