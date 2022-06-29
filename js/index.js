let btnAddVertex;
// let btnRemoveVertex;
let btnRemoveGraph;
let btnSelectVertexA;
let btnSelectVertexB;
let btnAddEdge;
let btnSelectPrim;
let btnFloyd;
let btnKruskal;
let btnMax;
let btnMin;
let btnSelectFromVertexA;
let btnSelectToVertexB;
let btnFindFloyd;
let btnDirected;
let btnUnDirected;

let textGraph;

let inputWeight;
let inputSpeed;

let isDirected = false;
let isAddVertexOn = false;
let isRemoveVertexOn = false;
let isSelectVertexA = false;
let isSelectVertexB = false;
let isSelectFromVertexA = false;
let isSelectToVertexB = false;
let isSelectStartPrim = false;
let isPrimStarted = false;
let isFloydStarted = false;
let isFloydRunning = false;
let isKruskalRunning = false;
let isKruskalStarted = false;
let isMouseDragg = false;
let isMST = true;

let selectedVertex = null;
let selectedVertexA = null;
let selectedVertexB = null;

const INF  = 100000000;
const graph = new Graph();
const delay = (ms) => new Promise((res) => setTimeout(res, ms));

var L = new Array();
var maxtrix = new Array();
var Previous = new Array();

function setup() {
    width = 1200;
	height = 690;

	let cnv = createCanvas(width, height);
    cnv.position(30, 30);  
    cnv.mousePressed(paintCanvas);

    // NÚT THÊM ĐỈNH
    let title = createElement('span', 'Bấm để thêm đỉnh');
    title.position(1250, 95);
    btnAddVertex = createButton('Thêm đỉnh');
    btnAddVertex.id('buttonAddVertex'); 
	btnAddVertex.position(1250, 120);
	btnAddVertex.mousePressed(addVertex);

    // NÚT XÓA ĐỈNH
    // title = createElement('span', 'Bấm và chọn đỉnh cần xóa');
    // title.position(1250, 175);
    // btnRemoveVertex = createButton('Xóa đỉnh');
    // btnRemoveVertex.id('buttonRemoveVertex'); 
	// btnRemoveVertex.position(1250, 200);
	// btnRemoveVertex.mousePressed(removeVertex);

    // LÀM MỚI CANVAS (XÓA ĐỒ THỊ)
    title = createElement('span', 'Bấm để xóa đồ thị');
    title.position(1250, 175);
    btnRemoveGraph = createButton('Xóa đồ thị');
    btnRemoveGraph.id('buttonRemoveGraph'); 
	btnRemoveGraph.position(1250, 200);
	btnRemoveGraph.mousePressed(removeGragh);

    // NÚT CHỌN CẠNH A
    title = createElement('span', 'Thêm cạnh');
    title.position(1250, 285);
    btnSelectVertexA = createButton('Từ đỉnh');
    btnSelectVertexA.id('buttonSelectVertexA');
	btnSelectVertexA.position(1250, 310);
	btnSelectVertexA.mousePressed(selectVertexA);

    // NÚT CHỌN CẠNH B
    btnSelectVertexB = createButton('Đến đỉnh');
    btnSelectVertexB.id('buttonSelectVertexB');
	btnSelectVertexB.position(1420, 310);
	btnSelectVertexB.mousePressed(selectVertexB);
    
    // Ô NHẬP TRỌNG SỐ
    inputWeight = createInput('0');
    inputWeight.id('inputWeight'); 
    inputWeight.position(1340, 310);
    document.getElementById('inputWeight').setAttribute('type', 'number');
    
    // NÚT THÊM CẠNH
    btnAddEdge = createButton('Thêm');
    btnAddEdge.id('buttonAddEdge');
    btnAddEdge.position(1250, 360);
    btnAddEdge.mousePressed(addEdge);

    // NÚT CHỌN THUẬT TOÁN PRIM
    // title = createElement('span', 'Thuật toán Prim');
    // title.position(1250, 525);
    // btnSelectPrim = createButton('Bắt đầu thuật toán Prim');
    // btnSelectPrim.id('buttonSelectPrim');
    // btnSelectPrim.position(1250, 550);
    // btnSelectPrim.mousePressed(selectStartPrim);

    title = createElement('span', 'Thuật toán Kruskal');
    title.position(1250, 445);
    btnKruskal = createButton('Bắt đầu thuật toán Kruskal');
    btnKruskal.id('buttonStartKruskal');
    btnKruskal.position(1250, 470);
    btnKruskal.mousePressed(selectStartKruskal);

    // NHỎ NHẤT HOẶC LỚN NHẤT
    btnMin = createButton('Nhỏ nhất');
    btnMin.id('buttonMin');
    btnMin.position(1250, 520);
    btnMin.mousePressed(setMin);
    btnMax = createButton('Lớn nhất');
    btnMax.id('buttonMax');
    btnMax.position(1380, 520);
    document.getElementById('buttonMin').style.background = '#2c3e50';
    document.getElementById('buttonMin').style.color = '#ecf0f1';
    btnMax.mousePressed(setMax);

    // NÚT CHỌN THUẬT TOÁN FLOYD
    title = createElement('span', 'Thuật toán Floyd');
    title.position(1250, 605);
    btnFloyd = createButton('Bắt đầu thuật toán Floyd');
    btnFloyd.id('buttonStartFloyd');
    btnFloyd.position(1250, 630);
    btnFloyd.mousePressed(startFloyd);

    // NÚT CHỌN TÌM ĐƯỜNG TỪ ĐỈNH A
    btnSelectFromVertexA = createButton('Từ đỉnh');
    btnSelectFromVertexA.id('buttonSelectFromVertexA');
	btnSelectFromVertexA.position(1250, 680);
	btnSelectFromVertexA.mousePressed(selectFromVertexA);

    // NÚT CHỌN TÌM ĐƯỜNG ĐẾN ĐỈNH B
    btnSelectToVertexB = createButton('Đến đỉnh');
    btnSelectToVertexB.id('buttonSelectToVertexB');
	btnSelectToVertexB.position(1380, 680);
	btnSelectToVertexB.mousePressed(selectToVertexB); 

    // Ô NHẬP TỐC ĐỘ
    title = createElement('span', 'Tốc độ (ms):');
    title.position(700, 730);
    inputSpeed = createInput('100');
    inputSpeed.id('inputSpeed'); 
    inputSpeed.position(810, 722);
    inputSpeed.size(110, 35);
    document.getElementById('inputSpeed').setAttribute('type', 'number');

    // CHỌN ĐỒ THỊ VÔ HƯỚNG HOẶC CÓ HƯỚNG
    title = createElement('span', 'Đơn đồ thị: ');
    title.position(960, 730);
    btnDirected = createButton('Có hướng');
    btnDirected.id('buttonDirected');
    btnDirected.position(1060, 722);
    btnDirected.mousePressed(setDirected);
    btnUnDirected = createButton('Vô hướng');
    btnUnDirected.id('buttonUnDirected');
    btnUnDirected.position(1150, 722);
    document.getElementById('buttonUnDirected').style.background = '#2c3e50';
    document.getElementById('buttonUnDirected').style.color = '#ecf0f1';
    btnUnDirected.mousePressed(setUnDirected);
}

// VẼ
function draw() { 
    background(255);
    graph.draw(isDirected);
    noLoop();
}

function paintCanvas() {
    if (isAddVertexOn == true) {
        createNode();
    }
    else if (isRemoveVertexOn == true) {
        removeNode();
    }
}

