"use strict";
const objInferred = {
    a: 1,
    b: 'test',
    c: true,
};
const obj = {
    a: 1,
    b: 'test',
    c: true,
    e: undefined,
    f: [1, 2, 3],
    g: [1, 'a', true],
    h: {
        a: 1,
        b: 'test',
    }
};
const funcOptional = (a, b) => a + (b || 0);
const funcDefault = (a, b = 0) => a + b;
const funcObjParam = (obj) => 'test';
const funcObjParam2 = (date, options) => 'test';
