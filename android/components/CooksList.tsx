import { Cook } from "@/lib/cook";
import { useRouter } from "expo-router";
import { View, Text, Image, StyleSheet, Dimensions, Pressable } from "react-native";

const { width } = Dimensions.get('window');

interface CookInfo {
    cook: Cook;
    index: number;
}

const CookDetail = ({ cook, index }: CookInfo): JSX.Element => {
    return (
        <>
            <View key={index} style={styles.chefCard}>
                <Image source={{ uri: `https://randomuser.me/api/portraits/men/${index + 1}.jpg` }} style={styles.chefImage} />
                <Text style={styles.chefText}>{cook.public_name}</Text>
            </View >
        </>
    )
}


const CooksList = ({ cooks }: { cooks: Cook[] }): JSX.Element => {
    const router = useRouter();

    const redirect = (cookUrl: string) => {
        router.push({ pathname: "/CookDetails", params: { cook_url: cookUrl } });
    }

    return (
        <>
            {cooks.map((cook, index) => (
                <Pressable key={"press-" + index} onPress={() => redirect(cook.url)}>
                    <CookDetail key={"cook-" + index} cook={cook} index={index}></CookDetail>
                </Pressable >
            ))}
        </>
    );
}

export default CooksList;

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: '#f5f5f5',
    },
    scrollContainer: {
        alignItems: 'center',
        padding: 16,
        paddingBottom: 80, // Add bottom padding to ensure space from the tab bar
    },
    container: {
        flex: 1,
        alignItems: 'center',
        padding: 16,
        backgroundColor: '#f5f5f5',
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '100%',
        maxWidth: 400,
        paddingVertical: 10,
    },
    logoContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    logoBackground: {
        backgroundColor: '#966d35',
        padding: 8,
        borderRadius: 8,
        marginRight: 8,
    },
    logo: {
        width: 40,
        height: 40,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#333',
    },
    iconContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: 100,
    },
    icon: {
        color: '#e3d6ab',
    },
    iconText: {
        color: '#e3d6ab',
    },
    searchContainer: {
        marginTop: 16,
        width: '100%',
        maxWidth: 400,
        paddingHorizontal: 16,
    },
    searchBox: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#dfe1d5',
        padding: 10,
        borderRadius: 8,
        marginBottom: 8,
    },
    searchInput: {
        marginLeft: 8,
        flex: 1,
        fontSize: 16,
    },
    locationBox: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#dfe1d5',
        padding: 10,
        borderRadius: 8,
        marginBottom: 8,
    },
    locationText: {
        marginLeft: 8,
        color: 'gray',
        fontSize: 16,
    },
    categoryBox: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: '#966d35',
        padding: 10,
        borderRadius: 8,
        marginBottom: 8,
    },
    categoryText: {
        color: '#fff',
        fontSize: 16,
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 16,
    },
    featuredTitle: {
        marginTop: 16,
        fontSize: 18,
        fontWeight: 'bold',
        color: '#333',
        alignSelf: 'flex-start',
        paddingHorizontal: 16,
    },
    featuredScroll: {
        marginTop: 8,
        paddingHorizontal: 16,
    },
    dishCard: {
        marginRight: 16,
        width: width * 0.7, // 70% of the screen width
        height: width * 0.4, // Make it square by setting height equal to width
        borderRadius: 8,
        overflow: 'hidden',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 2,
        borderWidth: 1, // Add border width
        borderColor: '#966d35', // Set border color
    },
    dishImage: {
        width: '100%',
        height: '100%',
    },
    overlay: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        padding: 10,
    },
    dishText: {
        fontSize: 16,
        color: '#fff',
        textAlign: 'center',
    },
    chipChopTitle: {
        marginTop: 16,
        fontSize: 18,
        fontWeight: 'bold',
        color: '#415f63', // Change color to #415f63
        textAlign: 'center', // Center the title
        paddingHorizontal: 16,
        paddingBottom: 16, // Add bottom padding
    },
    chipChopContainer: {
        width: '100%',
        alignItems: 'center',
    },
    dishCardVertical: {
        marginBottom: 16,
        width: width * 0.9, // 90% of the screen width for vertical layout
        height: width * 0.5, // Adjust height for vertical layout
        borderRadius: 8,
        overflow: 'hidden',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 2,
        borderWidth: 1,
        borderColor: '#966d35',
    },
    chipChopScroll: {
        marginTop: 8,
        paddingHorizontal: 16,
    },
    chefsTitle: {
        marginTop: 16,
        fontSize: 18,
        fontWeight: 'bold',
        color: '#333',
        alignSelf: 'flex-start',
        paddingHorizontal: 16,
    },
    chefsScroll: {
        marginTop: 8,
        paddingHorizontal: 16,
    },
    chefCard: {
        marginRight: 16,
        width: 100,
        alignItems: 'center',
    },
    chefImage: {
        width: 80,
        height: 80,
        borderRadius: 40,
        marginBottom: 8,
        borderWidth: 1, // Add border width
        borderColor: '#966d35', // Set border color
    },
    chefText: {
        fontSize: 14,
        color: '#333',
        textAlign: 'center',
    },
});