// THÊM ĐỈNH
function addVertex() {
    if (isAddVertexOn === false) {
        isAddVertexOn = true;
        document.getElementById('buttonAddVertex').style.background = '#2c3e50';
        document.getElementById('buttonAddVertex').style.color = '#ecf0f1';
        document.getElementById('buttonAddVertex').innerHTML = 'Tắt thêm đỉnh';
        
        // isRemoveVertexOn = false;
        // document.getElementById('buttonRemoveVertex').style.background = '#ecf0f1';
        // document.getElementById('buttonRemoveVertex').style.color = 'black';
        // document.getElementById('buttonRemoveVertex').innerHTML = 'Xóa đỉnh';
    }
    else {
        isAddVertexOn = false;
        document.getElementById('buttonAddVertex').style.background = '#ecf0f1';
        document.getElementById('buttonAddVertex').style.color = 'black';
        document.getElementById('buttonAddVertex').innerHTML = 'Thêm đỉnh';
    }    

    isSelectVertexA = false;
    isSelectVertexB = false;
    document.getElementById('buttonSelectVertexA').style.background = '#ecf0f1';
    document.getElementById('buttonSelectVertexA').style.color = 'black';
    document.getElementById('buttonSelectVertexB').style.background = '#ecf0f1';
    document.getElementById('buttonSelectVertexB').style.color = 'black';

    // isSelectStartPrim = false;
    // document.getElementById('buttonSelectPrim').style.background = '#ecf0f1';
    // document.getElementById('buttonSelectPrim').style.color = 'black';
    // document.getElementById('buttonSelectPrim').innerHTML = "Bắt đầu thuật toán Prim";
    // createNode();
    // graph.addVertex();
}

function createNode() {
    if (isAddVertexOn == true) {
        graph.addVertex();
        loop();
    }
}

// XÓA ĐỈNH
// function removeVertex() {
//     if (isRemoveVertexOn === false) {
//         isRemoveVertexOn = true;
//         document.getElementById('buttonRemoveVertex').style.background = '#2c3e50';
//         document.getElementById('buttonRemoveVertex').style.color = '#ecf0f1';
//         document.getElementById('buttonRemoveVertex').innerHTML = 'Tắt xóa đỉnh';

//         isAddVertexOn = false;
//         document.getElementById('buttonAddVertex').style.background = '#ecf0f1';
//         document.getElementById('buttonAddVertex').style.color = 'black';
//         document.getElementById('buttonAddVertex').innerHTML = 'Thêm đỉnh';
        
//     }
//     else {
//         isRemoveVertexOn = false;
//         document.getElementById('buttonRemoveVertex').style.background = '#ecf0f1';
//         document.getElementById('buttonRemoveVertex').style.color = 'black';
//         document.getElementById('buttonRemoveVertex').innerHTML = 'Xóa đỉnh';
//     }    

//     isSelectVertexA = false;
//     isSelectVertexB = false;
//     document.getElementById('buttonSelectVertexA').style.background = '#ecf0f1';
//     document.getElementById('buttonSelectVertexA').style.color = 'black';
//     document.getElementById('buttonSelectVertexB').style.background = '#ecf0f1';
//     document.getElementById('buttonSelectVertexB').style.color = 'black';

//     isSelectStartPrim = false;
//     document.getElementById('buttonSelectPrim').style.background = '#ecf0f1';
//     document.getElementById('buttonSelectPrim').style.color = 'black';
//     document.getElementById('buttonSelectPrim').innerHTML = "Bắt đầu thuật toán Prim";
//     // createNode();
//     // graph.addVertex();
// }

// function removeNode() {
//     if (isRemoveVertexOn == true) {
//         graph.removeVertex();
//         loop();
//     }
// }

// CHỌN ĐỈNH A
function selectVertexA() {
    isAddVertexOn = false;
    // isRemoveVertexOn = false;
    document.getElementById('buttonAddVertex').style.background = '#ecf0f1';
    document.getElementById('buttonAddVertex').style.color = 'black';
    document.getElementById('buttonAddVertex').innerHTML = 'Thêm đỉnh';
    // document.getElementById('buttonRemoveVertex').style.background = '#ecf0f1';
    // document.getElementById('buttonRemoveVertex').style.color = 'black';
    // document.getElementById('buttonRemoveVertex').innerHTML = 'Xóa đỉnh';

    isSelectVertexA = true;
    isSelectVertexB = false;
    document.getElementById('buttonSelectVertexA').style.background = '#2c3e50';
    document.getElementById('buttonSelectVertexA').style.color = '#ecf0f1';
    document.getElementById('buttonSelectVertexB').style.background = '#ecf0f1';
    document.getElementById('buttonSelectVertexB').style.color = 'black';
    
    // isSelectStartPrim = false;
    // document.getElementById('buttonSelectPrim').style.background = '#ecf0f1';
    // document.getElementById('buttonSelectPrim').style.color = 'black';
    // document.getElementById('buttonSelectPrim').innerHTML = "Bắt đầu thuật toán Prim";
}

// CHỌN ĐỈNH B
function selectVertexB() {
    isAddVertexOn = false;
    // isRemoveVertexOn = false;
    document.getElementById('buttonAddVertex').style.background = '#ecf0f1';
    document.getElementById('buttonAddVertex').style.color = 'black';
    document.getElementById('buttonAddVertex').innerHTML = 'Thêm đỉnh';
    // document.getElementById('buttonRemoveVertex').style.background = '#ecf0f1';
    // document.getElementById('buttonRemoveVertex').style.color = 'black';
    // document.getElementById('buttonRemoveVertex').innerHTML = 'Xóa đỉnh';

    isSelectVertexA = false;
    isSelectVertexB = true;

    document.getElementById('buttonSelectVertexB').style.background = '#2c3e50';
    document.getElementById('buttonSelectVertexB').style.color = '#ecf0f1';
    document.getElementById('buttonSelectVertexA').style.background = '#ecf0f1';
    document.getElementById('buttonSelectVertexA').style.color = 'black';

    // isSelectStartPrim = false;
    // document.getElementById('buttonSelectPrim').style.background = '#ecf0f1';
    // document.getElementById('buttonSelectPrim').style.color = 'black';
    // document.getElementById('buttonSelectPrim').innerHTML = "Bắt đầu thuật toán Prim";
}

// THÊM CẠNH
function addEdge() {
    isAddVertexOn = false;
    // isRemoveVertexOn = false;
    document.getElementById('buttonAddVertex').style.background = '#ecf0f1';
    document.getElementById('buttonAddVertex').style.color = 'black';
    document.getElementById('buttonAddVertex').innerHTML = 'Thêm đỉnh';
    // document.getElementById('buttonRemoveVertex').style.background = '#ecf0f1';
    // document.getElementById('buttonRemoveVertex').style.color = 'black';
    // document.getElementById('buttonRemoveVertex').innerHTML = 'Xóa đỉnh';

    // isSelectStartPrim = false;
    // document.getElementById('buttonSelectPrim').style.background = '#ecf0f1';
    // document.getElementById('buttonSelectPrim').style.color = 'black';
    // document.getElementById('buttonSelectPrim').innerHTML = "Bắt đầu thuật toán Prim";
    
    isSelectFromVertexA = false;
    isSelectToVertexB = false;
    document.getElementById('buttonSelectFromVertexA').style.background = '#ecf0f1';
    document.getElementById('buttonSelectFromVertexA').style.color = 'black';
    document.getElementById('buttonSelectToVertexB').style.background = '#ecf0f1';
    document.getElementById('buttonSelectToVertexB').style.color = 'black';

    if (!selectedVertexA || !selectedVertexB)
        return;
    
    graph.addEdge(selectedVertexA, '#2c3e50','#ecf0f1', selectedVertexB, '#2c3e50','#ecf0f1', inputWeight.value(), 'black', 3);

    // let selectedVertex = null;
    selectedVertexA = null;
    selectedVertexB = null;
    isSelectVertexA = false;
    isSelectVertexB = false;
    document.getElementById('buttonSelectVertexA').style.background = '#ecf0f1';
    document.getElementById('buttonSelectVertexA').style.color = 'black';
    document.getElementById('buttonSelectVertexA').innerHTML = "Từ đỉnh";
    document.getElementById('buttonSelectVertexB').style.background = '#ecf0f1';
    document.getElementById('buttonSelectVertexB').style.color = 'black';
    document.getElementById('buttonSelectVertexB').innerHTML = "Đến đỉnh";
    document.getElementById('inputWeight').value = 0;

}

