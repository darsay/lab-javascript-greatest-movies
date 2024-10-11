// Iteration 1: All directors? - Get the array of all directors.
// _Bonus_: It seems some of the directors had directed multiple movies so they will pop up multiple times in the array of directors.
// How could you "clean" a bit this array and make it unified (without duplicates)?
function getAllDirectors(moviesArray) {
    const  directors = moviesArray.map(movie => movie.director);
    const uniqueDirectors = directors.reduce((newDirectors, director) => {
        if (!newDirectors.includes(director)) {
            newDirectors.push(director);
        }

        return newDirectors;        
    }, []);

    return uniqueDirectors;
}

// Iteration 2: Steven Spielberg. The best? - How many drama movies did STEVEN SPIELBERG direct?
function howManyMovies(moviesArray) {
    return moviesArray.filter(
        movie => 
        movie.director ===  "Steven Spielberg" &&
        movie.genre.includes("Drama")
    ).length;
}

// Iteration 3: All scores average - Get the average of all scores with 2 decimals
function scoresAverage(moviesArray) {
    if (moviesArray.length === 0) return 0;
    
    const totalScore = moviesArray.reduce((totalScore, movie) => {
        return totalScore + (movie.score || 0);
    }, 0);
    
    return +(totalScore / moviesArray.length).toFixed(2);
}

// Iteration 4: Drama movies - Get the average of Drama Movies
function dramaMoviesScore(moviesArray) {
    const dramaMovies = moviesArray.filter(movie  => movie.genre.includes("Drama"));

    return scoresAverage(dramaMovies);
}

// Iteration 5: Ordering by year - Order by year, ascending (in growing order)
function orderByYear(moviesArray) {
    return moviesArray
    .map(m=>m)
    .sort((a,b) => {
        const difference = a.year - b.year;
    
        if(difference === 0) {
            return a.title.localeCompare(b.title);
        }

        return difference;
    }
    );
}

// Iteration 6: Alphabetic Order - Order by title and print the first 20 titles
function orderAlphabetically(moviesArray) {
    return moviesArray
    .map(m=>m)
    .sort((a,b) => {
        return a.title.localeCompare(b.title);
    })
    .reduce((movies, movie) =>
    {
        if(movies.length < 20) {
            movies.push(movie);
        }

        return movies;
    }, [])
    .map(movie => movie.title);
}

// BONUS - Iteration 7: Time Format - Turn duration of the movies from hours to minutes
function turnHoursToMinutes(moviesArray) {
    const newMovies =  structuredClone(moviesArray);

    newMovies.map(movie => {
        const movieDuration = movie.duration;
        let totalTime = 0;

        if(movieDuration.includes("h")) {
            const hours = + movieDuration.split("h")[0] * 60;
            totalTime += hours;
        }

        if(movieDuration.includes("min")) {
            const mins = + movieDuration.split("min")[0].split(" ")[1];
            totalTime += mins;
        }

        movie.duration = +totalTime;

        return movie;
    });
    
    return newMovies;
}




// BONUS - Iteration 8: Best yearly score average - Best yearly score average
function bestYearAvg(moviesArray) {
    if(moviesArray.length === 0) return null;

    const moviesByYear = moviesArray
    .reduce((moviesByYear, movie) => {
        if(!moviesByYear[movie.year]) {
            moviesByYear[movie.year] = [];
        }

        moviesByYear[movie.year].push(movie);
        return moviesByYear;
    }, {});
    
    const avgByYear = {};

    Object.keys(moviesByYear).forEach(year => {
        const avgScore = moviesByYear[year].reduce((total, movie) => {
            return total + movie.score;
        }, 0) / moviesByYear[year].length;

        avgByYear[year] = avgScore;
    });        

    const bestYear = Object.keys(avgByYear).reduce((best, year) => {
        if (!best || avgByYear[year] > best.avg || (avgByYear[year] === best.avg && year < best.year)) {
            return { year: year, avg: avgByYear[year] };
        }
        return best;
    }, null);

    return `The best year was ${bestYear.year} with an average score of ${bestYear.avg}`;
}

bestYearAvg(movies);