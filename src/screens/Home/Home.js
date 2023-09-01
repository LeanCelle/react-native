import React, { useState, useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image, ImageBackground, FlatList } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons'; 
import ModalSquad from '../../components/modal/Modal';

const Home = () => {
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
        .then((data) => {console.log(data.response); setMatches(data.response);})
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

    const renderMatchItem = ({ item }) => (
        <View style={styles.matchContainer} key={item?.fixture?.id}>
            <View style={styles.teamsContainer}>
                <View style={styles.time}>
                    {item?.fixture?.status?.short === "FT" ? (
                        <Text style={styles.elapsedText}>Final</Text>
                    ) : item?.fixture?.status?.short === "HT" ? (
                        <Text style={styles.elapsedText}>ET</Text>
                    ) : (
                        <Text style={styles.elapsedText}>
                            {item?.fixture?.status?.elapsed}'
                        </Text>
                    )}
                </View>
                <View style={styles.teamContainer}>
                    <Image
                        source={{ uri: item?.teams?.home?.logo }}
                        style={styles.logo}
                    />
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
                    <Image
                        source={{ uri: item?.teams?.away?.logo }}
                        style={styles.logo}
                    />
                    <Text style={styles.teamName} numberOfLines={2}>
                        {item?.teams?.away?.name}
                    </Text>
                </View>
                <View>
                    <ModalSquad/>
                </View>
            </View>
        </View>
    );

    const leagueSections = Object.keys(groupedMatches).map((leagueName) => ({
        title: leagueName,
        data: groupedMatches[leagueName],
    }));

return (
    <View style={styles.container}>
        <View style={styles.partidosVivo}>
            <Text style={styles.text}>Partidos en vivo</Text>
            <MaterialIcons name="live-tv" size={24} color="red" />
        </View>
        <ImageBackground
        source={{uri: 'https://i.postimg.cc/1tvk7tH3/photo-1546608235-3310a2494cdf.jpg'}}
        style={styles.imageBackground}
        >
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
                                    <Text key={index} style={styles.playersGoals}>{goalEvent?.player?.name}
                                    <Ionicons name="md-football" size={12} color="black" />
                                    </Text>
                                    ))}
                                </View>
                                <View style={styles.playerGoalAway}>
                                    {match.events
                                    .filter((event) => event.type === "Goal" && event?.team?.id === match?.teams?.away?.id)
                                    .map((goalEvent, index) => (
                                    <Text key={index} style={styles.playersGoals}>{goalEvent?.player?.name}
                                    <Ionicons name="md-football" size={12} color="black" />
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
        </ImageBackground>
        <StatusBar style="auto" />
    </View>
    );
}

const styles = StyleSheet.create({

    container: {
        flex: 1,
        backgroundColor: 'white',
        alignItems: 'center',
        justifyContent: 'center',
    },
    partidosVivo: {
        width: '100%',
        flexDirection: 'row',
        backgroundColor: 'white',
        justifyContent: 'center',
        alignItems: 'center',
        paddingTop: 40,
        paddingBottom: 10,
        gap: 10,
    },
    text: {
        fontWeight: 'bold',
        fontSize: 20,
        color: 'black',
    },
    imageBackground: {
        flex: 1,
        resizeMode: 'cover',
        width: '100%',
    },

    leagueContainer: {
        backgroundColor: '#E6E6E6',
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
        color: 'black',
        textAlign: 'center',
        fontWeight: '500',
        fontSize: 18,
    },
    leagueLogo: {
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
        backgroundColor: '#E6E6E6',
        width: '100%',
        alignItems: 'center',
        flexDirection: 'column',
        justifyContent: 'center',
        gap: 3,
        borderTopWidth: 1,
        borderTopColor: 'black',
    },
    logo: {
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
    noMatchesText: {
        backgroundColor: 'white',
        fontWeight: '600',
        paddingVertical: 10,
        textAlign: 'center',
        color: 'black',
        fontSize: 18,
        position: 'absolute',
        top: '50%',
        left: 0,
        right: 0,
        transform: [{ translateY: -10 }],
      },
    goalsView: {
        flexDirection: 'row',
        paddingHorizontal: 15,
    },
    playerGoalHome: {
        alignItems: 'center',
        gap: 2,
        backgroundColor: '#EDEBED',
        flexDirection: 'row',
        paddingVertical: 2,
        paddingHorizontal: 4,
        flexWrap: 'wrap',
        width: '50%',
    },
    playerGoalAway: {
        alignItems: 'center',
        gap: 2,
        backgroundColor: '#EDEBED',
        borderLeftWidth: 1,
        borderLeftColor: 'white',
        flexDirection: 'row',
        paddingVertical: 2,
        paddingHorizontal: 4,
        flexWrap: 'wrap',
        width: '50%',
    },
    playersGoals: {
        color: 'black',
    },
});

export default Home;