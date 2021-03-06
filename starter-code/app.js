const express = require('express');
const hbs = require('hbs');
const path = require('path');
const PunkAPIWrapper = require('punkapi-javascript-wrapper');

const app = express();
const punkAPI = new PunkAPIWrapper();

app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.static(path.join(__dirname, 'public')));

// add the partials here:
hbs.registerPartials(__dirname + "/views/partials")

// add the routes here:
app.get('/', (req, res) => res.render('index'));

app.get('/beers', (req, res) => {
    punkAPI.getBeers() //returns a promise
    .then(beerList => res.render('beers', {beerList:beerList}))
    .catch(error => console.log(error));
});

app.get("/random", (req, res) => {
    punkAPI.getRandom()
    .then(beer => res.render("detail", beer[0]))
    .catch(error => console.log(error));
})

app.get("/beers/:id" , (req, res) => {
    let id = req.params.id;
    punkAPI.getBeer(id)
    .then(beer => res.render("detail", beer[0]))
    .catch(error => console.log(error));
})

app.listen(3000, () => console.log('🏃‍ on port 3000'));
