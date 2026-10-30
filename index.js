import React, { useEffect, useState } from "react";
import { Table } from "reactstrap";

export default function StandingsListing(props) {
    const [standings, setStandings] = useState(null);

    useEffect(() => {
        let ignore = false;

        fetch(`/api/v1/seasons/${props.seasonId}/standings`)
            .then((response) => {
                if (!response.ok) {
                    throw new Error("NOT ENOUGH MATCHES");
                }
                return response.json();
            })
            .then((data) => {
                if (!ignore) {
                    setStandings(Array.isArray(data) ? data : []);
                }
            })
            .catch(() => {
                if (!ignore) {
                    setStandings([]);
                }
            });

        return () => {
            ignore = true;
        };
    }, [props.seasonId]);



    if (standings === null) {
        return null;
    }

    return (
        <Table striped>
            <thead>
                <tr>
                    <th>Player</th>
                    <th>Elo</th>
                    <th>Wins</th>
                    <th>Losses</th>
                    <th>Draws</th>
                    <th>Win Percentage</th>
                </tr>
            </thead>
            <tbody>
                {standings.map((team) => (
                    <tr key={team.id}>
                        <td>{team.player.username}</td>
                        <td>{team.elo}</td>
                        <td>{team.wins}</td>
                        <td>{team.losses}</td>
                        <td>{team.draws}</td>
                        <td>{team.winRate}</td>
                    </tr>
                ))}
            </tbody>
        </Table>
    );
};