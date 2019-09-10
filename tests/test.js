const dotenv       = require('dotenv');
dotenv.config({path:'./config.env'});
const mocha        = require('mocha');
var expect         = require('chai').expect;
var should         = require('chai').should();
const userModel    = require('../models/userModel');
const vehicleModel = require('../models/vehicleModel');
const arrayAdapter = require('../adapters/arrayAdapter');
const mongoAdapter = require('../adapters/mongoAdapter');
describe('testing Mongo adapter',async function async (){
   const adapt = new mongoAdapter();
   const user  = new userModel(adapt);
   it('update test',async function  (){
       let updated = await user.update('i9khn5qck0c6rii3','abhishek');
       expect(updated).to.have.keys(['name','id','_id'])
       updated.should.have.property('name').equal('abhishek');
   })
   it('save test',async function  (){
       let updated = await user.save('abhi');
       updated.should.have.property('name').equal('abhi');
       expect(updated).to.have.keys(['name','id','_id'])
   })
   it('show test',async function  (){
       let data = await user.show();
      expect(data).to.be.a('array');
   })
   it('close', async function (){
       let data = await adapt.close();
       expect(data).to.be.true;
   })
   
})

describe('For a single connection',()=>{
    it('single connection', function(){
        (()=> new mongoAdapter()).should.throw(Error);
    })
});

describe('testing Array adapter', async function async(){
    const adapt = new arrayAdapter();
    const user = new userModel();

    it('show test',async function (){
        let data = await adapt.show();
        expect(data).to.be.a('array');
    })

    it('save test'), async function(){
        let updated = await adapt.save('abhi');
        updated.should.have.property('name').equal('abhi');
        expect(updated).to.have.keys(['name','id','_id'])

    }
});
