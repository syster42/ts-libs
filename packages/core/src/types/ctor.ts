export interface Ctor<T> extends Function {
  new (...args: any[]): T;
}

export default Ctor;
