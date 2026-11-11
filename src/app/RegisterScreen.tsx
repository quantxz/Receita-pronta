import { StyleSheet, View, ScrollView, Text, Pressable, TextInput, Alert } from 'react-native';
import MenuIcon from '../../assets/menu-alt-1-svgrepo-com.svg';
import Colors from '@/constants/Colors';
import { FirebaseService } from '@/Services/firebase/Firebase_service';
import { auth, db } from '../../data/firebase_config';
import { Texts } from '@/constants/Texts';
import { Tomatos } from '@/constants/Tomatos';
import { useEffect, useRef, useState } from 'react';
import { useRouter } from 'expo-router';

export default function RegisterScreen() {
  const [Name, setName] = useState("")
  const [Email, setEmail] = useState("")
  const [Password, setPassword] = useState("")
  const [ConfirmPassword, setConfirmPassword] = useState("")

  const firebaseService = useRef<FirebaseService | null>(null);
  const router = useRouter();

  useEffect(() => {
    firebaseService.current = new FirebaseService(db, auth);
  }, []);

  async function registerUser() {
    if ([Name, Email, Password].some(campo => campo === "") || [Name, Email, Password].some(campo => campo.length < 3)) {
      Alert.alert("Erro", "Nenhum dos campos deve estar vazio ou ter menos de 3 caracteres");
      return;
    }

    if (Password !== ConfirmPassword) {
      Alert.alert("SENHA INCORRETA", "Confirme se sua senha esta correta", [{
        text: "Ok",
        style: "default"
      }])

      return;
    }

    if (Password.length < 6 || !/[A-Z]/.test(Password) || !/[^a-zA-Z0-9]/.test(Password)) {
      Alert.alert("Senha inválida", "A senha precisa ter pelo menos 6 caracteres, conter letra maiuscula e um caracter especial.");
      return;
    }

    try {
      const user = await firebaseService.current?.registerUser({
        name: Name,
        email: Email,
        password: Password
      })

      router.replace('/NewRecipeScreen');

    } catch (error) {
      console.warn(error)
      Alert.alert("Error", "sentimos muito pelo inconveniente, tente novamente.", [{
        text: "Ok",
        style: "default"
      }])

      return;

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
      <Text style={Texts.bigSubtitle}>Crie sua conta</Text>

      <View style={styles.inputsContainer}>
        <TextInput style={styles.inputs} placeholder='digite seu nome' onChangeText={setName} />
        <TextInput style={styles.inputs} placeholder='digite sua email' onChangeText={setEmail} />
        <TextInput style={styles.inputs} placeholder='digite sua senha' onChangeText={setPassword} secureTextEntry={true} />
        <TextInput style={styles.inputs} placeholder='confirme sua senha' onChangeText={setConfirmPassword} secureTextEntry={true} />
      </View>

      <Pressable style={styles.registerButton} onPress={registerUser}>
        <Text style={Texts.Subtitle}>Criar conta</Text>
      </Pressable>

      <Text style={Texts.Subtitle}>Ja tem uma conta? acesse ela <Text style={Texts.link} onPress={() => {router.replace("/LoginScreen")}}>aqui</Text></Text>
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
  },
  registerButton: {
    backgroundColor: Colors.button,
    width: "80%",
    minHeight: 75,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 25,
  },

});