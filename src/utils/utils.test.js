import {truncateString} from './utils';
import parse from 'html-react-parser';

describe('Util', () => {
    test('Should truncate the string', () => {
        const shortDesc = "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quidem blanditiis consectetur adipisicing elit. Quidem blanditiis consectetur adipisicing elit. Quidem blanditiis porro.";
        expect(parse(truncateString(shortDesc, 120, true))).toEqual("Lorem ipsum dolor sit amet consectetur adipisicing elit. Quidem blanditiis consectetur adipisicing elit. Quidem…")
    })

    test('Should return the original string without truncation', () => {
        const shortDesc = "Lorem ipsum dolor sit amet.";
        expect(parse(truncateString(shortDesc, 120, true))).toEqual("Lorem ipsum dolor sit amet.")
    })

    test('Should truncate without use word boundary', () => {
        const shortDesc = "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quidem blanditiis consectetur adipisicing elit. Quidem blanditiis consectetur adipisicing elit. Quidem blanditiis porro.";
        expect(parse(truncateString(shortDesc, 120, false))).toEqual("Lorem ipsum dolor sit amet consectetur adipisicing elit. Quidem blanditiis consectetur adipisicing elit. Quidem blandit…");
    })
})