import { useEffect, useState } from 'react';

function LiveApiCalls() {
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

  return { matches, loading };
}

export default LiveApiCalls;