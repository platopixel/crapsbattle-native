import { StyleSheet, Text, View } from 'react-native';
import Main from './Main';

export default function Index() {
    return (
        <View style={styles.container}>
            <Main />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
});
