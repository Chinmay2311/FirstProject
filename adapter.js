class User{
    constructor(id,fname,lname){
        this.id = id;
        this.fname = fname;
        this.lname = lname;
    }
}


class Adapter{
    
    constructor(_adapter){
        this._adapter = _adapter;
    }
    save(obj){
        const schema = ['id','fname','lname'];
        const arr = Object.keys(obj);
        let flag = true;
        schema.forEach((val) =>{
            if(!arr.includes(val)){
                flag = false;
            }
            
        })
        if(flag){
            const newUser = new User(obj.id,obj.fname,obj.lname);
            this._adapter.push(newUser);
            return 'User added successfully'
        }
        return 'couldnt add user'

    }
    show(){
        console.log(this._adapter);
    }

    // update(id,obj){
    //     const schema = ['id','fname','lname'];
    //     const user = this._adapter.find(a => id === a.id);
    //     if(!user)
    //     return 'couldnt find user';

    // }
}

const person = new User(1, 'Chinmay', 'Chavan');
const person2= new User(2,'Abhishek','Jaiswal');
const person3 = new User(3,'Akshay','Khanore');
const person4 = new User(4,'abcd');

var arr = [];
arr.push(person);
arr.push(person2);
arr.push(person3);
arr.push(person4);
adapter = new Adapter(arr);
adapter.show();
console.log(arr);

