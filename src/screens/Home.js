import { StyleSheet, Text, View, SafeAreaView, FlatList, Image, ActivityIndicator } from 'react-native';
import Header from '../components/header/Header';
import Theme from '../utils/Themes';
import HomeApiCalls from '../services/HomeApiCalls';
import RenderInHome from '../components/renderItems/renderHome';

const Home = ({ navigation }) => {

  const { matches, loading, leaguesToShow } = HomeApiCalls();

  const renderData = RenderInHome({ navigation, matches, styles });


  const groupMatchesByLeague = (matches) => {
    const leagueData = {};

    matches.forEach((match) => {
      const leagueName = match?.league?.name;
      const leagueCountry = match?.league?.country;
      const uniqueLeagueName = `${leagueCountry} - ${leagueName}`;

      if (leaguesToShow.includes(leagueName)) {
        if (!leagueData[uniqueLeagueName]) {
          leagueData[uniqueLeagueName] = {
            matches: [],
            logo: match?.league?.logo,
          };
        }
        leagueData[uniqueLeagueName].matches.push(match);
      }
    });

    const uniqueLeagues = Object.entries(leagueData).map(([leagueName, data]) => ({
      key: leagueName,
      leagueName: leagueName.split(' - ')[1],
      matches: data?.matches,
      logo: data?.logo,
    }));

    return uniqueLeagues;
  };

  return (
    <SafeAreaView style={styles.container}>
      <Header>
        <Text style={styles.text}>Partidos del día</Text>
      </Header>
      {loading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="grey" />
        </View>
      ) : (
        <>
          {matches.length === 0 ? (
            <View style={styles.noMatchesContainer}>
              <Text style={styles.noMatchesText}>No se encontraron próximos partidos</Text>
            </View>
          ) : (
            <FlatList
              data={groupMatchesByLeague(matches)}
              renderItem={({ item }) => (
                <View key={item.key}>
                  <View style={styles.leagueContainer}>
                    <Image source={{ uri: item?.logo }} style={styles.leagueLogo} />
                    <Text style={styles.leagueTitle}>{item.leagueName}</Text>
                  </View>
                  <FlatList
                    data={item.matches}
                    renderItem={renderData?.renderMatchItem}
                    keyExtractor={(_, index) => index.toString()}
                  />
                </View>
              )}
              keyExtractor={(item) => item.key}
            />
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
  leagueTitle: {
    color: 'white',
    textAlign: 'center',
    fontWeight: '500',
    fontSize: 18,
  },
  leagueFlag: {
    resizeMode: 'contain',
    width: 25,
    height: 25,
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
  hourContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 60,
    width: 50,
    backgroundColor: 'white',
  },
  hourText: {
    color: 'black',
    fontWeight: 'bold',
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
    color: 'black',
    marginTop: 5,
  },
  scoreContainer: {
    backgroundColor: 'white',
    width: 40,
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
  },
  elapsedText: {
    color: 'black',
    fontWeight: 'bold',
  },
  score: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 18,
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

export default Home;