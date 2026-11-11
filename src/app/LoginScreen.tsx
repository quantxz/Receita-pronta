import { StyleSheet, View, ScrollView, Text, Pressable, TextInput, Alert } from 'react-native';
import MenuIcon from '../../assets/menu-alt-1-svgrepo-com.svg';
import Colors from '@/constants/Colors';
import { FirebaseService } from '@/Services/firebase/Firebase_service';
import { auth, db } from '../../data/firebase_config';
import { Texts } from '@/constants/Texts';
import { Tomatos } from '@/constants/Tomatos';
import { useEffect, useRef, useState } from 'react';
import { useRouter } from 'expo-router';

export default function LoginScreen() {
  const [Email, setEmail] = useState("")
  const [Password, setPassword] = useState("")

  const firebaseService = useRef<FirebaseService | null>(null);
  const router = useRouter();

  useEffect(() => {
    firebaseService.current = new FirebaseService(db, auth);
  }, []);

  async function login() {
    if ([Email, Password].some(campo => campo === "") || [Email, Password].some(campo => campo.length < 3)) {
      Alert.alert("Erro", "Nenhum dos campos deve estar vazio ou ter menos de 3 caracteres");
      return;
    }
    try {
      const user = await firebaseService.current?.loginUser({ email: Email, password: Password })

      router.replace('/NewRecipeScreen');

    } catch (error: any) {
      switch (error.code) {
        case 'auth/invalid-credential':
          Alert.alert('E-mail ou senha incorretos.')
          throw new Error('E-mail ou senha incorretos.');

        case 'auth/user-not-found':
          throw new Error('Usuário não encontrado.');

        case 'auth/wrong-password':
          Alert.alert('E-mail ou senha incorretos.')
          throw new Error('Senha incorreta.');

        case 'auth/invalid-email':
          Alert.alert('E-mail ou senha incorretos.')
          throw new Error('O e-mail informado é inválido.');

        case 'auth/too-many-requests':
          throw new Error('Muitas tentativas. Tente novamente mais tarde.');

        case 'auth/user-disabled':
          Alert.alert('E-mail ou senha incorretos.')
          throw new Error('Esta conta foi desativada.');

        case 'auth/network-request-failed':
          throw new Error('Verifique sua conexão com a internet.');

        default:
          Alert.alert('E-mail ou senha incorretos.')
          throw new Error('Não foi possível realizar o login.');
      }
    }
  }

  return (
    <View style={styles.container}>
      <View style={Tomatos.decorations} pointerEvents="none">
        <Text style={Tomatos.tomato1}>🍅</Text>
        <Text style={Tomatos.tomato2}>🍅</Text>
        <Text style={Tomatos.tomato3}>🍅</Text>
        <Text style={Tomatos.tomato4}>🍅</Text>
        <Text style={Tomatos.tomato5}>🍅</Text>
      </View>
      <Text style={Texts.bigTitle}>Receita pronta</Text>
      <Text style={Texts.Subtitle}>Entre na sua conta</Text>

      <View style={styles.inputsContainer}>
        <TextInput style={styles.inputs} placeholder='digite seu email' onChangeText={setEmail} />
        <TextInput style={styles.inputs} placeholder='digite sua senha' onChangeText={setPassword} secureTextEntry={true} />
      </View>


      <Pressable style={styles.loginButton} onPress={login}>
        <Text style={Texts.Subtitle}>Entrar na conta</Text>
      </Pressable>

      <Text style={Texts.Subtitle}>Não tem uma conta? crie uma <Text style={Texts.link} onPress={() => { router.replace("/RegisterScreen") }}>aqui</Text></Text>
    </View >
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
    padding: 10,
    flexDirection: "column",
    gap: 15,
    alignItems: "center",
    justifyContent: "center",
  },
  inputsContainer: {
    width: "100%",
    minHeight: 250,
    gap: 15,
    marginBottom: 15,
    alignItems: "center",
    justifyContent: "center",
  },
  inputs: {
    width: "80%",
    minHeight: 75,
    backgroundColor: Colors.surface,
    borderRadius: 25,
    paddingLeft: 30,
    fontSize: 20
  },
  loginButton: {
    backgroundColor: Colors.button,
    width: "80%",
    minHeight: 75,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 25,
  },

});