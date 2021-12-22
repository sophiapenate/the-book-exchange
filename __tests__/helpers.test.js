const { is_equal, format_date } = require('../utils/helpers');

test("is_equal() returns true or false", () => {
    const input1 = 1;
    const input2 = 2;
    const input3 = 2;

    expect(is_equal(input1, input2)).toBe(false);
    expect(is_equal(input2, input3)).toBe(true);
})

test("format_date() returns formatted date", () => {
    const date = new Date("December 17, 2021 03:24:00");

    expect(format_date(date)).toBe("Dec 17, 2021");
})