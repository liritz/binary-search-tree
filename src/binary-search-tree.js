class Node {
  constructor(value = null, parent = null) {
    this.value = value;           // Put data here!
    this.right = null;
    this.left = null;
    this.parent = parent;
  }
  
  isEnd() {
    return !(this.right || this.left);
  }
}


class BinarySearchTree {
  constructor() {
    this.firstNode = null;
    this.pointer = null;      // This.pointer is controlled by find() don't use without it
  }
  
  isEmpty() {
    return this.firstNode === null;
  }
  
  insertArray(array) {        // insertArray first reorders the array such that the resulting tree is balanced!
    this.balancedTreeArray(array).forEach(v => this.insert(v));
  }
  
  insert(value) {
    if (this.isEmpty()) {
      this.firstNode = new Node(value);
    }
    else {
      if (!this.find(value)) {                 // find() also sets this.pointer
        if (value < this.pointer.value) {
          this.pointer.left = new Node(value, this.pointer);
        }
        else {
          this.pointer.right = new Node(value, this.pointer);
        }
      }
    }
  }
  
  delete(value) {
    if (value === this.firstNode.value && this.firstNode.isEnd()) {
      this.firstNode = null;
    }
    else if (this.find(value)) {
      this.replace(this.pointer);
    }
  }
  
  replace(node) {
    let pointer = node;
    
    if (pointer.right) {
      pointer = pointer.right;
      while (pointer.left) {
        pointer = pointer.left;
      }
    }
    else if (pointer.left) {
      pointer = pointer.left;
      while (pointer.right) {
        pointer = pointer.right;
      }
    }
    
    node.value = pointer.value;
    
    if (pointer.isEnd()) {
      this.remove(pointer);
    }
    else {
      this.replace(pointer);
    }
  }
  
  remove(node) {           // remove() is a helper function. It will damage the tree if not
    if (node.parent.right) {                     // used on end nodes! Use delete() instead.
      if (node.parent.right.value === node.value) {
        node.parent.right = null;
      }
    }
    if (node.parent.left) {
      if (node.parent.left.value === node.value) {
        node.parent.left = null;
      }
    }
  }
  
  find(value) {
    if (this.isEmpty()) {
      return false;
    }
    else {
      this.pointer = this.firstNode;
      let searching = true;
      
      while(searching) {
        if (value === this.pointer.value) {
          return true;
        }
        else if (value < this.pointer.value) {
          if (this.pointer.left) {
            this.pointer = this.pointer.left;
          }
          else {
            return false;
          }
        }
        else if (this.pointer.value < value) {
          if (this.pointer.right) {
            this.pointer = this.pointer.right;
          }
          else {
            return false;
          }
        }
      }
    }
  }
  
  clear() {
    this.firstNode = null;
  }
  
  balancedTreeArray(array) {
    let u_s_array = this.sortedArray(this.uniqueArray(array));
    let results = [u_s_array];
    
    while (1 < results[0].length) {
      results.unshift(this.reSort(results[0]))
    }
    
    return this.uniqueArray(results.reduce((res,v) => res.concat(v) , []));
  }
  
  reSort(array) {
    let result = (2 < array.length) ? array.slice(1,-1) : array.slice();
    result = result.filter((v,i,a) => !((Math.floor(a.length / 2) + i) % 2) );
    return result;
  }
  
  sortedArray(array) {
    return array.slice().sort( (a,b) => a-b );
  }
  
  uniqueArray(array) {
    return array.filter((v,i,a) => !a.slice(0,i).includes(v) );
  }
  
}


// Testing

const tree = new BinarySearchTree();

let newArray = [];
for (let i = 0; i < 40; i++) { newArray.push(i); }

tree.clear();

tree.insertArray(newArray);

console.log(tree.firstNode);
