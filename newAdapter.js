let users = [];
class ArrayAdapter{
   save(_adapter){
       users.push(_adapter);
   }
   display(){
       console.log(users);
   }
   update(id,obj){
        let user1 = "";
        let ind = "";
       users.forEach((data,index)=>{
           if(id==data.id){
             user1 = data;
             ind = index
           }
       })
       const user = users.find(el => id === el.id);
       if(!user){
           return 'User not found';
       }
       const index = users.indexOf(user);
       users[index]=obj;
   }
}
class User{
   constructor(instance,schema){
       this.instance = instance
       this.schema =schema;
   }
   display(){
       return this.instance.display()
   }
   save(id,name){
       this.instance.save(new this.schema(id,name));
   }
   update(id,obj){
       this.instance.update(id,obj)
   }
}
class Schema{
   constructor(id,name){
       this.id=id;
       this.name=name;
   }
}
const adapt = new ArrayAdapter();
const user = new User(adapt,Schema);
user.save(1,'Vasant');
user.save(2,'Akshay');
user.save(3,'Abhishek');
user.update(1,new Schema(1,'Chinmay'));
user.display()