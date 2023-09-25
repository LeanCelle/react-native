import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, FlatList, Image, ActivityIndicator } from 'react-native';

const HeadToHead = ({ match }) => {
    const [headToHeadData, setHeadToHeadData] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch(`https://v3.football.api-sports.io/fixtures/headtohead?h2h=${match.teams.home.id}-${match.teams.away.id}`, {
            method: "GET",
            headers: {
                "x-rapidapi-key": "d00546b141e9f51b3f92baefe6c7a5ab",
                "x-rapidapi-host": "v3.football.api-sports.io",
            },
        })
            .then((response) => response.json())
            .then((data) => {
                console.log(data.response);

                const sortedMatches = data.response.sort((a, b) => {
                    const dateA = new Date(a.fixture.date);
                    const dateB = new Date(b.fixture.date);
                    return dateA - dateB;
                });

                setHeadToHeadData(sortedMatches);
                setLoading(false);
            })
            .catch((error) => {
                console.log('error', error);
                setLoading(false);
            });
    }, [match]);

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
