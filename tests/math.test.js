const add = (a,b) => {
    return a+b;
}

test('sum 1 + 1 equals 2', () => {
    expect(add(1,1)).toBe(2);
})