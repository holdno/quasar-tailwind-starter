function isFunction(obj: any) {
  return toString.call(obj) === '[object Function]';
}

export function eq(
  a: any,
  b: any,
  aStack: any = [],
  bStack: any = [],
): boolean {
  // === 结果为 true 的区别出 +0 和 -0
  if (a === b) return a !== 0 || 1 / a === 1 / b;

  // typeof null 的结果为 object ，这里做判断，是为了让有 null 的情况尽早退出函数
  if (a == null || b == null) return false;

  // 判断参数 a 类型，如果是基本类型，在这里可以直接返回 false
  const type = typeof a;
  if (type !== 'function' && type !== 'object' && typeof b !== 'object')
    return false;

  // 更复杂的对象使用 deepEq 函数进行深度比较
  return deepEq(a, b, aStack, bStack);
}

function deepEq(a: any, b: any, aStack: any, bStack: any) {
  // a 和 b 的内部属性 [[class]] 相同时 返回 true
  const className = toString.call(a);
  if (className !== toString.call(b)) return false;

  switch (className) {
    case '[object RegExp]':
    case '[object String]':
      return '' + a === '' + b;
    case '[object Number]':
      return a === b;
    case '[object Date]':
    case '[object Boolean]':
      return +a === +b;
  }

  const areArrays = className === '[object Array]';
  // 不是数组
  if (!areArrays) {
    // 过滤掉两个函数的情况
    if (typeof a !== 'object' || typeof b !== 'object') return false;

    const aCtor = a.constructor;
    const bCtor = b.constructor;
    // aCtor 和 bCtor 必须都存在并且都不是 Object 构造函数的情况下，aCtor 不等于 bCtor， 那这两个对象就真的不相等啦
    if (
      aCtor !== bCtor &&
      !(
        isFunction(aCtor) &&
        aCtor instanceof aCtor &&
        isFunction(bCtor) &&
        bCtor instanceof bCtor
      ) &&
      'constructor' in a &&
      'constructor' in b
    ) {
      return false;
    }
  }

  aStack = aStack || [];
  bStack = bStack || [];
  let length = aStack.length;

  // 检查是否有循环引用的部分
  while (length--) {
    if (aStack[length] === a) {
      return bStack[length] === b;
    }
  }

  aStack.push(a);
  bStack.push(b);

  // 数组判断
  if (areArrays) {
    length = a.length;
    if (length !== b.length) return false;

    while (length--) {
      if (!eq(a[length], b[length], aStack, bStack)) return false;
    }
  }
  // 对象判断
  else {
    const keys = Object.keys(a);
    length = keys.length;

    if (Object.keys(b).length !== length) return false;
    if (typeof b === 'object') {
      while (length--) {
        const key = keys[length];
        if (
          !(
            Object.prototype.hasOwnProperty.call(b, key) &&
            eq(a[key], b[key], aStack, bStack)
          )
        )
          return false;
      }
    }
  }

  aStack.pop();
  bStack.pop();
  return true;
}
