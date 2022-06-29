class Graph {

    static #VertexID = 0;
    static #directed = false;
    constructor() {
        this.Vertices = [];
        this.FontSize = 25;
    }

    draw(isDirected) { 
        Graph.#directed = isDirected;
        for (let v of this.Vertices)
            v.draw(isDirected);
    }

    addVertex() { 
        // if (this.Vertices.length == 0) {
        //    var vertex = new Vertex(300, 100, Graph.#VertexID++);
        //    this.Vertices.push(vertex);
        // }
        // else {
        //     let x = this.Vertices[this.Vertices.length - 1].x;
        //     let y = this.Vertices[this.Vertices.length - 1].y;
        //     var vertex = new Vertex(x + this.Diameter * 2, y, Graph.#VertexID++);
        //     this.Vertices.push(vertex);
        // }
        if (this.Vertices.length == 0)
            Graph.#VertexID = 0;
        var vertex = new Vertex(mouseX, mouseY, Graph.#VertexID++);
        this.Vertices.push(vertex);
    }

    removeVertex() {
        var vertex = this.findSelectedVertex();
        if (vertex) {
            this.Vertices = this.Vertices.filter((v) => v.id != vertex.id);
            for (let v of this.Vertices) {
                v.edges = v.edges.filter((e) => e.vertexB.id != vertex.id);
            }
        }
    }

    addEdge(vertexA, backgroundA, colorA, vertexB, backgroundB, colorB, weight, edgeColor, edgeWeight) {
        vertexA.color = colorA;
        vertexB.color = colorB;
        vertexA.background = backgroundA;
        vertexB.background = backgroundB; 
        vertexA.addEdge(vertexB, weight, edgeColor, edgeWeight); 
        if (Graph.#directed == false) 
            vertexB.addEdge(vertexA, weight, edgeColor, edgeWeight);
        
    }

    findSelectedVertex() {
        let vertex = null;
        for (let v of this.Vertices) {
            if (dist(v.x, v.y, mouseX, mouseY) < 60 / 2) 
                vertex = v; 
            v.default();
        }
        if (vertex)
            vertex.choose();
        return vertex;
    }

    findVertexByID(id) {
        for (let v of this.Vertices) {
            if (v.id == id)
                return v;
        }
        return null;
    }

    remove() {
        this.Vertices = [];
        Graph.#VertexID = 0;
    }

    refesh() {
        for (let v of this.Vertices) {
            v.default();
        }
    }
}