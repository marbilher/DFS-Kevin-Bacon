var data;
var graph

function preload() {
    data = loadJSON('kevin-bacon.json')
}

function setup() {
    noCanvas();
    console.log(data)
    graph = new Graph();

    var movies = data.movies
    for (let i = 0; i < movies.length; i++) {
        let movie = movies[i].title
        let cast = movies[i].cast
        let n = new Node(movie)
        graph.addNode(n)
    }
}