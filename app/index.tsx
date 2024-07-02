import {ThemedView} from "@/components/ThemedView";
import {ThemedText} from "@/components/ThemedText";
import {Image, View} from "react-native";
import {WideButton} from "@/components/WideButton";

export default function Index() {

    return (
        <ThemedView
            style={{
                flex: 1,
                justifyContent: "space-evenly",
                alignItems: "center",
                paddingTop: 60
            }}
        >

            <Image source={require("../assets/images/cover.jpg")} style={{width: 350, height: 350}}></Image>
            <View style={{justifyContent: "center", flex: 1, alignItems: "center"}}>
                <ThemedText style={{
                    marginTop: 15,
                    padding: 10,
                    fontWeight: "bold",
                    fontSize: 28,
                    textAlign: "center",
                    lineHeight: 32
                }}>If
                    your smile now I might just melt
                </ThemedText>
                <ThemedText style={{padding: 10, fontWeight: "bold", fontSize: 28, textAlign: "center"}}>
                    Lick me off the plate
                </ThemedText></View>
            <View style={{justifyContent: "center", flex: 1, alignItems: "center"}}>
                <WideButton text="Start with me" onPress={() => {
                    console.log("Signed In")
                }} style={{margin: 10, width: 350, height: 40}}/>
                <WideButton text="Create account" onPress={() => {
                    console.log("Signed Up")
                }} style={{width: 350, height: 40,}}/></View>
        </ThemedView>
    );
}
