let NEXT_ID = 0;

export default function objectId(o: any) {
    if (typeof o.__uniqueid == "undefined") {
        Object.defineProperty(o, "__uniqueid", {
            value: ++NEXT_ID,
            enumerable: false,
            writable: false
        });
    }

    return o.__uniqueid;
};
