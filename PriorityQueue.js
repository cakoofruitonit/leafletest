class Node {
    constructor(val, priority) {
        this.val = val;
        this.priority = priority;
    }
}
  
class PriorityQueue {
    constructor() {
        this.values = [];
    }
    enqueue(val, priority) {
        let newNode = new Node(val, priority);
        this.values.push(newNode);
        this.bubbleUp();
    }
    bubbleUp() {
        let idx = this.values.length - 1;
        const element = this.values[idx];
        while (idx > 0) {
            let parentIdx = Math.floor((idx - 1) / 2);
            let parent = this.values[parentIdx];
            if (element.priority >= parent.priority) break;
            this.values[parentIdx] = element;
            this.values[idx] = parent;
            idx = parentIdx;
        }
    }
    dequeue() {
        const min = this.values[0];
        const end = this.values.pop();
        if (this.values.length > 0) {
            this.values[0] = end;
            this.sinkDown();
        }
        return min;
    }
    sinkDown() {
        let idx = 0;
        const length = this.values.length;
        const element = this.values[0];
        while (true) {
            let leftChildIdx = 2 * idx + 1;
            let rightChildIdx = 2 * idx + 2;
            let leftChild, rightChild;
            let swap = null;
  
        if (leftChildIdx < length) {
            leftChild = this.values[leftChildIdx];
            if (leftChild.priority < element.priority) {
            swap = leftChildIdx;
            }
        }
        if (rightChildIdx < length) {
            rightChild = this.values[rightChildIdx];
            if (
                (swap === null && rightChild.priority < element.priority) ||
                (swap !== null && rightChild.priority < leftChild.priority)
            ) {
            swap = rightChildIdx;
            }
        }
        if (swap === null) break;
        this.values[idx] = this.values[swap];
        this.values[swap] = element;
        idx = swap;
        }
    }
}
  
class WeightedGraph {
    constructor() {
        this.adjacencyList = {};
        this.start = null;
        this.finish = null;
    }
    addVertex(vertex) {
        if (!this.adjacencyList[vertex]) this.adjacencyList[vertex] = [];
    }
    addEdge(vertex1, vertex2, weight) {
        this.adjacencyList[vertex1].push({ node: vertex2, weight });
        this.adjacencyList[vertex2].push({ node: vertex1, weight });
    }
    Dijkstra(first, last) {
        const nodes = new PriorityQueue();
        const distances = {};
        const previous = {};
        let path = []; 
        let smallest;
        for (let vertex in this.adjacencyList) {
            if (vertex.split("-")[0] === first) {
                distances[vertex] = 0;
                nodes.enqueue(vertex, 0);
            } else {
                distances[vertex] = Infinity;
                nodes.enqueue(vertex, Infinity);
            }
            previous[vertex] = null;
        }
        while (nodes.values.length) {
            smallest = nodes.dequeue().val;
            if (smallest.split("-")[0] === last) {
                while (previous[smallest]) {
                    path.push(smallest);
                    smallest = previous[smallest];
                }
                break;
            }
            if (smallest || distances[smallest] !== Infinity) {
                for (let neighbor in this.adjacencyList[smallest]) {
                    let nextNode = this.adjacencyList[smallest][neighbor];
                    var isBuilding = smallest.length > 1 ? 200 : 0;
                    let candidate = distances[smallest] + nextNode.weight + isBuilding;
                    let nextNeighbor = nextNode.node;
                    if (candidate < distances[nextNeighbor]) {
                        distances[nextNeighbor] = candidate;
                        previous[nextNeighbor] = smallest;
                        nodes.enqueue(nextNeighbor, candidate);
                    }
                }
            }
        }
        
        let pathArray = path.concat(smallest);
        this.setStart(pathArray[pathArray.length - 1]);
        this.setFinish(pathArray[0]);
        return pathArray.reverse();
        
    }
    setStart(start){
        this.start = start;
    }
    setFinish(finish){
        this.finish = finish;
    }
    getStart(){
        return this.start;
    }
    getFinish(){
        return this.finish;
    }

}
