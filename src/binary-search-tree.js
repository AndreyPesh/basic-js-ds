const { NotImplementedError } = require('../extensions/index.js');

// const { Node } = require('../extensions/list-tree.js');

/**
* Implement simple binary search tree according to task description
* using Node from extensions
*/
module.exports = class BinarySearchTree {

  constructor() {
    this.rootNode = null
  }

  root() {
    return this.rootNode
  }

  createNode(value) {
    return {
      data: value,
      left: null,
      right: null
    }
  }

  add(data) {
    const node = this.createNode(data)
    if (!this.rootNode) {
      this.rootNode = node
      return
    }
    this.insert(node, this.rootNode)
  }

  insert(node, currentRoot) {
    const currentNode = node
    if (currentNode.data > currentRoot.data) {
      if (!currentRoot.right) {
          currentRoot.right = currentNode
          return
      } else {
        this.insert(currentNode, currentRoot.right)
      }
    } else if (currentNode.data < currentRoot.data) {
        if (!currentRoot.left) {
          currentRoot.left = currentNode
            return
        } else this.insert(currentNode, currentRoot.left)
    }
  }

  has(data) {
    const node = this.rootNode
    const currentData = data   

    return this.checkNode(currentData, node)
  }

  checkNode(data, node) {
    if (!node) return false
    if (data === node.data) {
        return true
    } else if (data > node.data) {
        return this.checkNode(data, node.right)
    } else if (data < node.data) {
        return this.checkNode(data, node.left)
    }
  }

  find(data) {
    const currentData = data
    const node = this.rootNode
    return this.findData(currentData, node)
  }

  findData(data, node) {
    if (!node) {
      return null 
    }
    if (data === node.data) {
        return node
    } else if (data > node.data) {
        return this.findData(data, node.right)
    } else if (data < node.data) {
        return this.findData(data, node.left)
    }
  }

  remove(data) {
    this.rootNode = this.removeNode(this.rootNode, data)
  }

  removeNode(currentNode, data) {
    if(currentNode === null) return currentNode

    if (data === currentNode.data) {
            
      if (currentNode.left === null && currentNode.right === null){
                
        return null
    
      } else if (currentNode.left === null){
    
        return currentNode.right 
 
      } else if (currentNode.right === null){
    
        return currentNode.left
    
      } else {

        let tempNode = this.smallestNode(currentNode.right)
        currentNode.data = tempNode.data
        
        currentNode.right = this.removeNode(currentNode.right, tempNode.data)
        return currentNode
      }
    } else if (data < currentNode.data) {
      currentNode.left = this.removeNode(currentNode.left, data)
      return currentNode
      
    } else {
        currentNode.right = this.removeNode(currentNode.right, data)
        return currentNode
    }
    
  }

  smallestNode(node) {
    if (!node.left) {
      return node
    } else {
      return this.smallestNode(node.left)
    }
  }

  min() {
    if (!this.rootNode) {
      return null
    }
    if (!this.rootNode.left) {
      return this.rootNode.data
    } 
    return this.searchMin(this.rootNode.left) 
  }

  searchMin(node) {     
    if (!node.left) {
      return node.data
    } else {
      return this.searchMin(node.left)
    }
  }

  max() {
    if (!this.rootNode) {
      return null
    }
    if (!this.rootNode.right) {
      return this.rootNode.data
    } 
    return this.searchMax(this.rootNode.right)
  }
  searchMax(node) {
    if (!node.right) {
      return node.data
    } else {
      return this.searchMax(node.right)
    }
  }
}