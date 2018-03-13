export class List<T> {
  item: Array<T>;

  constructor() {
    this.item = new Array<T>();
  }

  add(index: number, value: T ): void {
    this.item.splice(index, 0, value);
  }

  addToRandomIndex(begin: number, end: number, value: T): void {
    const newIndex = Math.floor(Math.random() * (end - begin + 1) + begin);
    this.add(newIndex, value);
  }

  push(value: T): void {
    this.item.push(value);
  }

  get(index: number) {

  }

  pop(): T {
    return this.item.pop();
  }

  length() {
    return this.item.length;
  }

  remove(index: number): any {
    return this.item.splice(index, 1)[0];
  }

  get Value() {
    return this.item;
  }
  set Value(value) {
    this.item = value;
  }
}
