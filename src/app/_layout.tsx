
import { Stack } from 'expo-router';
import { useFonts } from 'expo-font';
import { ActivityIndicator } from 'react-native';

export default function RootLayout() {
    const [fontsLoaded] = useFonts({
        'Breef': require('../../assets/fonts/BreeSerif-Regular.ttf'),
        'Lora': require('../../assets/fonts/Lora-VariableFont_wght.ttf'),
        'Poppins': require('../../assets/fonts/Poppins-Medium.ttf'),
    });

    if (!fontsLoaded) {
        return <ActivityIndicator size="large" />;
    }

    return (
        <Stack
            screenOptions={{
                headerShown: false,
                animation: 'slide_from_right',
            }}
        />
    );
}
