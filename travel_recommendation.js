let data = {};

fetch('travel_recommendation_api.json') 
    .then(response => response.json())
    .then(fetchedData => {
        data = fetchedData;
    })
    .catch(error => {
        console.error("Error in fetching data.", error);  
    });

function filterResults(searchTerm) {
    const resultsContainer = document.getElementById("resultsContainer");
    resultsContainer.innerHTML = '';

    const allResults = [];

    data.countries.forEach(country => {
        if (country.name.toLowerCase().includes(searchTerm.toLowerCase())) {
            allResults.push({ type: 'country', name: country.name, description: '' });
        }

        country.cities.forEach(city => {
           if (city.name.toLowerCase().includes(searchTerm.toLowerCase())) {
               allResults.push({ type:'city', name: city.name, description: city.description, imageUrl: city.imageUrl});
           }
        });
    });

    data.temples.forEach(temple => {
        if (temple.name.toLowerCase().includes(searchTerm.toLowerCase())) {
            allResults.push({ type: 'temple', name: temple.name, description: temple.description, imageUrl: temple.imageUrl});
        }    
    });

    data.beaches.forEach(beach => {
        if (beach.name.toLowerCase().includes(searchTerm.toLowerCase())) {
            allResults.push({ type: 'beach', name: beach.name, description: beach.description, imageUrl: beach.imageUrl});
        }    
    });
    
    if (allResults.length === 0) {
        resultsContainer.innerHTML = '<p>No results found.</p>';
    } else {
        allResults.forEach(result => {
            const resultDiv = document.createElement("div");
            resultDiv.classList.add("result-item");
            resultDiv.innerHTML = `
            <h3>${result.name}</h3>
            ${result.imageUrl ? `<img src="${result.imageUrl}" alt="${result.name}" width="50%">` : ''}
            <p>${result.description}</p>
            <button>Visit</button>
            `;
            resultsContainer.appendChild(resultDiv);
        });
    }
    
}

// Submit Button to start displaying results
function submitSearch() {
    const searchTerm = document.getElementById("searchInput").value.toLowerCase();
    filterResults(searchTerm);
}

// Reset Button to reset results
function resetSearch() {
    document.getElementById("searchInput").value = ''; // Clear search field
    document.getElementById("resultsContainer").innerHTML = ''; // Clear results
}