class Vertex {
    static #directed = false;
    static nextId = 1;

    constructor (posX, posY, id) {
        this.id = id;
        this.x = posX;
        this.y = posY;
        this.name =  this.id + 1;

        this.visited = -1;

        this.background = '#ecf0f1';
        this.color = 'black';

        this.mstId = 0;

        this.edges = [];

    }

    draw(isDirected) {
        Vertex.#directed = isDirected;
        for (let e of this.edges) {
            if (Vertex.#directed == true) {
                this.drawEdge(this, e.vertexB, e.weight, e.color, e.edgeWeight);
            }
            else {
                if (e.vertexB.id > this.id)
                    this.drawEdge(this, e.vertexB, e.weight, e.color, e.edgeWeight);
            }
        } 
        this.drawVertex();
    }

    drawVertex() {
        stroke('black');
        strokeWeight(5);
        fill(this.background);
        circle(this.x, this.y, 60);
        cursor('pointer'); 
        fill(this.color);
        strokeWeight(1);
        textSize(20); 
        var txt = textWidth(this.name);
        text(this.name, this.x - txt / 2, this.y + 5); 
    }

    drawEdge(vertexA, vertexB, weight, color, edgeWeight) {
        stroke(color);
        strokeWeight(edgeWeight);
        var size = int(dist(vertexA.x, vertexA.y, vertexB.x, vertexB.y));
        var xA = vertexA.x - (vertexA.x - vertexB.x) * ((60 / 2) / size);
		var yA = vertexA.y - (vertexA.y - vertexB.y) * ((60 / 2) / size);
		var xB = vertexB.x + (vertexA.x - vertexB.x) * ((60 / 2) / size);
		var yB = vertexB.y + (vertexA.y - vertexB.y) * ((60 / 2) / size);
        if (weight != 0) {
            line(xA, yA, xB, yB);
            push();
            translate((xA + xB) / 2, (yA + yB) / 2);
            if (xA < xB)
                rotate(atan2(yB - yA, xB - xA));
            else
                rotate(atan2(yA - yB, xA - xB));
            stroke(color);
            strokeWeight(0);
            fill(color);
            textSize(int(18));
            text(weight, -(textWidth(weight) * 0.6), -10);
            pop(); 
        }
        if (Vertex.#directed == true) {
            strokeWeight(1);
            stroke(color);
            fill(color);
            push();
            translate((xA + xB) / 2, (yA + yB) / 2);
            rotate(atan2(yB - yA, xB - xA));
            push();
            translate((size - 60) / 2, 0);
            const d = (0.5 * (size - 60)) / 2;
            rotate(atan2(d, d * 100));
            triangle(-20, -5, -20, 5, 0, 0);
            pop();
            pop();
        }
        
        return;
    }

    choose() {
        this.background = '#2c3e50';
        this.color = '#ecf0f1';
        for (let e of this.edges) {
            e.vertexB.background = '#27ae60';
            e.color = "#2ecc71";
            for (let E of e.vertexB.edges) {
                if (E.vertexB.id == this.id) {
                    E.color = "#2ecc71";
                }
            }
        }
    }

    default() {
        this.background = '#ecf0f1';
        this.color = 'black';
        for (let e of this.edges) {
            e.color = 'black';
            e.edgeWeight = 3;
        }
    }

    addEdge(vertexB, weight, color, edgeWeight) {
        var isEdge = this.findEdge(vertexB.id);
        if (isEdge) { 
            isEdge.weight = weight;
            isEdge.color = color;
            isEdge.edgeWeight = edgeWeight; 
            if (weight == 0) {
                this.edges = this.edges.filter((edge) => edge.weight != 0); 
            }
        }
        else {
            if (weight != 0) {
                this.edges.push(new Edge(this, vertexB, weight, color, edgeWeight)); ;      
            }
        }
    }

    findEdge(id) {
        for (let e of this.edges) {
            if (e.vertexB.id == id)
                return e;
        }
        return null;
    }

    findEdgeWeight(id) {
        for (let e of this.edges) {
            if (e.vertexB.id == id)
                return e.weight;
        }
        return null;
    }
}