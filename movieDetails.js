
const movieDetail = document.querySelector("#movie-detail");

const params = new URLSearchParams(location.search)
const imdbID = params.get("id");
// console.log(imdbID);
if (imdbID) {
    searchMovie(imdbID.trim());
}

async function searchMovie(imdbID) {
    let response = await fetch(`http://www.omdbapi.com/?apikey=7a461a79&i=${imdbID}&plot=full`);
    let data = await response.json();
    console.log(data);
    if (data.Response === "True") {
        displayMovie(data);
    }
    else {
        console.log(data.Error);
    }
}


function displayMovie(data){

    const label = "mb-0.5 text-[0.72rem] font-semibold tracking-[0.12em] uppercase text-muted";
    const metaItem = "after:content-['/'] after:mx-2.5 after:text-line last:after:hidden";
    const btn = "inline-block px-5 py-2.5 border border-brick rounded-[3px] text-sm font-semibold transition-colors";

    movieDetail.innerHTML = `<div class="bg-panel border border-line rounded-[3px] p-2 max-w-65 md:max-w-none">
            <img src="${data.Poster}" alt="${data.Title} poster" class="w-full">
        </div>

        <div>
            <h2 class="mb-3 font-display font-bold text-[clamp(2rem,4.5vw,3rem)] leading-[1.1] tracking-tight">${data.Title}</h2>
            <section class="flex flex-wrap pb-5 mb-5.5 border-b border-dashed border-line text-sm text-muted">
                <p class="${metaItem}">${data.Released}</p>
                <p class="${metaItem}">${data.Rated}</p>
                <p class="${metaItem}">${data.Runtime}</p>
                <p class="${metaItem}">${data.Genre}</p>
                <p class="${metaItem} text-brick font-semibold">IMDB ${data.imdbRating}</p>
            </section>

            <div class="mb-5.5">
                <p class="${label}">Plot Overview</p>
                <p>${data.Plot}</p>
            </div>
            <div class="grid sm:grid-cols-2 gap-4.5 mb-5.5">
                <section>
                    <p class="${label}">Director</p>
                    <p>${data.Director}</p>
                </section>
                <section>
                    <p class="${label}">Writer</p>
                    <p>${data.Writer}</p>
                </section>
            </div>
            <div class="mb-5.5">
                <p class="${label}">Actors</p>
                <p>${data.Actors}</p>
            </div>
            <div class="grid sm:grid-cols-2 gap-4.5 mb-5.5">
                <section>
                    <p class="${label}">Language</p>
                    <p>${data.Language}</p>
                </section>
                <section>
                    <p class="${label}">Country</p>
                    <p>${data.Country}</p>
                </section>
            </div>
            <div class="flex flex-wrap gap-3 mt-2">
                <a class="${btn} text-brick hover:bg-brick hover:text-white" href="index.html">&larr; Back to search</a>
                <a class="${btn} bg-brick text-white hover:bg-brick-dark hover:border-brick-dark" href="https://www.imdb.com/title/${data.imdbID}/" target="_blank" rel="noopener">Watch</a>
            </div>
        </div>`
}
