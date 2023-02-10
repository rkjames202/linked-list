class LinkedList {
  #head;

  constructor() {
    this.#head = new Node();
  }

  /**
   * Adds a new node containing 'value' to end of list
   * @param {*} value - value of node to be added
   */
  append(value) {
    if (this._headEmpty()) {
      //Initialize head value
      this.#head.value = value;
    } else {
      let tmp = this.#head;

      //Until tmp is last node in list
      while (tmp.next !== null) tmp = tmp.next;

      //Append new node
      tmp.next = new Node(value, null);
    }
  }

  /**
   * Adds a new node containing 'value' to the start of the list
   * @param {*} value
   */
  prepend(value) {
    if (this._headEmpty()) {
      //Initialize head value
      this.#head.value = value;
    } else {
      //Replace head of list with new node pointing to previous head
      this.#head = new Node(value, this.#head);
    }
  }

  /**
   * Returns node at given index
   * If index passed is greater than list size, return tail
   * If index passed is lower than list size, return head
   * @param {number} index
   * @returns
   */
  at(index) {
    let i = 0;

    let tmp = this.#head;

    //Stop at i or when end of list reached
    while (i < index && tmp.next !== null) {
      tmp = tmp.next;
      i++;
    }

    return tmp;
  }

  /**
   * Removes last element from the list
   */
  pop() {
    //If head is the only element in the list
    if (this.#head.next === null) {
      this.#head.value = null;
    } else {
      //Two pointers for current node being check and previous one
      let cur = this.#head;
      let prev;

      //While list has elements
      while (cur.next !== null) {
        prev = cur;
        cur = cur.next;
      }

      //Have previous node point to null, removing current node
      prev.next = null;
    }
  }

  /**
   * Returns true if value is in list, false if not
   * @param {*} value - value to be checked
   * @returns - if value is present in list
   */
  contains(value) {
    let tmp = this.#head;

    //Check all values in list for a match
    while (tmp !== null) {
      if (tmp.value === value) {
        return true;
      }

      tmp = tmp.next;
    }

    //Value was not found
    return false;
  }

  /**
   * Returns the index of the node containing passed
   * in value
   * @param {*} value - value to be checked
   * @returns
   */
  find(value) {
    let i = 0;
    let tmp = this.#head;

    //Check all values in list for a match
    while (tmp !== null) {
      if (tmp.value === value) {
        return i;
      }

      //Go to next node if no match
      tmp = tmp.next;
      //Increment index
      i++;
    }
    //Value was not found
    return null;
  }

  /**
   * Creates a string that represents LinkedList object
   * @returns - string
   */
  toString() {
    let str = "";
    let tmp = this.#head;

    while (tmp !== null) {
      str += `(${tmp.value}) --> `;
      tmp = tmp.next;
    }

    str += "null";

    return str;
  }

  /**
   * Insert new node at passed in index
   * If index is greater than list size, inserts at tail
   * If index is less than list size, inserts at head
   *
   * @param {*} value - value of node to be inserted
   * @param {*} index
   * @returns
   */
  insertAt(value, index) {
    if (index <= 0) {
      this.#head = new Node(value, this.#head.next);
      return;
    }

    let i = 0;
    //Keep references for current node being checked and previous one
    let cur = this.#head;
    let prev;

    //Stop at i or when end of list reached
    while (i < index && cur.next !== null) {
      prev = cur;
      cur = cur.next;
      i++;
    }

    //Insert new node, removing  old one
    prev.next = new Node(value, cur.next);
    cur = null;
  }

  /**
   * Removes node at given index
   * If index is greater than list size, delete tail
   * If index is lower than list size, delete head
   *
   * @param {number} index
   * @returns
   */
  removeAt(index) {
    if (index <= 0) {
      this.#head = this.#head.next;
      return;
    }

    let i = 0;

    //Keep references for current node being checked and previous one
    let cur = this.#head;
    let prev;

    //Stop at i or when end of list reached
    while (i < index && cur.next !== null) {
      prev = cur;
      cur = cur.next;
      i++;
    }

    //Remove current node
    prev.next = cur.next;
    cur = null;
  }

  //Getters

  /**
   * Gets the number of nodes in list
   */
  get size() {
    let items = 0;
    let tmp = this.#head;
    while (tmp) {
      items++;
      tmp = tmp.next;
    }

    return items;
  }

  get head() {
    return this.#head;
  }

  /**
   * Returns the last node in list
   */
  get tail() {
    let tmp = this.#head;

    while (tmp.next !== null) tmp = tmp.next;

    console.log("temp:", tmp);

    return tmp;
  }

  /**
   * Checks if head points to null and has null value
   * @returns - if head is empty/null
   */
  _headEmpty() {
    return this.#head.value === null && this.#head.next === null;
  }
}

class Node {
  #value;
  #next;

  //Default values for value and next are null
  constructor(value = null, next = null) {
    this.#value = value;
    this.#next = next;
  }
  //Setters

  /**
   * Sets value of node.
   * 
   * @param {Number} value - value of node
   */
  set value(value) {
    if (isNaN(value)) {
      this.#value = value;
    } else {
      throw new Error("Value must be a number.");
    }
  }

  /**
   * Sets next pointer of node.
   * 
   * @param {Node} next - next node pointer
   */
  set next(next) {
    if (next === null || next instanceof Node) {
      this.#next = next;
    } else {
      throw new Error("Next must be null or a Node object.");
    }
  }

  //Getters 

  get value() {
    return this.#value;
  }

  get next() {
    return this.#next;
  }
}

//Driver function for testing
function main() {
  let list = new LinkedList();

  list.append(5);
  list.append(6);
  list.append(7);
  list.append(8);
  console.log(list.toString()); // (5) --> (6) --> (7) --> (8) --> null

  list.prepend(10);
  console.log(list.toString()); // (10) --> (5) --> (6) --> (7) --> (8) --> null

  console.log(list.size); // 5
  console.log(list.head); // Node { value : 10, next ...}
  console.log(list.tail); // Node { value: 8, next: null }
  console.log(list.at(1)); // Node { value :5, next ... }

  list.pop();
  console.log(list.toString()); // (10) --> (5) --> (6) --> (7) --> null

  console.log(list.contains(10)); // true
  console.log(list.contains(21)); // false

  console.log(list.find(6)); // 2
  console.log(list.find(21)); // null

  list.insertAt(21, 3);
  console.log(list.toString()); // (10) --> (5) --> (6) --> (21) --> null

  list.removeAt(3);
  console.log(list.toString()); // (10) --> (5) --> (6) --> null
  console.log(list.toString());
}

main();