// XÓA ĐỒ THỊ
function removeGragh() {
    isAddVertexOn = false;
    // isRemoveVertexOn = false;
    document.getElementById('buttonAddVertex').style.background = '#ecf0f1';
    document.getElementById('buttonAddVertex').style.color = 'black';
    document.getElementById('buttonAddVertex').innerHTML = 'Thêm đỉnh';
    // document.getElementById('buttonRemoveVertex').style.background = '#ecf0f1';
    // document.getElementById('buttonRemoveVertex').style.color = 'black';
    // document.getElementById('buttonRemoveVertex').innerHTML = 'Xóa đỉnh';

    selectedVertexA = null;
    selectedVertexB = null;
    isSelectVertexA = false;
    isSelectVertexB = false;

    document.getElementById('buttonSelectVertexA').style.background = '#ecf0f1';
    document.getElementById('buttonSelectVertexA').style.color = 'black';
    document.getElementById('buttonSelectVertexA').innerHTML = "Từ đỉnh";

    document.getElementById('buttonSelectVertexB').style.background = '#ecf0f1';
    document.getElementById('buttonSelectVertexB').style.color = 'black';
    document.getElementById('buttonSelectVertexB').innerHTML = "Đến đỉnh";
    document.getElementById('inputWeight').value = 0;
    
    // isSelectStartPrim = false;
    // document.getElementById('buttonSelectPrim').style.background = '#ecf0f1';
    // document.getElementById('buttonSelectPrim').style.color = 'black';
    // document.getElementById('buttonSelectPrim').innerHTML = "Bắt đầu thuật toán Prim";

    graph.remove();
    loop();
}

// RESET MÀU ĐỒ THỊ
function refeshGraph() {
    graph.refesh();
}

// CHỌN ĐỈNH VÀ BẮT ĐẦU THUẬT TOÁN PRIM
function selectStartPrim() {
    isFloydStarted = false;
    isFloydRunning = false;
    document.getElementById('buttonStartFloyd').style.background = '#ecf0f1';
    document.getElementById('buttonStartFloyd').style.color = 'black';
    document.getElementById('buttonStartFloyd').innerHTML = "Bắt đầu thuật toán Floyd";
    
    isSelectStartPrim = true;
    document.getElementById('buttonSelectPrim').style.background = '#2c3e50';
    document.getElementById('buttonSelectPrim').style.color = '#ecf0f1';
    document.getElementById('buttonSelectPrim').innerHTML = "Hãy chọn đỉnh để bắt đầu";

    isAddVertexOn = false;
    // isRemoveVertexOn = false;
    document.getElementById('buttonAddVertex').style.background = '#ecf0f1';
    document.getElementById('buttonAddVertex').style.color = 'black';
    document.getElementById('buttonAddVertex').innerHTML = 'Thêm đỉnh';
    // document.getElementById('buttonRemoveVertex').style.background = '#ecf0f1';
    // document.getElementById('buttonRemoveVertex').style.color = 'black';
    // document.getElementById('buttonRemoveVertex').innerHTML = 'Xóa đỉnh';

    selectedVertexA = null;
    selectedVertexB = null;
    isSelectVertexA = false;
    isSelectVertexB = false;
    document.getElementById('buttonSelectVertexA').style.background = '#ecf0f1';
    document.getElementById('buttonSelectVertexA').style.color = 'black';
    document.getElementById('buttonSelectVertexA').innerHTML = "Từ đỉnh";
    document.getElementById('buttonSelectVertexB').style.background = '#ecf0f1';
    document.getElementById('buttonSelectVertexB').style.color = 'black';
    document.getElementById('buttonSelectVertexB').innerHTML = "Đến đỉnh";
    document.getElementById('inputWeight').value = 0;

    console.log("Prim OK");
}

async function prim() {
    if (!isSelectStartPrim)
        return;
    // refeshGraph();
    // loop(); 

    for (let v of graph.Vertices) {
        if (v.edges.length == 0) {
            document.getElementById('alert').style.left = '0';
            // loop();
            document.getElementById('alert-content').innerHTML = 'ĐỒ THỊ KHÔNG LIÊN THÔNG!!!';
            await delay(3000);
            document.getElementById('alert').style.left = '-520px';
            isSelectStartPrim = false;
            isPrimStarted = false;
            return;
        }
    }
    // loop();

    var T = [];
    var vertex = selectedVertex;
    vertex.visited = 1; 
    while (T.length < graph.Vertices.length) {
        var minEdge = null;
        var min = -1;
        for (let v of graph.Vertices) {
            if (v.visited === 1) { 
                for (let vv of graph.Vertices) {
                    if (vv.visited === -1) { 
                        var temEdgeWeight = v.findEdgeWeight(vv.id); 
                        if (temEdgeWeight != null) {
                            graph.addEdge(v, v.background, v.color, vv, '#f1c40f', 'black', temEdgeWeight, '#f1c40f', 3);
                            if (min == -1 || parseInt(temEdgeWeight) < min) { 
                                min = parseInt(temEdgeWeight); 
                                minEdge = new Edge(v, vv, temEdgeWeight, 'black', 3);  
                            }
                        }
                    }
                }
            }
        } 
        loop();
        await delay(parseInt(inputSpeed.value()));
        if (minEdge != null) {
            graph.addEdge(minEdge.vertexA, minEdge.vertexA.background, minEdge.vertexA.color, minEdge.vertexB, minEdge.vertexB.background, minEdge.vertexB.color, min, '#16a085', 3);
            loop();
            await delay(parseInt(inputSpeed.value()));
        }

        if (minEdge != null) {  
            minEdge.vertexB.visited = 1;
            graph.addEdge(minEdge.vertexA, '#e74c3c', 'black', minEdge.vertexB, '#e74c3c', 'black', min, '#e74c3c', 5);
            T.push(minEdge); 
        } 
        else {
            break;
        }

    }    

    document.getElementById('content-header').innerHTML = "Danh sách cạnh thuật toán Prim";
    var result = "";
    var sum = 0;
    for (let t of T) {
        sum += parseInt(t.weight);
        result += `
            <li>Từ ${t.vertexA.name} đến ${t.vertexB.name} : ${t.weight}</li>
        `;  
    }
    result += `<span class="sum-weight">Tổng giá trị của cây khung: ${sum}</span>`;
    document.getElementById('content-list').innerHTML = result; 

    isSelectStartPrim = false;
    isPrimStarted = false;
    for (let v of graph.Vertices) {
        v.visited = -1;
    }
    // loop();
}

// KRUSKAL
function selectStartKruskal() {
    if (isKruskalRunning == true)
        return;

    isFloydStarted = false;
    isFloydRunning = false;
    document.getElementById('buttonStartFloyd').style.background = '#ecf0f1';
    document.getElementById('buttonStartFloyd').style.color = 'black';
    document.getElementById('buttonStartFloyd').innerHTML = "Bắt đầu thuật toán Floyd";

    isAddVertexOn = false;
    // isRemoveVertexOn = false;
    document.getElementById('buttonAddVertex').style.background = '#ecf0f1';
    document.getElementById('buttonAddVertex').style.color = 'black';
    document.getElementById('buttonAddVertex').innerHTML = 'Thêm đỉnh';
    // document.getElementById('buttonRemoveVertex').style.background = '#ecf0f1';
    // document.getElementById('buttonRemoveVertex').style.color = 'black';
    // document.getElementById('buttonRemoveVertex').innerHTML = 'Xóa đỉnh';

    selectedVertexA = null;
    selectedVertexB = null;
    isSelectVertexA = false;
    isSelectVertexB = false;
    document.getElementById('buttonSelectVertexA').style.background = '#ecf0f1';
    document.getElementById('buttonSelectVertexA').style.color = 'black';
    document.getElementById('buttonSelectVertexA').innerHTML = "Từ đỉnh";
    document.getElementById('buttonSelectVertexB').style.background = '#ecf0f1';
    document.getElementById('buttonSelectVertexB').style.color = 'black';
    document.getElementById('buttonSelectVertexB').innerHTML = "Đến đỉnh";
    document.getElementById('inputWeight').value = 0;

    if (graph.Vertices.length == 0) 
        return;

    // if (isKruskalRunning == true) {
    //     isKruskalRunning = false;
    //     document.getElementById('buttonStartKruskal').style.background = '#ecf0f1';
    //     document.getElementById('buttonStartKruskal').style.color = 'black';
    //     document.getElementById('buttonStartKruskal').innerHTML = "Bắt đầu thuật toán Kruskal";
        
    //     return;
    // }
    isKruskalRunning = true;
    document.getElementById('buttonStartKruskal').style.background = '#2c3e50';
    document.getElementById('buttonStartKruskal').style.color = '#ecf0f1';
    document.getElementById('buttonStartKruskal').innerHTML = "Đang chạy thuật toán Kruskal";

    Kruskal();
}

