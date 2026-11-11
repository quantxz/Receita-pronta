import { StyleSheet } from "react-native"
const getRandomPostion = () => {
    return Math.floor(Math.random() * 100) + '%'
}

export const Tomatos = StyleSheet.create({
    decorations: {
        ...StyleSheet.absoluteFill,
        opacity: 0.20,
    },

    tomato1: {
        position: 'absolute',
        top: getRandomPostion(),
        left: getRandomPostion(),
        fontSize: 75,
        transform: [{ rotate: '-25deg' }]
    },

    tomato2: {
        position: 'absolute',
        top: getRandomPostion(),
        right: getRandomPostion(),
        fontSize: 55,
        transform: [{ rotate: '20deg' }]
    },

    tomato3: {
        position: 'absolute',
        bottom: getRandomPostion(),
        left: getRandomPostion(),
        fontSize: 85,
        transform: [{ rotate: '15deg' }]
    },

    tomato4: {
        position: 'absolute',
        bottom: getRandomPostion(),
        right: getRandomPostion(),
        fontSize: 70,
        transform: [{ rotate: '-15deg' }]
    },

    tomato5: {
        position: 'absolute',
        top: getRandomPostion(),
        left: getRandomPostion(),
        fontSize: 40,
    }
})