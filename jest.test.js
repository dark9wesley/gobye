test("commom matcher", () => {
  expect(2 + 2).toBe(4)
  expect(2 + 2).not.toBe(6)
})

test("to be true or false", () => {
  expect(1).toBeTruthy()
  expect(0).toBeFalsy()
})

test("to number", () => {
  expect(3).toBeGreaterThan(2)
  expect(2).toBeLessThan(3)
})

test("object", () => {
  expect({ name: "pengyw" }).toEqual({ name: "pengyw" })
})
