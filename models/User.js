class User {
    constructor(id, name, age) {
        this.id = id;
        this.name = name;
        this.age = age;
    }
    enter() {
        console.log(`${this.name}进入图书馆！`);
    }
}
module.exports = User;