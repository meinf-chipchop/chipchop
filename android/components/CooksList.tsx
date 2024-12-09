import { CookOverall, CooksPage } from "@/lib/cook";
import { useRouter } from "expo-router";
import { View, Text, Image, Pressable } from "react-native";


interface CookInfo {
    cook: CookOverall;
    index: number;
}

const CookDetail = ({ cook, index }: CookInfo): JSX.Element => {
    return (
        <>
            <View key={index} className="mr-4 items-center w-auto">
                <Image source={{ uri: `https://randomuser.me/api/portraits/men/${index + 1}.jpg` }} className="w-20 h-20 rounded-full mb-2 border-2 border-[#966d35]" />
                <Text className="text-md color-[#333] align-center">{cook.public_name}</Text>
            </View >
        </>
    )
}

const CooksList = ({ cooks }: { cooks: CooksPage }): JSX.Element => {
    const router = useRouter();

    const redirect = (cookUrl: string) => {
        router.push({ pathname: "/CookDetails", params: { cook_url: cookUrl } });
    }

    return (
        <>
            {cooks && cooks.results && cooks.results.map((cook, index) => (
                <Pressable key={"press-" + index} onPress={() => redirect(cook.url)}>
                    <CookDetail key={"cook-" + index} cook={cook} index={index}></CookDetail>
                </Pressable >
            ))}
        </>
    );
}

export default CooksList;