async function Kruskal() {
    refeshGraph();
    loop();

    for (let v of graph.Vertices) {
        if (v.edges.length == 0) {
            document.getElementById('alert').style.left = '0';
            // loop();
            document.getElementById('alert-content').innerHTML = 'ĐỒ THỊ KHÔNG LIÊN THÔNG!!!';
            isKruskalRunning = false;
            document.getElementById('buttonStartKruskal').style.background = '#ecf0f1';
            document.getElementById('buttonStartKruskal').style.color = 'black';
            document.getElementById('buttonStartKruskal').innerHTML = "Bắt đầu thuật toán Kruskal";
            await delay(3000);
            document.getElementById('alert').style.left = '-520px';
            return;
        }
    }

    document.getElementsByClassName('maxtrix')[0].style.display = "block";

    // TẠO MẢNG CHỨA DANH SÁCH CẠNH CỦA ĐỒ THỊ
    var sResult = "<span>Danh sách cạnh của đồ thị</span><br>";
    let edges = new Array();
    for (let V of graph.Vertices) {
        for (let E of V.edges) {
            let s = edges.filter((e) => e.vertexA.id == E.vertexB.id && e.vertexB.id == E.vertexA.id);
            graph.addEdge(E.vertexA, '#f1c40f', 'black', E.vertexB, '#f1c40f', 'black', E.weight, '#f1c40f', 3);            
            if (s.length == 0) {
                edges.push(E);
                sResult += `<span>${E.vertexA.name}${E.vertexB.name}</span>`;
            }
            loop();
            document.getElementsByClassName('maxtrix')[0].innerHTML = sResult;
            await delay(inputSpeed.value());
        }
    }
    var countEdge = edges.length;

    refeshGraph();
    loop();

    // SẮP XẾP MẢNG GIẢM DẦN NẾU CHỌN CÂY KHUNG NHỎ NHẤT
    if (isMST) {
        edges.sort(function (a, b) {
            return +b.weight - +a.weight;
        });
    }
    // SẮP XẾP TĂNG DẦN NẾU CHỌN CÂY KHUNG LỚN NHẤT
    else {
        edges.sort(function (a, b) {
            return +a.weight - +b.weight;
        });
    }
    for (let i = 0 ; i < edges.length ; i++) {
        sResult = "<span>Danh sách cạnh của đồ thị</span><br>";
        for (let j = 0 ; j < i ; j++) {
            sResult += `<span>${edges[j].vertexA.name}${edges[j].vertexB.name}</span>`;
            document.getElementsByClassName('maxtrix')[0].innerHTML = sResult;
            graph.addEdge(edges[j].vertexA, '#f1c40f', 'black', edges[j].vertexB, '#f1c40f', 'black', edges[j].weight, '#f1c40f', 3); 
        } 
        sResult += `<span class="span-choose">${edges[i].vertexA.name}${edges[i].vertexB.name}</span>`; 
        document.getElementsByClassName('maxtrix')[0].innerHTML = sResult;
        graph.addEdge(edges[i].vertexA, '#f1c40f', 'black', edges[i].vertexB, '#f1c40f', 'black', edges[i].weight, '#f1c40f', 3); 
        loop();
        await delay(inputSpeed.value());
    }
    
    refeshGraph();
    loop();

    // lẦN LƯỢT LẤY TỪNG CẠNH CUỐI TRONG DANH SÁCH CẠNH ĐÃ SẮP XẾP 
    // NẾU CÂY KHUNG NHỎ NHẤT THÌ CẠNH NHỎ NHẤT
    // NGƯỢC LẠI THÌ CẠNH LỚN NHẤT
    // NẾU CẠNH CHỌN KHÔNG TẠO CHU TRÌNH THÌ THÊM VÀO DANH SÁCH CẠNH
    let listEdges = [];
    while (edges.length > 0) {
        sResult = "<span>Danh sách cạnh của đồ thị</span><br>";
        for (let i = 0 ; i < edges.length ; i++) { 
            if (i == edges.length - 1)
                sResult += `<span class="span-choose">${edges[i].vertexA.name}${edges[i].vertexB.name}</span>`; 
            else
                sResult += `<span>${edges[i].vertexA.name}${edges[i].vertexB.name}</span>`; 
        }
        sResult += "<br><span>Danh sách cạnh của cây khung</span><br>";
        for (let lE of listEdges) {
            sResult += `<span>${lE.vertexA.name}${lE.vertexB.name}</span>`; 
        } 
        document.getElementsByClassName('maxtrix')[0].innerHTML = sResult;

        const edge = edges.pop();
        graph.addEdge(edge.vertexA, '#f1c40f', 'black', edge.vertexB, '#f1c40f', 'black', edge.weight, '#f1c40f', 3);
        loop();
        await delay(inputSpeed.value());

        const checkedEdge = await isNoCycle(edge, listEdges);
        if (checkedEdge == true) {
            listEdges.push(edge);

            // for (let lE of listEdges) {
            //     sResult += `<span>${lE.weight}</span>`; 
            // }
            // document.getElementsByClassName('maxtrix')[0].innerHTML = sResult;

            graph.addEdge(edge.vertexA, '#e74c3c', 'black', edge.vertexB, '#e74c3c', 'black', edge.weight, '#e74c3c', 5);
            loop();
            await delay(inputSpeed.value());
        }
        else {
            // for (let lE of listEdges) {
            //     sResult += `<span>${lE.weight}</span>`; 
            // }
            // document.getElementsByClassName('maxtrix')[0].innerHTML = sResult;

            graph.addEdge(edge.vertexA, '#e74c3c', 'black', edge.vertexB, '#e74c3c', 'black', edge.weight, 'black', 3);
            loop();
            await delay(inputSpeed.value());
        }
    }  

    sResult = "<span>Danh sách cạnh</span><br>";
    for (let i = 0 ; i < edges.length ; i++) { 
        if (i == edges.length - 1)
            sResult += `<span class="span-choose">${edges[i].vertexA.name}${edges[i].vertexB.name}</span>`; 
        else
            sResult += `<span>${edges[i].vertexA.name}${edges[i].vertexB.name}</span>`; 
    }
    sResult += "<br><span>Danh sách cạnh của cây khung</span><br>";
    for (let lE of listEdges) {
        sResult += `<span>${lE.vertexA.name}${lE.vertexB.name}</span>`; 
    } 
    document.getElementsByClassName('maxtrix')[0].innerHTML = sResult; 

    if (isMST)
        document.getElementById('content-header').innerHTML = "Kruskal - Cây khung nhỏ nhất";
    else
        document.getElementById('content-header').innerHTML = "Kruskal - Cây khung lớn nhất";


    for (let i = 0 ; i < graph.Vertices.length ; i++) {
        maxtrix[i] = new Array();   
        for (let j = 0 ; j < graph.Vertices.length ; j++) {
            maxtrix[i][j] = 0;
        }
    }
 
    for (let v of graph.Vertices) {
        for (let e of v.edges) {
            if (e.weight != 0) 
                maxtrix[parseInt(v.id)][parseInt(e.vertexB.id)] = parseInt(e.weight);  
        }
    }
    var result = "";
    result += `<li>_Số đỉnh của đồ thị: ${graph.Vertices.length}<li>`;
    result += `<li>_Số cạnh của đồ thị: ${countEdge}<li>`;
    result += "<li>_Ma trận kề</li>";
    for (let i = 0 ; i < maxtrix.length ; i++) {
        result += `<li>&nbsp&nbsp&nbsp`;
        for (let j = 0 ; j < maxtrix.length ; j++) { 
            result += `${maxtrix[i][j]}\t\t\t\t`;
        }
        result += `</li>`;
    }
    if (isDirected)
        result += "<br><li>_Đồ thị có hướng</li>";
    else
        result += "<br><li>_Đồ thị vô hướng</li>";
    result += "<br><li>_Danh sách cạnh của cây khung<li>"; 
    var sum = 0;
    for (let e of listEdges) {
        sum += parseInt(e.weight);
        result += `
            <li>&nbsp&nbsp&nbspCạnh ${e.vertexA.name}${e.vertexB.name} : ${e.weight}</li>
        `;  
    }
    result += `<span class="sum-weight">_Tổng giá trị của cây khung: ${sum}</span>`;
    document.getElementById('content-list').innerHTML = result; 

    isKruskalRunning = false;
    document.getElementById('buttonStartKruskal').style.background = '#ecf0f1';
    document.getElementById('buttonStartKruskal').style.color = 'black';
    document.getElementById('buttonStartKruskal').innerHTML = "Bắt đầu thuật toán Kruskal";

    document.getElementById('floyd').style.left = '0';
    document.getElementById('floyd-content').innerHTML = 'CÀI ĐẶT THUẬT TOÁN KRUSKAL THÀNH CÔNG!';
    document.getElementById('floyd').style.width = 'auto';

    // document.getElementsByClassName('maxtrix')[0].style.display = "none";
    
    await delay(3000);
    document.getElementById('floyd').style.left = '-590px';
    

    for (let v of graph.Vertices) {
        for (let e of v.edges) {
            e.vertexA.mstId = 0;
            e.vertexB.mstId = 0;
        }
    }
    Vertex.nextId = 1;
}

