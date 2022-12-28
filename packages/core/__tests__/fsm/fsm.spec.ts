import { Fsm, IState, StateMachineError } from '../../src/index.js';

describe('state machine', () => {
  it('should be defined', () => {
    expect(Fsm).toBeDefined();
  });

  it('should be able to create', () => {
    expect(new Fsm()).toBeDefined();
  });

  it('should be able to add states', () => {
    const machine = new Fsm();
    const fooKey = Symbol('foo');

    const state: IState = {
      key: fooKey,
    };
    machine.addState(state);
    expect((machine as any).states.get(fooKey)).toBeDefined();
  });

  describe('state machine lifecycle', () => {
    let machine: Fsm;

    const s1: IState = {
      key: Symbol('s1'),
    };
    const s2: IState = {
      key: Symbol('s2'),
      permit: new Set(),
    };
    const s3: IState = {
      key: Symbol('s3'),
    };
    const s4: IState = {
      key: Symbol('s4'),
    };
    const s5: IState = {
      key: Symbol('s5'),
    };

    const s6: IState = {
      key: Symbol('s6'),
    };

    beforeEach(() => {
      machine = new Fsm();
      machine.addState(s1);
      machine.addState(s2);
      machine.addState(s3);
      machine.addState(s4);
      machine.addState(s5);
    });

    it('should set state', async () => {
      await machine.setState(s1.key);
      expect((machine as any).currentState).toBe(s1);
    });

    it('should throw with invalid state', async () => {
      try {
        await machine.setState(s6.key);
      } catch (e) {
        expect(e instanceof StateMachineError).toBe(true);
        expect(e).toStrictEqual(new StateMachineError("State doesn't exist"));
      }
    });

    it('should exit when setting same state', async () => {
      await machine.setState(s1.key);
      await machine.setState(s1.key);
      expect((machine as any).currentState).toBe(s1);
    });

    it('should throw when not permitted', async () => {
      await machine.setState(s1.key);
      try {
        await machine.setState(s2.key);
      } catch (e) {
        expect(e instanceof StateMachineError).toBe(true);
        expect(e).toStrictEqual(new StateMachineError("Can't enter state from previous state"));
      }
    });

    it('should queue state', async () => {
      await machine.setState(s1.key);
      const prom = new Promise<void>((res, rej) => {
        s3.onEnter = async (): Promise<void> => {
          await machine.setState(s4.key);
          if ((machine as any).queue.length === 1) {
            res();
          } else {
            rej();
          }
          return Promise.resolve();
        };
      });
      await machine.setState(s3.key);
      expect(await prom).toBe(undefined);
    });

    it('should call onUpdate', async () => {
      const prom = new Promise<void>((res) => {
        s4.onUpdate = async (): Promise<void> => {
          res();
          return Promise.resolve();
        };
      });
      await machine.setState(s4.key);

      await machine.update(0);
      expect(await prom).toBe(undefined);
    });

    it('should call onExit', async () => {
      const prom = new Promise<void>((res) => {
        s4.onExit = async (): Promise<void> => {
          res();
          return Promise.resolve();
        };
      });
      await machine.setState(s4.key);
      await machine.setState(s5.key);
      expect(await prom).toBe(undefined);
    });
  });
});
