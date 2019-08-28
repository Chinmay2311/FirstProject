
let users = [];
class ArrayAdapter {
    save(data) {
        return new Promise((resolve, reject) => {
            if (data) {
                users.push(data);
            }
            else {
                reject('data not found');
            }
        })
    }
    display() {
        return new Promise((resolve, reject) => {
            if (users) {
                resolve(users);
            }
            else {
                reject('data not found');
            }
        })

    }
    update(id, obj) {
        return new Promise((resolve, reject) => {
            let user1 = "";
            let ind = "";
            users.forEach((data, index) => {
                if (id == data.id) {
                    user1 = data;
                    ind = index
                }
            })
            //    const user = users.find(el => id === el.id);
            if (!user) {
                reject('User not found');
            }
            Object.keys(obj).forEach((val) => {
                if (Object.keys(user1).includes(val)) {
                    this.users[ind][val] = obj[val];
                }
            })
            resolve(this.users[ind]);
        })
    }
}
class User {
    constructor(instance, schema) {
        this.instance = instance
        this.schema = schema;
    }
    display() {
        return this.instance.display()
    }
    save(id, name) {
        return this.instance.save(new this.schema(id, name));
    }
    update(id, obj) {
        return this.instance.update(id, obj)
    }
}
class Schema {
    constructor(id, name) {
        this.id = id;
        this.name = name;
    }
}

const main = async () => {
    try {
        const adapt = new ArrayAdapter();
        const user = new User(adapt, Schema);
        console.log(await user.save(1, 'Vasant'));
        console.log(await user.save(2, 'Nimesh'));
        console.log(await user.save(3, 'Abhi'));
        console.log(await user.update(1, 'Chinmay'));
        console.log(await user.display());
        user.display()
    }
    catch (err) {
        console.log(err);
    }
}
main();