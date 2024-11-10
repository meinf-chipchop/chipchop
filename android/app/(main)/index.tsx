import { StyleSheet } from 'react-native'
import { View } from '@/components/Themed'
import { useSession } from '@/auth/authContext'
import { Button, ButtonText } from '@/components/ui/button'

export default function TabOneScreen() {
  const { signOut } = useSession()
  console.log('render main')
  return (
    <View className="bg-white" style={styles.container}>
      <View
        style={styles.separator}
        lightColor="#eee"
        darkColor="rgba(255,255,255,0.1)"
      />
      <Button onPress={() => signOut()}>
        <ButtonText>Sign out</ButtonText>
      </Button>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
})
