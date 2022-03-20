import { eq } from './eq';

class BaseQueue {
  list: Map<string, any[]>;
  before: any;
  size: number;

  constructor(size: number) {
    this.list = new Map();
    this.size = size;
  }

  push(key: string, data: any) {
    if (data === null || data === undefined) {
      return false;
    }

    let q = this.list.get(key);
    if (!q) {
      this.list.set(key, []);
      q = this.list.get(key);
    }
    if (this.size != null && !isNaN(this.size)) {
      if (q?.length === this.size) {
        this.pop(key);
      }
    }

    q?.unshift(data);
    return true;
  }

  pop(key: string) {
    const m = this.list.get(key);
    const msg = m?.pop();
    this.list.set(key, m || []);
    if (eq(msg, this.before)) {
      return false;
    }
    this.before = msg;
    return msg;
  }

  currentSize(key: string) {
    return this.list.get(key)?.length;
  }

  get sourceQueue() {
    return this.list;
  }
}

export interface MsgQueueData {
  type: string;
  msg: string;
}

export class MsgQueue extends BaseQueue {
  declare list: Map<string, MsgQueueData[]>;
  popHandle?: (data: MsgQueueData | boolean) => undefined;

  constructor(
    handle: (data: MsgQueueData | boolean) => undefined,
    size: number,
  ) {
    super(size);
    this.popHandle = handle;
  }

  join(key: string | undefined, msg: string, type: string = 'warn') {
    this.push(key || '', {
      msg: msg,
      type: type,
    });
  }

  popAll(key: string | undefined) {
    const rk = key || '';
    const l = this.currentSize(rk) || 0;
    for (let i = 0; i < l; i++) {
      if (i === l) return;
      if (!this.popHandle) return;
      this.popHandle(this.pop(rk));
    }
  }
}
