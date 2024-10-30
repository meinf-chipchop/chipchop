import { Redirect } from "expo-router";

const Home = () => <Redirect href={"/(auth)/welcome" as any} />;

export default Home;
