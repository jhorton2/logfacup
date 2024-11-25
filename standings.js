
document.addEventListener('DOMContentLoaded', async function () {
    const standingsURL = './standings.json'; // Path to the JSON file

    async function fetchStandings() {
        try {
            const response = await fetch(standingsURL);
            const data = await response.json();
            return data.teams;
        } catch (error) {
            console.error('Error fetching standings:', error);
            return [];
        }
    }

    async function renderStandings() {
        const teams = await fetchStandings();
        const tbody = document.querySelector('#standings-table tbody');
        tbody.innerHTML = ''; // Clear loading message

        teams
            .sort((a, b) => b.wins - a.wins || b.points - a.points)
            .forEach(team => {
                const row = document.createElement('tr');
                row.innerHTML = `
                    <td>${team.name}</td>
                    <td>${team.wins}-${team.losses}</td>
                    <td>${team.points.toFixed(2)}</td>
                `;
                tbody.appendChild(row);
            });
    }

    renderStandings();
});
