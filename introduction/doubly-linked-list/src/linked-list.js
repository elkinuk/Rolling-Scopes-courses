const Node = require('./node');

class LinkedList {
	constructor() {
		this.length = 0;
		this._head = null;
		this._tail = null;
	}

	append(data) {
		let node = new Node(data);

		if (this.length) {
			this._tail.next = node;
			node.prev = this._tail;
			this._tail = node;
		} else {
			this._head = node;
			this._tail = node;
		}
		this.length++;
		return this;
	}

	head() {
		return this._head.data;
	}

	tail() {
		return this._tail.data;
	}

	at(index) {
		let node = this._head;
		if (!(this.length === 0 || index < 0 || index >= this.length)) {
			for (let count = 0; count < index; count++)
				node = node.next;
			return node.data;
		}
	}

    isEmpty() {
        return this.length == 0 ? true : false;
    }

	insertAt(index, data) {
		let node = this._head;
		if (!(this.length === 0 || index < 0 || index >= this.length)) {
			if (index == 0) //если начало
			{
				if (this.length == 0) {
					this.append(data);
				} else {
                    this.reverse();
                    this.append(data);
                    this.reverse();
				}
			} else if (index == this.length) //если конец
			{
				this.append(data);
			} else {
                for (let count = 0; count < index-1; count++)
					node = node.next;
                let newNode = new Node(data);
                let nextNode = node.next;
                node.next = newNode;
                nextNode.prev = newNode;
                newNode.prev = node;
                newNode.next = nextNode;
                this.length++;
            }
		}
		return this;
	}

	clear() {
		if (!this.isEmpty()) {
			for (let count = 1; count < this.length; count++)
				this._head = this._head.next;
			this._head.data = null;
			this._tail.data = null;
			this.length = 0;
		}
		return this;
	}

	deleteAt(index) {
		let node = this._head;

		// 1-ый случай: неверная позиция
		if (!(this.length === 0 || index < 0 || index >= this.length)) {
			// 2-ой случай: первый узел удален
			if (index === 0) {
				this._head = node.next;
				this.length > 1 ? this._head.prev = null : this._tail = null;
			} else if (index === this.length) // 3-ий случай: последний узел удален
			{
				this._tail = this._tail.prev;
				this._tail.next = null;
			} else // 4-ый случай: средний узел удален
			{
				for (let count = 0; count < index; count++)
					node = node.next;

				let beforeNodeToDelete = node.prev;
				let nodeToDelete = node;
				let afterNodeToDelete = node.next;

				beforeNodeToDelete.next = node.next;
				afterNodeToDelete.prev = beforeNodeToDelete;
				nodeToDelete = null;
			}

			this.length--;
		}
		return this;
	}

	reverse() {
		let headNode = this._head;
		let tailNode = this._tail;
		let half = this.length % 2 == 0 ? this.length / 2 : Math.floor(this.length / 2);
		let helpNode = new Node();

		for (let count = 0; count < half; count++) {
			helpNode.data = headNode.data;
			headNode.data = tailNode.data;
			tailNode.data = helpNode.data;
			tailNode = tailNode.prev;
			headNode = headNode.next;
		}
		return this;
	}

	indexOf(data) {
		let node = this._head,
			count = 0;
		while (node.data != data) {
			node = node.next;
			count++;
			if (count >= this.length) return -1;
		}
		return count;
	}
}

module.exports = LinkedList;
