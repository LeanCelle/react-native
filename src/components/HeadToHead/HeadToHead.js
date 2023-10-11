import { StyleSheet, Text, View, FlatList, Image, ActivityIndicator } from 'react-native';
import HtoHApiCalls from '../../services/HtoHApiCalls';

const HeadToHead = ({ match }) => {

  const { headToHeadData, loading } = HtoHApiCalls({match});

    return (
        <View style={styles.container}>
            <Text style={styles.header}>Últimos partidos</Text>
            {loading ? (
                <View style={styles.loadingContainer}>
                    <ActivityIndicator size="large" color="grey" />
                </View>
            ) : (
                <FlatList
                    data={headToHeadData}
                    keyExtractor={(item) => item.fixture.id.toString()}
                    renderItem={({ item }) => (
                        <View style={styles.matchContainer}>
                            <View style={styles.teamContainer}>
                                <View style={styles.teamContainerSecond}>
                                    <Image source={{ uri: item.teams.home.logo }} style={styles.logo} />
                                    <Text style={styles.teamName}>{item.teams.home.name}</Text>
                                </View>
                                <Text style={styles.score}>{item.goals.home} - {item.goals.away}</Text>
                                <View style={styles.teamContainerSecond}>
                                    <Image source={{ uri: item.teams.away.logo }} style={styles.logo} />
                                    <Text style={styles.teamName}>{item.teams.away.name}</Text>
                                </View>
                            </View>
                            <Text style={styles.matchDate}>Fecha: {item.fixture.date}</Text>
                            {item.fixture.referee && (
                            <Text style={styles.referee}>Árbitro: {item.fixture.referee}</Text>
                            )}
                            <Text style={styles.leagueName}>{item.league.name}</Text>
                            <Image source={{ uri: item.league.logo }} style={styles.leagueLogo} />
                        </View>
                    )}
                />
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
    header: {
      textAlign: 'center',
      fontWeight: 'bold',
      fontSize: 20,
      marginBottom: 16,
      color: 'black',
    },
    matchContainer: {
      borderBottomWidth: 1,
      borderColor: 'lightgrey',
      paddingVertical: 8,
      marginBottom: 15,
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'space-between',
    },
    teamContainer: {
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
    },
    teamContainerSecond: {
        textAlign: 'center',
        justifyContent: 'center',
        alignItems: 'center',
        gap: 8,
    },
    logo: {
      resizeMode: 'contain',
      width: 40,
      height: 40,
    },
    teamName: {
        textAlign: 'center',
        width: 100,
        height: 60,
      fontSize: 16,
      fontWeight: 'bold',
      color: 'black',
    },
    score: {
        height: 60,
        width: 80,
      fontSize: 20,
      textAlign: 'center',
      fontWeight: 'bold',
      color: 'black',
    },
    matchDate: {
      fontSize: 14,
      color: 'black',
      paddingBottom: 5,
    },
    referee: {
      fontSize: 14,
      color: 'black',
      paddingBottom: 5,
    },
    leagueName: {
      fontSize: 14,
      color: 'black',
      paddingBottom: 5,
    },
    leagueLogo: {
      resizeMode: 'contain',
      width: 30,
      height: 30,
    },
    loadingContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
});

export default HeadToHead;
