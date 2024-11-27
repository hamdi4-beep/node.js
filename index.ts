interface BaseClass {
    log(msg: string): void
}

const extendClass = (BaseClass: new () => BaseClass) => class extends BaseClass {
    verify(): void {
        this.log('The SubClass extends BaseClass.')
    }
}

const SubClass = extendClass(class implements BaseClass {
    log(msg: string): void {
        console.log(msg)
    }
})

;(new SubClass()).verify()