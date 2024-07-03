import React from 'react';
import { TouchableOpacity, StyleSheet, ViewStyle } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { useThemeColor } from '@/hooks/useThemeColor';
import {Colors} from "@/constants/Colors"; // Adjust the import according to your project structure

interface WideButtonProps {
    text: string;
    onPress: () => void;
    style?: ViewStyle;
}

export function WideButton({ text, onPress, style }: WideButtonProps) {
    const backgroundColor = useThemeColor(
        { light: Colors.dark.background, dark: Colors.light.background },
        'background'
    );

    return (
        <TouchableOpacity
            onPress={onPress}
            style={[styles.button, { backgroundColor }, style]}
        >
            <ThemedText darkColor="#11181C" lightColor="#ECEDEE" style={{fontWeight:"bold",fontSize:20}}>{text}</ThemedText>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    button: {
        borderRadius: 4,
        padding: 10,
        alignItems: 'center',
        justifyContent: 'center',
    },
});
