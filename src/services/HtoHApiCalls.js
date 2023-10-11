import { useEffect, useState } from 'react';

const HtoHApiCalls = ({ match }) => {
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

  return { headToHeadData, loading };
}

export default HtoHApiCalls;