interface SubClass {
    log(msg: string): void
}

const extendClass = (BaseClass: new () => SubClass) => class extends BaseClass {
    verify(): void {
        this.log('The SubClass extends BaseClass.')
    }
}

const SubClass = extendClass(class {
    log(msg: string) {
        console.log(msg)
    }
})

;(new SubClass()).verify()