// KIỂM TRA CHU TRÌNH
async function isNoCycle(edge, listEdges) {
    if (edge.vertexA.mstId == 0 || edge.vertexB.mstId == 0) {
        if (edge.vertexA.mstId != 0) {
            edge.vertexB.mstId = edge.vertexA.mstId;
            return true;
        }
        if (edge.vertexB.mstId != 0) {
            edge.vertexA.mstId = edge.vertexB.mstId;
            return true;
        }
        edge.vertexA.mstId = Vertex.nextId;
        edge.vertexB.mstId = Vertex.nextId;
        Vertex.nextId++;
        return true;
    }
    if (edge.vertexA.mstId === edge.vertexB.mstId)
        return false;

    let mstId = edge.vertexB.mstId;
    listEdges.forEach((e) => {
        if (e.vertexA.mstId == mstId) {
            e.vertexA.mstId = edge.vertexA.mstId;
        }
        if (e.vertexB.mstId == mstId) {
            e.vertexB.mstId = edge.vertexA.mstId;
        }
    });
    return true;
}

// KIỂM TRA HƯỚNG ĐỒ THỊ
function isDirectedGraph(maxtrix) {
    for (let i = 0 ; i < maxtrix.length ; i++) {
        for (let j = 0 ; j < maxtrix.length ; j++) {
            if (maxtrix[i][j] != maxtrix[j][i])
                return true;
        }
    }
    return false;
}

// SỐ CẠNH CỦA ĐỒ THỊ
function countEdges(maxtrix) {
    let edges = new Array();
    for (let V of graph.Vertices) {
        for (let E of V.edges) {
            let s = edges.filter((e) => e.vertexA.id == E.vertexB.id && e.vertexB.id == E.vertexA.id);            
            if (s.length == 0) {
                edges.push(E); 
            } 
        }
    }
    return edges.length;
}

// CHỌN CÂY KHUNG NHỎ NHẤT HOẶC LỚN NHẤT
function setMin() {
    isMST = true;
    document.getElementById('buttonMin').style.background = '#2c3e50';
    document.getElementById('buttonMin').style.color = '#ecf0f1';

    document.getElementById('buttonMax').style.background = '#ecf0f1';
    document.getElementById('buttonMax').style.color = 'black';

    if (isKruskalRunning)
        Kruskal();
}

function setMax() {
    isMST = false;
    document.getElementById('buttonMax').style.background = '#2c3e50';
    document.getElementById('buttonMax').style.color = '#ecf0f1';
    
    document.getElementById('buttonMin').style.background = '#ecf0f1';
    document.getElementById('buttonMin').style.color = 'black';
    
    if (isKruskalRunning)
        Kruskal();
}

