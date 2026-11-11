import { IReceita } from "@/interfaces/IReceitas";
import { FirebaseApp } from "firebase/app";
import {
    collection,
    addDoc,
    Firestore,
    setDoc,
    doc
} from "firebase/firestore";
import { questGemini } from "../AI/GeminiService";
import { Alert } from "react-native";
import { registerUserDto } from "@/DTOs/User-Register-DTO";
import { Auth, createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile } from "firebase/auth";
import { loginUserDto } from "@/DTOs/User-login-DTO";

export class FirebaseService {
    private readonly _context: Firestore;
    private readonly _authInstance: Auth;

    constructor(context: Firestore, auth: Auth) {
        this._context = context
        this._authInstance = auth
    }

    public async saveRecipe(receita: IReceita, usoDeIA: boolean) {
        try {
            let prepareMode = receita.prepareMode;

            if (receita.ingredients.some(
                ingredientes =>
                    ingredientes.nome.trim() === "" ||
                    ingredientes.quantia.trim() === ""
            )) {
                throw new Error("Algum ingrediente esta vazio");
            }

            if (usoDeIA && prepareMode.trim() !== "") {
                try {
                    prepareMode = await questGemini(
                        "Corrija estritamente os erros ortograficos. " +
                        "Mantenha gíirias regionais e nao altere o sentido do texto: " +
                        prepareMode
                    );

                } catch (error) {
                    console.warn(
                        "Nao foi possível utilizar a IA. Salvando texto original.",
                        error
                    );
                    Alert.alert("Mensagem nao corrigida", "sentimos muito, mas a IA se encontra indisponivel, sua receita foi salva sem a correcao automatica")
                }
            }

            const docRef = await addDoc(collection(this._context, "receitas"), {
                id: receita.id,
                nome: receita.nome,
                ingredientes: receita.ingredients,
                prepareMode: prepareMode != "" ? prepareMode : receita.prepareMode,
                criadoEm: new Date()
            });

            console.log("Receita salva:", docRef.id);
        } catch (error) {
            console.error("Erro ao salvar:", error);
            throw new Error(`\nErro: ${error}\n`)
        }
    }

    public async registerUser(userDto: registerUserDto) {

        try {
            const { user } = await createUserWithEmailAndPassword(this._authInstance,
                userDto.email,
                userDto.password);


            await setDoc(doc(this._context, 'usuarios', user.uid), {
                name: userDto.name,
                email: userDto.email,
                password: userDto.password
            });
            console.log("\nsucesso ", user)
            return user;
        } catch (error) {
            throw new Error("\nErro: " + error + "\n")
        }

    }

    public async loginUser(userDto: loginUserDto) {

        try {
            const { user } = await signInWithEmailAndPassword(
                this._authInstance,
                userDto.email,
                userDto.password
            );

            return user;
        } catch (error) {
            throw new Error("\nErro: " + error + "\n")
        }

    }


}

//  async register(email: string, password: string) {
//         const userCredential = await createUserWithEmailAndPassword(
//             auth,
//             email,
//             password
//         );

//         return userCredential.user;
//     }

//     // Login
//     async login(email: string, password: string) {
//         const userCredential = await signInWithEmailAndPassword(
//             auth,
//             email,
//             password
//         );

//         return userCredential.user;
//     }

// // Logout
// async logout() {
//     await signOut(auth);
// }

// // Monitorar autenticação
// onAuthChange(callback: (user: any) => void) {
//     return onAuthStateChanged(auth, callback);
// }