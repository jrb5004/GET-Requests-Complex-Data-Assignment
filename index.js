const baseURL='https://developer.nps.gov/api/v1/parks';


function formatQueryString(params) {
    const queryItems = Object.keys(params)
    .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`)
  return queryItems.join('&');
}

function displayResults(responseJson) {
    $('.results-list').empty;
    for (let i = 0; i < responseJson.data.length; i++) {
        $('.results-list').append(
            `<li><h2>${responseJson.data[i].name}</h2>
            <p>${responseJson.data[i].description}</p>
            <p><a href=${responseJson.data[i].url}>${responseJson.data[i].url}</a></p>
            </li>`
        )};
    $('.results').removeClass('hidden');
} 


function getParks(state, maxResults=10) {
    const params = {
        api_key: 'R9TklYHbCxe8z9ksH5kwqFhnjMiWgHOJEBFzux4b',
        stateCode: state,
        limit: maxResults
    }
    const queryString= formatQueryString(params);
    const url = baseURL + '?' + queryString;

    console.log(url);

    fetch(url)
    .then(response => {
      if (response.ok) {
        return response.json();
      }
      throw new Error(response.statusText);
    })
    .then(responseJson => displayResults(responseJson))
    .catch(err => {
      $('.error-message').text(`Something went wrong: ${err.message}`);
    });
}

function watchInput() {
    $('form').submit(event => {
        event.preventDefault();
        $('.results-list').empty();
        let stateSelection = [$('.state-entry').val().replace(/\s/g,'')];
        console.log(stateSelection);
        let maxResults = $('.max-results').val();
        getParks(stateSelection, maxResults);
    });
}

$(watchInput);