// BẮT ĐẦU THUẬT TOÁN FLOYD
async function startFloyd() {
    isAddVertexOn = false;
    // isRemoveVertexOn = false;
    document.getElementById('buttonAddVertex').style.background = '#ecf0f1';
    document.getElementById('buttonAddVertex').style.color = 'black';
    document.getElementById('buttonAddVertex').innerHTML = 'Thêm đỉnh';
    // document.getElementById('buttonRemoveVertex').style.background = '#ecf0f1';
    // document.getElementById('buttonRemoveVertex').style.color = 'black';
    // document.getElementById('buttonRemoveVertex').innerHTML = 'Xóa đỉnh';

    // isSelectStartPrim = false;
    // document.getElementById('buttonSelectPrim').style.background = '#ecf0f1';
    // document.getElementById('buttonSelectPrim').style.color = 'black';
    // document.getElementById('buttonSelectPrim').innerHTML = "Bắt đầu thuật toán Prim";

    isKruskalRunning = false;
    document.getElementById('buttonStartKruskal').style.background = '#ecf0f1';
    document.getElementById('buttonStartKruskal').style.color = 'black';
    document.getElementById('buttonStartKruskal').innerHTML = "Bắt đầu thuật toán Kruskal";

    if (isFloydRunning === true) {
        isFloydStarted = false;
        isFloydRunning = false;
        document.getElementById('buttonStartFloyd').style.background = '#ecf0f1';
        document.getElementById('buttonStartFloyd').style.color = 'black';
        document.getElementById('buttonStartFloyd').innerHTML = "Bắt đầu thuật toán Floyd";

        isAddVertexOn = false;
        // isRemoveVertexOn = false;
        document.getElementById('buttonAddVertex').style.background = '#ecf0f1';
        document.getElementById('buttonAddVertex').style.color = 'black';
        document.getElementById('buttonAddVertex').innerHTML = 'Thêm đỉnh';
        // document.getElementById('buttonRemoveVertex').style.background = '#ecf0f1';
        // document.getElementById('buttonRemoveVertex').style.color = 'black';
        // document.getElementById('buttonRemoveVertex').innerHTML = 'Xóa đỉnh';

        // isSelectStartPrim = false;
        // document.getElementById('buttonSelectPrim').style.background = '#ecf0f1';
        // document.getElementById('buttonSelectPrim').style.color = 'black';
        // document.getElementById('buttonSelectPrim').innerHTML = "Bắt đầu thuật toán Prim";
        
        isSelectFromVertexA = false;
        isSelectToVertexB = false;
        document.getElementById('buttonSelectFromVertexA').style.background = '#ecf0f1';
        document.getElementById('buttonSelectFromVertexA').style.color = 'black';
        document.getElementById('buttonSelectToVertexB').style.background = '#ecf0f1';
        document.getElementById('buttonSelectToVertexB').style.color = 'black';

    // let selectedVertex = null;
        selectedVertexA = null;
        selectedVertexB = null;
        isSelectVertexA = false;
        isSelectVertexB = false;
        document.getElementById('buttonSelectVertexA').style.background = '#ecf0f1';
        document.getElementById('buttonSelectVertexA').style.color = 'black';
        document.getElementById('buttonSelectVertexA').innerHTML = "Từ đỉnh";
        document.getElementById('buttonSelectVertexB').style.background = '#ecf0f1';
        document.getElementById('buttonSelectVertexB').style.color = 'black';
        document.getElementById('buttonSelectVertexB').innerHTML = "Đến đỉnh";
        document.getElementById('inputWeight').value = 0;

        isSelectFromVertexA = false;
        isSelectToVertexB = false;
        document.getElementById('buttonSelectFromVertexA').style.background = '#ecf0f1';
        document.getElementById('buttonSelectFromVertexA').style.color = 'black';
        document.getElementById('buttonSelectFromVertexA').innerHTML = "Từ đỉnh";
        document.getElementById('buttonSelectToVertexB').style.background = '#ecf0f1';
        document.getElementById('buttonSelectToVertexB').style.color = 'black';
        document.getElementById('buttonSelectToVertexB').innerHTML = "Đến đỉnh";

        document.getElementsByClassName('maxtrix')[0].style.display = "none";

        return;
    }
    else if (isDirected == false) {
        document.getElementById('alert').style.left = '0';
        document.getElementById('alert-content').innerHTML = 'Vui lòng chọn đồ thị có hướng!';
        await delay(3000);
        document.getElementById('alert').style.left = '-520px';
        return;
    }
    else {
        isFloydRunning = true;
        document.getElementById('buttonStartFloyd').style.background = '#2c3e50';
        document.getElementById('buttonStartFloyd').style.color = '#ecf0f1';
        document.getElementById('buttonStartFloyd').innerHTML = "Kết thúc thuật toán Floyd";
    } 

    const n = graph.Vertices.length;
    
    for (let i = 0 ; i < n ; i++) {
        L[i] = new Array();
        Previous[i] = new Array();
        for (let j = 0 ; j < n ; j++) {
            if (i == j) {
                L[i][j] = 0;
            }
            else {
                L[i][j] = INF;
            }
            Previous[i][j] = parseInt(i);
        }
    }

    for (let v of graph.Vertices) {
        for (let e of v.edges) {
            if (e.weight != 0) {
                L[parseInt(v.id)][parseInt(e.vertexB.id)] = parseInt(e.weight); 
            }
        }
    }
      
    
    document.getElementsByClassName('maxtrix')[0].style.display = "block";

    for (let k = 0 ; k < n ; k++) {
        for (let i = 0 ; i < n ; i++) {
            for (let j = 0 ; j < n ; j++) {
                if (i == j) {
                    var sResult = "<span>k: </span>";
                    for (let l = 0; l < n; l++) {
                        if (l == k)
                            sResult += `<span class="span-choose">${l + 1}\t</span>`;
                        else
                            sResult += `<span>${l + 1}\t</span>`;
                    }
                    sResult += "<br><span>i : </span>";
                    for (let l = 0; l < n; l++) {
                        if (l == i)
                            sResult += `<span class="span-choose">${l + 1}\t</span>`;
                        else
                            sResult += `<span>${l + 1}\t</span>`;
                    }
                    sResult += "<br><span>j : </span>";
                    for (let l = 0; l < n; l++) {
                        if (l == j)
                            sResult += `<span class="span-choose">${l + 1}\t</span>`;
                        else
                            sResult += `<span>${l + 1}\t</span>`;
                    }

                    sResult += "<br><br><span> Danh sách L:<span>";
                    sResult += "<table class=''table-maxtrix'' style=''width:100%''>";
                    for (let a = 0; a < n; a++) {
                        sResult += "<tr>";
                        for (let b = 0; b < n; b++) {
                            if (a == i && b == j) {
                                if (L[i][j] == INF)
                                    sResult += `<td><span class="span-choose">INF</span></td>`;
                                else
                                    sResult += `<td><span class="span-choose">${L[a][b]}</span></td>`;
                            }
                            else {
                                if (L[a][b] == INF)
                                    sResult += `<td><span>INF</span></td>`;
                                else
                                    sResult += `<td><span>${L[a][b]}</span></td>`;
                            }
                        }
                        sResult += "</tr>";
                    }
                    sResult += "</table>";

                    sResult += "<br><span> Danh sách Previous:<span>";
                    sResult += "<table class=''table-maxtrix'' style=''width:100%''>";
                    for (let a = 0; a < n; a++) {
                        sResult += "<tr>";
                        for (let b = 0; b < n; b++) {
                            if (a == i && b == j) {
                                sResult += `<td><span class="span-choose">${Previous[a][b] + 1}</span></td>`;
                            }
                            else {
                                sResult += `<td><span>${Previous[a][b] + 1}</span></td>`;
                            }
                        }
                        sResult += "</tr>";
                    }
                    sResult += "</table>";
                    document.getElementsByClassName('maxtrix')[0].innerHTML = sResult;
                    await delay(parseInt(inputSpeed.value()));
                    continue;
                }
                if (L[i][j] > L[i][k] + L[k][j] && L[i][k] != INF && L[k][j] != INF) {
                    L[i][j] = L[i][k] + L[k][j];
                    Previous[i][j] = Previous[k][j];
                }
                var sResult = "<span>k: </span>";
                for (let l = 0; l < n; l++) {
                    if (l == k)
                        sResult += `<span class="span-choose">${l + 1}\t</span>`;
                    else
                        sResult += `<span>${l + 1}\t</span>`;
                }
                sResult += "<br><span>i : </span>";
                for (let l = 0; l < n; l++) {
                    if (l == i)
                        sResult += `<span class="span-choose">${l + 1}\t</span>`;
                    else
                        sResult += `<span>${l + 1}\t</span>`;
                }
                sResult += "<br><span>j : </span>";
                for (let l = 0; l < n; l++) {
                    if (l == j)
                        sResult += `<span class="span-choose">${l + 1}\t</span>`;
                    else
                        sResult += `<span>${l + 1}\t</span>`;
                }
                sResult += "<br><br><span> Danh sách L:<span>";
                sResult += "<table class=''table-maxtrix'' style=''width:100%''>";
                for (let a = 0; a < n; a++) {
                    sResult += "<tr>";
                    for (let b = 0; b < n; b++) {
                        if (a == i && b == j) {
                            if (L[i][j] == INF)
                                sResult += `<td><span class="span-choose">INF</span></td>`;
                            else
                                sResult += `<td><span class="span-choose">${L[a][b]}</span></td>`;
                        }
                        else {
                            if (L[a][b] == INF)
                                sResult += `<td><span>INF</span></td>`;
                            else
                                sResult += `<td><span>${L[a][b]}</span></td>`;
                        }
                    }
                    sResult += "</tr>";
                }
                sResult += "</table>";
                
                sResult += "<br><span> Danh sách Previous:</span>"; 
                sResult += "<table class=''table-maxtrix'' style=''width:100%''>";
                for (let a = 0; a < n; a++) {
                    sResult += "<tr>";
                    for (let b = 0; b < n; b++) {
                        if (a == i && b == j) {
                            sResult += `<td><span class="span-choose">${Previous[a][b] + 1}</span></td>`;
                        }
                        else {
                            sResult += `<td><span>${Previous[a][b] + 1}</span></td>`;
                        }
                    }
                    sResult += "</tr>";
                }
                sResult += "</table>";
                document.getElementsByClassName('maxtrix')[0].innerHTML = sResult;
                await delay(parseInt(inputSpeed.value()));
            }
        }
    }

    for (let i = 0 ; i < graph.Vertices.length ; i++) {
        maxtrix[i] = new Array();   
        for (let j = 0 ; j < graph.Vertices.length ; j++) {
            maxtrix[i][j] = 0;
        }
    } 
    for (let v of graph.Vertices) {
        for (let e of v.edges) {
            if (e.weight != 0) 
                maxtrix[parseInt(v.id)][parseInt(e.vertexB.id)] = parseInt(e.weight);  
        }
    }
    var result = "";
    document.getElementById('content-header').innerHTML = "Floyd - Đường đi ngắn nhất";
    result += `<li>_Số đỉnh của đồ thị: ${graph.Vertices.length}<li>`;
    result += `<li>_Số cạnh của đồ thị: ${countEdges(maxtrix)}<li>`;
    result += "<li>_Ma trận kề</li>"; 
    for (let i = 0 ; i < maxtrix.length ; i++) {
        result += `<li>&nbsp&nbsp&nbsp`;
        for (let j = 0 ; j < maxtrix.length ; j++) { 
            result += `${maxtrix[i][j]}\t\t\t\t`;
        }
        result += `</li>`;
    }
    if (isDirected)
        result += "<br><li>_Đồ thị có hướng</li>";
    else
        result += "<br><li>_Đồ thị vô hướng</li>";
    result += "<br><li>_Danh sách L\t\t\t\t</li>";
    for (let i = 0 ; i < graph.Vertices.length ; i++) {
        result += `<li>&nbsp&nbsp&nbsp`;
        for (let j = 0 ; j < graph.Vertices.length ; j++) {
            if (L[i][j] == INF) 
                result += `INF\t\t\t\t`;
            else
                result += `${L[i][j]}\t\t\t\t`;
        }
        result += `</li>`;
    }
    result += "<br><li>_Danh sách Previous\t\t\t\t</li>";
    for (let i = 0 ; i < graph.Vertices.length ; i++) {
        result += `<li>&nbsp&nbsp&nbsp`;
        for (let j = 0 ; j < graph.Vertices.length ; j++) { 
            result += `${Previous[i][j] + 1}\t\t\t\t`;
        }
        result += `</li>`;
    }
    document.getElementById('content-list').innerHTML = result;
    
    isFloydStarted = true;
    // isFloydRunning = false;
    document.getElementById('floyd').style.left = '0';
    document.getElementById('floyd-content').innerHTML = 'CÀI ĐẶT THUẬT TOÁN FLOYD THÀNH CÔNG';
    // loop();
    await delay(3000);
    document.getElementById('floyd').style.left = '-560px';

}

