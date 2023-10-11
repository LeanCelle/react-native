import { useEffect, useState } from 'react';

function HomeApiCalls() {
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

  return { matches, loading, leaguesToShow };
}

export default HomeApiCalls;