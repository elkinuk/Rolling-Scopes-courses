function Node(key,value) {
  this.value = value;
  this.key = key;
  this._left = null;
  this._right = null;
}

function BinarySearchTree() {
  this._root = null;
}

BinarySearchTree.prototype.root = function(){
if (this._root == null)
    return undefined;
  return this._root.value
}

BinarySearchTree.prototype.insert = function(key,value) {
  if(!this._root) {
    this._root = new Node(key,value);
  } else {
    let root = this._root;
    while(root != undefined) {
      if(key < root.key) {
        if(root._left==undefined) {
          root._left = new Node(key,value);
          return this;
        }
        root = root._left;
      } else if (key >= root.key) {
        if(root._right==undefined) {
          root._right = new Node(key,value);
          return this;
        }
        root = root._right;
      }
    }
  }
  return this;
}

BinarySearchTree.prototype.search = function(key) {
  let root = this._root;
  while(root!=undefined) {
    if (key === root.key)
      return root.value;
    root = key < root.key ? root._left : root._right;
    }
  return null;
}

BinarySearchTree.prototype.contains = function(value) {
  if (this._root == null )
    return false;
  let queue = new Array();
  queue.push(this._root);
  while(queue.length!=0) {
    let current = queue.shift();
    if(current.value === value)
      return true;
    if(current._left!=undefined) {
      queue.push(current._left);
    }
    if(current._right!=undefined) {
      queue.push(current._right);
    }
  }
  return false;
}

BinarySearchTree.prototype.print = function() {
  if(!this._root) {
    return console.log('No root current found');
  }
  let newline = new Node(0,'|');
  let queue = [this._root, newline];
  while(queue.length) {
    let current = queue.shift();
    if(current === newline && queue.length) {
      queue.push(newline);
    }
    if(current._left) {
      queue.push(current._left);
    }
    if(current._right) {
      queue.push(current._right);
    }
  }
  console.log(''.slice(0, -2).trim());
}

BinarySearchTree.prototype.verify = function() {
  let queue = new Array();
  queue.push(this._root);
  while(queue.length!=0) {
    let current = queue.shift();
    if(current._left!=undefined && current._right!=undefined)
      if(current._left.key >= current.key || current._right.key < current.key)
      return false;
    if(current._left!=undefined) {
      queue.push(current._left);
    }
    if(current._right!=undefined) {
      queue.push(current._right);
    }
  }
  return true;
}

BinarySearchTree.prototype.traverse = function(order) {
    let arr = new Array();
    orderTree(this._root,arr);
    return order === true ? arr :arr.reverse();
}

function orderTree(root, arr) {
  if (root._left!=undefined) {
    orderTree(root._left,arr);
  }
  arr[arr.length] = root.value;
  if (root._right!=undefined) {
    orderTree(root._right,arr);
  }
  return arr;
};

BinarySearchTree.prototype.delete = function(key){
    if (this._root !== null) {
        let current = this._root;
        let stack = [];
        while (current !== undefined){
            stack.push(current);
            if (current.key === key) {
                stack.pop();
                let prev = stack.pop();
                if (!current._left && !current._right) {
                    if (prev!== undefined && prev._left && prev._left.key === current.key)
                        prev._left = null;
                    else prev._right = null;
                }
                else if (current._left && !current._right) {
                    if (prev!== undefined && prev._left && prev._left.key === current.key)
                        prev._left = current._left;
                    else prev._right = current._left;
                }
                else if (current._right && !current._left) {
                    if (prev!== undefined && prev._left && prev._left.key === current.key)
                        prev._left = current._right;
                    else  prev._right = current._right;
                }
                break;
            }
            else if (key < current.key) {
                current = current._left;
            }
            else current = current._right;
        }
    }
    return this;
}

module.exports = {
  BinarySearchTree,
  //WARNING!!!
  //PROVIDE BST STRUCTURE FOR TESTS {STRING}
  root: '_root',
  left: '_left',
  right: '_right',
  //NAME FOR REPORTS
  student: 'elkinny'
};
