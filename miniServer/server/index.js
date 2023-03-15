const Application = require("./framework/Application");
const filmRouter = require('./routes/film.routes');
const genreRouter = require('./routes/genre.routes');
const filmGenreRouter = require('./routes/filmsGenre.router');
const jsonParser = require('./framework/parseJson');
const urlParser = require('./framework/parseUrl');

const PORT = process.env.PORT || 8080;

const app = new Application();

app.use(jsonParser);
app.use(urlParser(`http://localhost:${PORT}`));

app.addRouter(filmRouter);
app.addRouter(genreRouter);
app.addRouter(filmGenreRouter);

app.listen(PORT, () => console.log("it's work!"))