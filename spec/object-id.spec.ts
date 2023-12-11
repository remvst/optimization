import objectId from "../src/object-id";

describe('objectId', () => {
    it('will only assign to an object once', () => {
        const obj = {};
        const id = objectId(obj);
        expect(objectId(obj)).toBe(id);
    });
    
    it('will assign different IDs to different objects', () => {
        const obj1 = {};
        const obj2 = {};

        expect(objectId(obj1)).not.toBe(objectId(obj2));
    });
});
