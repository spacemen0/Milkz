import React from "react";
import {defaultStyles} from "@/constants/DefaultStyles";
import {ThemedView} from "@/components/ThemedView";
import {ThemedText} from "@/components/ThemedText";
import {WideButton} from "@/components/WideButton";
import {useRouter} from "expo-router";

const profile = () => {
    const router = useRouter();
    return (
        <ThemedView style={defaultStyles.container}>
            <ThemedText style={defaultStyles.title}>profile</ThemedText>
            <WideButton
                text="Log Out"
                onPress={() => {
                    router.replace("/");
                }}
            />
        </ThemedView>
    );
};

export default profile;
