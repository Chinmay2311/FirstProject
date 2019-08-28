let MongoDB = require('./mongo');
users = [];
class ArrayAdapter{
    save(data){
        return new Promise((resolve,reject)=>{
            if(data){
                users.push(data);
                resolve(data);
            }else{
                reject("Couldn't find data");
            }
        })
    }
    show(){
        return new Promise((resolve,reject)=>{
            if(users){
                resolve(users);
            }else{
                reject("Couldn't find data");
            }
        })
    }
    update(id,obj){
        return new Promise((resolve,reject)=>{
            let user = "";
            let index = "";
            users.forEach((data,ind)=>{
                if(id==data.id){
                    user=data;
                    index=ind;
                }
            })
            if(!user){
                reject("User not found");
            }
            Object.keys(obj).forEach((val)=>{
                if(Object.keys(user).includes(val)){
                    users[index][val]=obj[val];
                }
            })
            resolve(users[index]);
        })
    }
 }
 class MongoAdapter{
    async save(data){
        try {
            let user = await MongoDB.getDB().collection('user').insertOne(data);
            //console.log(user)
            return user.ops[0];
        } catch (error) {
            throw error;
        }
    }
    async show(){
        try{
            return await MongoDB.getDB().collection('user').find().toArray()
        } catch(error){
            throw error;
        }   
    }
    async update(id,obj){
        try{
            let data = await MongoDB.getDB().collection('user').findOneAndUpdate({id:id},{$set:{name:obj}});
            return data.value;
        } catch(error){
            throw error;
        }
    }
 }
 class User{
    constructor(instance,schema){
        this.instance = instance
        this.schema =schema;
    }
    show(){
        return this.instance.show()
    }
    save(id,name){
        return this.instance.save(new this.schema(id,name));
    }
    update(id,obj){
        return this.instance.update(id,obj)
    }
 }
 class Schema{
    constructor(id,name){
        // if(!id || !name){
        //     throw new Error('id and name is required');
        // }
        this.id=id;
        this.name=name;
    }
 }
 const main = async ()=>{
    try {
        const adapt = new ArrayAdapter();
        const user = new User(adapt,Schema);
        console.log(await user.save(1,'Chinmay'));
        console.log(await user.save(2,'Vasant'));
        console.log(await user.save(3,'Rahul'));
        console.log(await user.show());
        console.log(await user.update(1,{name:'Rohan'}));
        console.log(await user.show());
    } catch (err) {
        console.log(err);   
    }
}
main();
MongoDB.connectDB(async (err) => {
    try{
        if (err) throw err
        const adapt = new MongoAdapter();
        const user = new User(adapt,Schema);
        console.log(await user.save(1,'Chinmay'));
        console.log(await user.save(2,'Vasant'));
        console.log(await user.save(3,'Rahul'));
        console.log(await user.show());
        console.log(await user.update(1,"Rohan"));
        console.log(await user.show());
        MongoDB.disconnectDB();
    }catch (err){
        console.log(err);
    }
    
})