// CHỌN ĐỈNH A ĐỂ TÌM ĐƯỜNG
function selectFromVertexA() {
    isAddVertexOn = false;
    // isRemoveVertexOn = false;
    document.getElementById('buttonAddVertex').style.background = '#ecf0f1';
    document.getElementById('buttonAddVertex').style.color = 'black';
    document.getElementById('buttonAddVertex').innerHTML = 'Thêm đỉnh';
    // document.getElementById('buttonRemoveVertex').style.background = '#ecf0f1';
    // document.getElementById('buttonRemoveVertex').style.color = 'black';
    // document.getElementById('buttonRemoveVertex').innerHTML = 'Xóa đỉnh';

    isSelectVertexA = false;
    isSelectVertexB = false;
    document.getElementById('buttonSelectVertexA').style.background = '#ecf0f1';
    document.getElementById('buttonSelectVertexA').style.color = 'black';
    document.getElementById('buttonSelectVertexB').style.background = '#ecf0f1';
    document.getElementById('buttonSelectVertexB').style.color = 'black';
    
    // isSelectStartPrim = false;
    // document.getElementById('buttonSelectPrim').style.background = '#ecf0f1';
    // document.getElementById('buttonSelectPrim').style.color = 'black';
    // document.getElementById('buttonSelectPrim').innerHTML = "Bắt đầu thuật toán Prim";

    isSelectFromVertexA = true;
    isSelectToVertexB = false;
    document.getElementById('buttonSelectFromVertexA').style.background = '#2c3e50';
    document.getElementById('buttonSelectFromVertexA').style.color = '#ecf0f1';
    document.getElementById('buttonSelectToVertexB').style.background = '#ecf0f1';
    document.getElementById('buttonSelectToVertexB').style.color = 'black';
}

// CHỌN ĐỈNH B ĐỂ KẾT THÚC TÌM ĐƯỜNG
function selectToVertexB() {
    isAddVertexOn = false;
    // isRemoveVertexOn = false;
    document.getElementById('buttonAddVertex').style.background = '#ecf0f1';
    document.getElementById('buttonAddVertex').style.color = 'black';
    document.getElementById('buttonAddVertex').innerHTML = 'Thêm đỉnh';
    // document.getElementById('buttonRemoveVertex').style.background = '#ecf0f1';
    // document.getElementById('buttonRemoveVertex').style.color = 'black';
    // document.getElementById('buttonRemoveVertex').innerHTML = 'Xóa đỉnh';

    isSelectVertexA = false;
    isSelectVertexB = false;
    document.getElementById('buttonSelectVertexA').style.background = '#ecf0f1';
    document.getElementById('buttonSelectVertexA').style.color = 'black';
    document.getElementById('buttonSelectVertexB').style.background = '#ecf0f1';
    document.getElementById('buttonSelectVertexB').style.color = 'black';
    
    // isSelectStartPrim = false;
    // document.getElementById('buttonSelectPrim').style.background = '#ecf0f1';
    // document.getElementById('buttonSelectPrim').style.color = 'black';
    // document.getElementById('buttonSelectPrim').innerHTML = "Bắt đầu thuật toán Prim";

    isSelectFromVertexA = false;
    isSelectToVertexB = true;
    document.getElementById('buttonSelectToVertexB').style.background = '#2c3e50';
    document.getElementById('buttonSelectToVertexB').style.color = '#ecf0f1';
    document.getElementById('buttonSelectFromVertexA').style.background = '#ecf0f1';
    document.getElementById('buttonSelectFromVertexA').style.color = 'black';
}

