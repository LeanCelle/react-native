import { Text, View, Image } from 'react-native';
import ModalSquad from '../modal/Modal';

function RenderInLive( { navigation, matches, styles } ) {


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

  return { renderMatchItem, leagueSections, matches };
}

export default RenderInLive;