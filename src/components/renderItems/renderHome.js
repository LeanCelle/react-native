import { Text, View, Image } from 'react-native';
import ModalSquad from '../modal/Modal';

function RenderInHome({ navigation, matches, styles }) {
  const renderMatchItem = ({ item }) => {
    if (!item) {
      return null;
    }

    const scheduledTime = new Date(item?.fixture?.date);
    const hour = scheduledTime.getHours();
    const minutes = scheduledTime.getMinutes();
    let formattedTime = `${hour.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;

    let matchResult = "VS";

    if (item?.score?.fulltime?.home !== null && item?.score?.fulltime?.away !== null) {
      matchResult = `${item.score.fulltime.home} - ${item.score.fulltime.away}`;
      formattedTime = "FIN";
    }

    return (
      <View style={styles.matchContainer}>
        <View style={styles.teamsContainer}>
          <View style={styles.hourContainer}>
            <Text style={styles.hourText}>{formattedTime}</Text>
          </View>
          <View style={styles.teamContainer}>
            <Image source={{ uri: item?.teams?.home?.logo }} style={styles.logo} />
            <Text style={styles.teamName} numberOfLines={2}>{item?.teams?.home?.name}</Text>
          </View>
          <View style={styles.scoreContainer}>
            <Text style={styles.elapsedText}>{matchResult}</Text>
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

  return { renderMatchItem, matches };
}

export default RenderInHome;