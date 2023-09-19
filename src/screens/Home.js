import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, SafeAreaView, FlatList, Image, ActivityIndicator } from 'react-native';
import Header from '../components/header/Header';
import Theme from '../utils/Themes';
import ModalSquad from '../components/modal/Modal';

const Home = ({ navigation }) => {
  const [matches, setMatches] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const today = new Date();
    const formattedDate = today.toISOString().split('T')[0];

    fetch(`http://v3.football.api-sports.io/fixtures?date=${formattedDate}`, {
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

  const leaguesToShow = [
    "Liga Profesional Argentina",
    "Copa de la Liga Profesional",
    "Trofeo de Campeones de la Superliga",
    "Super Copa",
    "Primera Nacional",
    "Primera B Metropolitana",
    "Primera C",
    "Primera D",
    "Torneo Federal A",
    "Reserve League",
    "Copa Argentina",
    "Copa Do Brasil",
    "CONMEBOL Libertadores",
    "CONMEBOL Sudamericana",
    "Major League Soccer",
    "Pro League",
    "Liga MX",
    "Premier League",
    "FA Cup",
    "League Cup",
    "La Liga",
    "Serie A",
    "Ligue 1",
    "Bundesliga",
    "UEFA Champions League",
    "Euro Championship",
    "UEFA Nations League",
    "UEFA Europa League",
    "Conference League",
    "World Cup",
    "World Cup - Women",
    "Friendlies",
    "Copa America",
    "Eurocopa",
    "World Cup - Qualification South America",
    "World Cup - Qualification Europe",
    "FIFA Club World Cup",
  ];

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
      flag: data?.flag,
    }));
  
    return uniqueLeagues;
  };

  const renderMatchItem = ({ item }) => {
    const scheduledTime = new Date(item?.fixture?.date);
    const hour = scheduledTime.getHours();
    const minutes = scheduledTime.getMinutes();
    let formattedTime = `${hour.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
  
    let matchResult = "VS"; // Valor predeterminado
  
    if (item?.score?.fulltime?.home !== null && item?.score?.fulltime?.away !== null) {
      // Si hay información de resultado disponible, mostrar el resultado
      matchResult = `${item.score.fulltime.home} - ${item.score.fulltime.away}`;
      formattedTime = "FIN"
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
            <ModalSquad/>
          </View>
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <Header>
        <Text style={styles.text}>DE PRIMERA</Text>
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
                    <Image source={{ uri: item?.league?.flag }} style={styles.leagueFlag} />
                    <Text style={styles.leagueTitle}>{item.leagueName}</Text>
                    <Image source={{ uri: item?.logo }} style={styles.leagueLogo} />
                  </View>
                  <FlatList
                    data={item.matches}
                    renderItem={renderMatchItem}
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
    fontFamily: Theme.fontFamily.QuicksandBold,
    letterSpacing: 4,
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