// TÌM ĐƯỜNG ĐI NGẮN NHẤT TỪ ĐỈNH A ĐẾN ĐỈNH B
async function findFloyd() { 
    var Path = new Array();
    if (selectedVertexA != null && selectedVertexB != null) {
        if (L[parseInt(selectedVertexA.id)][parseInt(selectedVertexB.id)] != INF) {
            var s = parseInt(selectedVertexA.id);
            var f = parseInt(selectedVertexB.id);
            while (s != f) {
                var vS = graph.findVertexByID(s);
                var vF = graph.findVertexByID(f);
                vS.default();
                vF.default();
                Path.push(f + 1);
                f = Previous[s][f]; 
                vS.background = '#2c3e50';
                vS.color = '#ecf0f1';
                vF.background = '#f1c40f';
                vF.color = 'black';
                loop();
                await delay(parseInt(inputSpeed.value()));
            }
            Path.push(s + 1);
        }

    } 

    var result = "";
    document.getElementById('content-header').innerHTML = "Floyd - Đường đi ngắn nhất";
    result += `<li>_Số đỉnh của đồ thị: ${graph.Vertices.length}<li>`;
    result += `<li>_Số cạnh của đồ thị: ${countEdges(maxtrix)}<li>`;
    result += "<li>_Ma trận kề</li>"; 
    for (let i = 0 ; i < maxtrix.length ; i++) {
        result += `<li>&nbsp&nbsp&nbsp`;
        for (let j = 0 ; j < maxtrix.length ; j++) { 
            result += `${maxtrix[i][j]}\t\t\t\t`;
        }
        result += `</li>`;
    }
    if (isDirected)
        result += "<br><li>_Đồ thị có hướng</li>";
    else
        result += "<br><li>_Đồ thị vô hướng</li>";
    result += "<br><li>_Danh sách L\t\t\t\t</li>";
    for (let i = 0 ; i < graph.Vertices.length ; i++) {
        result += `<li>&nbsp&nbsp&nbsp`;
        for (let j = 0 ; j < graph.Vertices.length ; j++) {
            if (L[i][j] == INF) 
                result += `INF\t\t\t\t`;
            else
                result += `${L[i][j]}\t\t\t\t`;
        }
        result += `</li>`;
    }
    result += "<br><li>_Danh sách Previous\t\t\t\t</li>";
    for (let i = 0 ; i < graph.Vertices.length ; i++) {
        result += `<li>&nbsp&nbsp&nbsp`;
        for (let j = 0 ; j < graph.Vertices.length ; j++) { 
            result += `${Previous[i][j] + 1}\t\t\t\t`;
        }
        result += `</li>`;
    }

    if (selectedVertexA != null && selectedVertexB != null) {
        if (Path.length == 0) {
            result += `<span class="sum-weight">Không có đường đi từ đỉnh ${selectedVertexA.name} đến đỉnh ${selectedVertexB.name}</span>`;
        }
        else {
            for (let i = Path.length - 1 ; i > 0 ; i--) {
                var vS = graph.findVertexByID(Path[i] - 1);
                var vF = graph.findVertexByID(Path[i - 1] - 1); 
                var min = vS.findEdgeWeight(vF.id);
                graph.addEdge(vS, '#e74c3c', 'black', vF, '#e74c3c', 'black', min, '#e74c3c', 5);
                loop();
                await delay(parseInt(inputSpeed.value())); 
            }
            result += `<span class="sum-weight">Đường đi ngắn nhất từ đỉnh ${selectedVertexA.name} đến đỉnh ${selectedVertexB.name}: `;
            for (let i = Path.length - 1; i >= 0 ; i--) {
                result += `${Path[i]}`;
                if (i > 0)
                    result += ` --> `;
            }
            result += `</span>`;
            result += `<span class="sum-weight">Với tổng chi phí: ${L[parseInt(selectedVertexA.id)][parseInt(selectedVertexB.id)]} </span>`;
        }
        selectedVertexA = null;
        selectedVertexB = null;
        document.getElementById('buttonSelectFromVertexA').style.background = '#ecf0f1';
        document.getElementById('buttonSelectFromVertexA').style.color = 'black';
        document.getElementById('buttonSelectFromVertexA').innerHTML = 'Từ đỉnh';
        document.getElementById('buttonSelectToVertexB').style.background = '#ecf0f1';
        document.getElementById('buttonSelectToVertexB').style.color = 'black';
        document.getElementById('buttonSelectToVertexB').innerHTML = 'Đến đỉnh';
    }
    
    document.getElementById('content-list').innerHTML = result; 
    loop();
}

// ĐẶT ĐỒ THỊ THÀNH CÓ HƯỚNG
function setDirected() {
    isDirected = true;
    document.getElementById('buttonDirected').style.background = '#2c3e50';
    document.getElementById('buttonDirected').style.color = '#ecf0f1';

    document.getElementById('buttonUnDirected').style.background = '#ecf0f1';
    document.getElementById('buttonUnDirected').style.color = 'black';

    // loop();
}

// ĐẶT ĐỒ THỊ THÀNH VÔ HƯỚNG
function setUnDirected() {
    isDirected = false;
    document.getElementById('buttonUnDirected').style.background = '#2c3e50';
    document.getElementById('buttonUnDirected').style.color = '#ecf0f1';

    document.getElementById('buttonDirected').style.background = '#ecf0f1';
    document.getElementById('buttonDirected').style.color = 'black';

    // loop();
}

// TÌM VỊ TRÍ ĐỈNH
function findSelectedVertex() {
    selectedVertex = graph.findSelectedVertex();
    loop();
}

// SỰ KIỆN CHUỘT
function mousePressed() {
    if (isAddVertexOn || isRemoveVertexOn || isPrimStarted || isKruskalRunning) 
        return;
    isMouseDragg = false;
    findSelectedVertex();
}

function mouseClicked() {
    if (isAddVertexOn || isRemoveVertexOn || isPrimStarted || isKruskalRunning)
        return;
    isMouseDragg = false;
    findSelectedVertex();
    // loop(); 
    if (selectedVertex) {
        if (isSelectVertexA) {
            selectedVertexA = selectedVertex; 
            if (selectedVertexB != null && selectedVertexA.id == selectedVertexB.id) {
                document.getElementById('buttonSelectVertexA').style.background = '#e74c3c';
                document.getElementById('buttonSelectVertexA').innerHTML = "TRÙNG!!!";
                return;
            }
            document.getElementById('buttonSelectVertexA').style.background = '#ecf0f1';
            document.getElementById('buttonSelectVertexA').style.color = 'black';
            document.getElementById('buttonSelectVertexA').innerHTML = selectedVertexA.name;
            return;
        }
        if (isSelectVertexB) {
            selectedVertexB = selectedVertex;
            if (selectedVertexA != null && selectedVertexA.id == selectedVertexB.id) {
                document.getElementById('buttonSelectVertexB').style.background = '#e74c3c';
                document.getElementById('buttonSelectVertexB').innerHTML = "TRÙNG!!!";
                return;
            }
            document.getElementById('buttonSelectVertexB').style.background = '#ecf0f1';
            document.getElementById('buttonSelectVertexB').style.color = 'black';
            document.getElementById('buttonSelectVertexB').innerHTML = selectedVertexB.name;
            return;
        }
        if (isSelectStartPrim) {
            isPrimStarted = true;
            document.getElementById('buttonSelectPrim').style.background = '#ecf0f1';
            document.getElementById('buttonSelectPrim').style.color = 'black';
            document.getElementById('buttonSelectPrim').innerHTML = "Bắt đầu thuật toán Prim";
            prim();
            return;
        }
        if (isSelectFromVertexA) {
            selectedVertexA = selectedVertex; 
            if (selectedVertexB != null && selectedVertexA.id == selectedVertexB.id) {
                document.getElementById('buttonSelectFromVertexA').style.background = '#e74c3c';
                document.getElementById('buttonSelectFromVertexA').innerHTML = "TRÙNG!!!";
                return;
            }
            document.getElementById('buttonSelectFromVertexA').style.background = '#ecf0f1';
            document.getElementById('buttonSelectFromVertexA').style.color = 'black';
            document.getElementById('buttonSelectFromVertexA').innerHTML = selectedVertexA.name;
            if (selectedVertexA != null && selectedVertexB != null)
                findFloyd();
            return;
        }
        if (isSelectToVertexB) {
            selectedVertexB = selectedVertex;
            if (selectedVertexA != null && selectedVertexA.id == selectedVertexB.id) {
                document.getElementById('buttonSelectToVertexB').style.background = '#e74c3c';
                document.getElementById('buttonSelectToVertexB').innerHTML = "TRÙNG!!!";
                return;
            }
            document.getElementById('buttonSelectToVertexB').style.background = '#ecf0f1';
            document.getElementById('buttonSelectToVertexB').style.color = 'black';
            document.getElementById('buttonSelectToVertexB').innerHTML = selectedVertexB.name;
            if (selectedVertexA != null && selectedVertexB != null)
                findFloyd();
            return;
        }
    }
}

function mouseDragged() {
    if (isPrimStarted || isKruskalRunning)
        return;

    isMouseDragg = true;
    if (selectedVertex) {
        selectedVertex.x = mouseX;
        selectedVertex.y = mouseY;
        if (mouseX < 30) {
            selectedVertex.x = 30;
        }
        if (mouseY < 30) {
            selectedVertex.y = 30;
        }
        if (mouseX > 1170) {
            selectedVertex.x = 1170;
        }
        if (mouseY > 660) {
            selectedVertex.y = 660;
        } 
        loop();
    }
}

function mouseReleased() {
    if (isPrimStarted || isKruskalRunning)
        return;

    if (isMouseDragg && selectedVertex) {
        selectedVertex.x = mouseX;
        selectedVertex.y = mouseY;
        if (mouseX < 30) {
            selectedVertex.x = 30;
        }
        if (mouseY < 30) {
            selectedVertex.y = 30;
        }
        if (mouseX > 1170) {
            selectedVertex.x = 1170;
        }
        if (mouseY > 660) {
            selectedVertex.y = 660;
        }
        selectedVertex = null;
        loop();
    }
    isMouseDragg = false;
}