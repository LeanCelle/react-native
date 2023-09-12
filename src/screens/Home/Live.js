import React, { useState, useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image, FlatList, SafeAreaView } from 'react-native';
import { Ionicons } from '@expo/vector-icons'; 
import ModalSquad from '../../components/modal/Modal';
import Header from '../../components/header/Header';
import BgImage from '../../components/bgimage/BgImage';
import Theme from '../../utils/Themes';

const Live = () => {
    const [matches, setMatches] = useState([]);

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
        })
        .catch((error) => console.log('error', error));
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
                        <Text style={styles.teamName} numberOfLines={2}>
                            {item?.teams?.home?.name}
                        </Text>
                    </View>
                    <View style={styles.allGoals}>
                        <Text style={styles.goals}>{item?.goals?.home}</Text>
                        <Text style={styles.line}>-</Text>
                        <Text style={styles.goals}>{item?.goals?.away}</Text>
                    </View>
                    <View style={styles.teamContainer}>
                        <Image source={{ uri: item?.teams?.away?.logo }} style={styles.logo} />
                        <Text style={styles.teamName} numberOfLines={2}>
                            {item?.teams?.away?.name}
                        </Text>
                    </View>
                    <View>
                        <ModalSquad />
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
            <BgImage>
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
                                                    {match.events
                                                        .filter((event) => event.type === "Goal" && event?.team?.id === match?.teams?.home?.id)
                                                        .map((goalEvent, index) => (
                                                            <Text key={index} style={styles.playersGoals}>
                                                                {goalEvent?.player?.name}
                                                                <Ionicons name="md-football" size={10} color="black" />
                                                            </Text>
                                                        ))}
                                                </View>
                                                <View style={styles.playerGoalAway}>
                                                    {match.events
                                                        .filter((event) => event.type === "Goal" && event?.team?.id === match?.teams?.away?.id)
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
                    <Text style={styles.noMatchesText}>No hay partidos en vivo en este momento</Text>
                )}
            </BgImage>
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
        marginTop: 40,
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
        flexDirection:'row',
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
        borderTopColor: 'black',
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
        flexDirection:'row',
        gap: 4,
        borderTopWidth: 1,
        borderTopColor: 'black',
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
        borderTopColor: 'black',
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
    noMatchesText: {
        backgroundColor: 'black',
        fontWeight: '600',
        textAlign: 'center',
        paddingVertical: 10,
        color: 'white',
        fontSize: 18,
        position: 'absolute',
        top: '50%',
        left: 0,
        right: 0,
        transform: [{ translateY: -10 }],
    },
});

export default Live;