import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Image, FlatList, SafeAreaView, ActivityIndicator } from 'react-native';
import { Ionicons } from '@expo/vector-icons'; 
import ModalSquad from '../components/modal/Modal';
import Header from '../components/header/Header';
import Theme from '../utils/Themes';

const Live = ({ navigation }) => {
    const [matches, setMatches] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch("http://v3.football.api-sports.io/fixtures?live=all", {
            method: "GET",
            headers: {
                "x-rapidapi-key": "d00546b141e9f51b3f92baefe6c7a5ab",
                "x-rapidapi-host": "v3.football.api-sports.io",
            },
        })
        .then((response) => response.json())
        .then((data) => {
            console.log(data.response);
            setMatches(data.response);
            setLoading(false);
        })
        .catch((error) => {
            console.log('error', error);
            setLoading(false);
        });
    }, []);

    const groupedMatches = {};
    matches.forEach((match) => {
        const leagueName = match?.league?.name;
        if (!groupedMatches[leagueName]) {
            groupedMatches[leagueName] = [];
        }
        groupedMatches[leagueName].push(match);
    });

    const renderMatchItem = ({ item }) => {
        const fixtureStatus = item?.fixture?.status?.short;
        const elapsedText = fixtureStatus === "FT" ? "Final" : fixtureStatus === "HT" ? "ET" : `${item?.fixture?.status?.elapsed}'`;

        return (
            <View style={styles.matchContainer} key={item?.fixture?.id}>
                <View style={styles.teamsContainer}>
                    <View style={styles.time}>
                        <Text style={styles.elapsedText}>{elapsedText}</Text>
                    </View>
                    <View style={styles.teamContainer}>
                        <Image source={{ uri: item?.teams?.home?.logo }} style={styles.logo} />
                        <Text style={styles.teamName} numberOfLines={2}>{item?.teams?.home?.name}</Text>
                    </View>
                    <View style={styles.allGoals}>
                        <Text style={styles.goals}>{item?.goals?.home}</Text>
                        <Text style={styles.line}>-</Text>
                        <Text style={styles.goals}>{item?.goals?.away}</Text>
                    </View>
                    <View style={styles.teamContainer}>
                        <Image source={{ uri: item?.teams?.away?.logo }} style={styles.logo} />
                        <Text style={styles.teamName} numberOfLines={2}>{item?.teams?.away?.name}</Text>
                    </View>
                    <View>
                        <ModalSquad navigation={navigation} match={item} matches={matches} />
                    </View>
                </View>
            </View>
        );
    };

    const leagueSections = Object.keys(groupedMatches).map((leagueName) => ({
        title: leagueName,
        data: groupedMatches[leagueName],
    }));

    return (
        <SafeAreaView style={styles.container}>
            <Header>
                <Text style={styles.text}>Partidos en vivo</Text>
            </Header>
            {loading ? (
                <View style={styles.loadingContainer}>
                    <ActivityIndicator size="large" color="grey" />
                </View>
            ) : (
                <>
                {matches.length > 0 ? (
                <FlatList
                    data={leagueSections}
                    keyExtractor={(item) => item.title}
                    renderItem={({ item }) => (
                    <View key={item.title}>
                        <View style={styles.leagueContainer}>
                            <Text style={styles.league}>{item.title}</Text>
                                <Image
                                    source={{ uri: item.data[0]?.league?.logo }}
                                    style={styles.leagueLogo}
                                />
                                </View>
                                    <View>
                                        {item.data.map((match) => (
                                        <View key={match?.fixture?.id}>
                                            {renderMatchItem({ item: match })}
                                            <View style={styles.goalsView}>
                                                <View style={styles.playerGoalHome}>
                                                    {match.events.filter((event) => event.type === "Goal" && event?.team?.id === match?.teams?.home?.id)
                                                    .map((goalEvent, index) => (
                                                    <Text key={index} style={styles.playersGoals}>
                                                        {goalEvent?.player?.name}
                                                        <Ionicons name="md-football" size={10} color="black" />
                                                    </Text>
                                                    ))}
                                                </View>
                                                <View style={styles.playerGoalAway}>
                                                    {match.events.filter((event) => event.type === "Goal" && event?.team?.id === match?.teams?.away?.id)
                                                    .map((goalEvent, index) => (
                                                    <Text key={index} style={styles.playersGoals}>
                                                        {goalEvent?.player?.name}
                                                        <Ionicons name="md-football" size={10} color="black" />
                                                    </Text>
                                                    ))}
                                                </View>
                                            </View>
                                        </View>
                                        ))}
                                    </View>
                                </View>
                            )}
                        />
                    ) : (
                    <View style={styles.noMatchesContainer}>
                        <Text style={styles.noMatchesText}>No hay partidos en vivo en este momento</Text>
                    </View>
                    )}
                </>
            )}
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'black',
        flex: 1,
    },
    text: {
        fontWeight: 'bold',
        fontSize: 20,
        color: 'white',
    },
    leagueContainer: {
        backgroundColor: Theme.colors.darkgreen,
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 30,
        marginHorizontal: 15,
        paddingVertical: 2,
        gap: 10,
    },
    league: {
        color: 'white',
        textAlign: 'center',
        fontWeight: '500',
        fontSize: 18,
    },
    leagueLogo: {
        resizeMode: 'contain',
        width: 25,
        height: 25,
    },
    matchContainer: {
        height: 60,
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        gap: 50,
    },
    teamsContainer: {
        paddingHorizontal: 15,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
    },
    teamContainer: {
        height: 60,
        flex: 1,
        height: 60,
        paddingVertical: 15,
        paddingHorizontal: 5,
        backgroundColor: Theme.colors.darkgrey,
        width: '100%',
        alignItems: 'center',
        flexDirection: 'column',
        justifyContent: 'center',
        gap: 3,
        borderTopWidth: 1,
        borderTopColor: Theme.colors.lightgrey,
    },
    logo: {
        resizeMode: 'contain',
        width: 25,
        height: 25,
    },
    teamName: {
        paddingVertical: 5,
        paddingHorizontal: 5,
        textAlign: 'center',
        color: 'black',
        flexWrap: 'wrap',
    },
    teamsGoal: {
        gap: 8,
        alignItems: 'center',
        justifyContent: 'center',
    },
    allGoals: {
        height: 60,
        width: 45,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'white',
        paddingHorizontal: 8,
        flexDirection: 'row',
        gap: 4,
        borderTopWidth: 1,
        borderTopColor: Theme.colors.lightgrey,
    },
    goals: {
        color: 'black',
        fontWeight: 'bold',
    },
    line: {
        color: 'black',
    },
    time: {
        height: 60,
        width: 40,
        alignItems: 'center',
        paddingHorizontal: 5,
        justifyContent: 'center',
        backgroundColor: 'red',
        borderRightColor: 'black',
        borderTopWidth: 1,
        borderTopColor: Theme.colors.lightgrey,
    },
    elapsedText: {
        color: 'white',
    },
    goalsView: {
        flexDirection: 'row',
        paddingHorizontal: 15,
    },
    playerGoalHome: {
        alignItems: 'center',
        gap: 2,
        backgroundColor: Theme.colors.lightgrey,
        flexDirection: 'row',
        flexWrap: 'wrap',
        width: '50%',
    },
    playerGoalAway: {
        alignItems: 'center',
        gap: 2,
        backgroundColor: Theme.colors.lightgrey,
        borderLeftWidth: 1,
        borderLeftColor: 'white',
        flexDirection: 'row',
        flexWrap: 'wrap',
        width: '50%',
    },
    playersGoals: {
        fontSize: 12,
        color: 'black',
        paddingVertical: 1.5,
        paddingHorizontal: 3,
    },
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    noMatchesContainer: {
        justifyContent: 'center',
        textAlign: 'center',
        flexGrow: 1,
    },
    noMatchesText: {
        textAlign: 'center',
        fontWeight: '600',
        paddingVertical: 10,
        color: 'white',
        fontSize: 18,
    },
});

export default Live;