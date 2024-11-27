"use strict";
const extendClass = (BaseClass) => class extends BaseClass {
    verify() {
        this.log('The SubClass extends BaseClass.');
    }
};
const SubClass = extendClass(class {
    log(msg) {
        console.log(msg);
    }
});
(new SubClass()).verify();
