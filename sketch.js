var data;
var graph

function preload() {
    data = loadJSON('kevin-bacon.json')
}

function setup() {
    noCanvas();
    graph = new Graph();

    var movies = data.movies
    for (let i = 0; i < movies.length; i++) {
        let movie = movies[i].title
        let cast = movies[i].cast
        let movieNode = new Node(movie)
        graph.addNode(movieNode)

        for (let j = 0; j < cast.length; j++) {
            let actor = cast[j]
            let actorNode = graph.getNode(actor)
            if(actorNode == undefined) {
                actorNode = new Node(actor)
            }
            graph.addNode(actorNode)
            movieNode.addEdge(actorNode)
        }
    }
    let start = graph.setStart("Rachel McAdams")
    let end = graph.setEnd("Kevin Bacon")
    console.log(graph)

    let fakeQueue = []

    start.searched = true
    fakeQueue.push(start)

    while(fakeQueue.length > 0) {
        let current = fakeQueue.shift();
        if(current == end) {
            break
        }
        let edges = current.edges
        for(let i = 0; i < edges.length; i++) {
            let neighbor = edges[i]
            if(!neighbor.searched) {
                neighbor.searched = true
                neighbor.parent = current
                fakeQueue.push(neighbor)
            }
        }
    }

    let path = []
    path.push(end)
    let next = end.parent
    while (next != null) {
        console.log(next.value)
        path.push(next)
        next = next.parent
    }
}
