const {sum,myFunction,fetchData,fetchPromise} = require('./sum');
const {app} = require('./app');
const request = require('supertest');

test('adds 1 + 2 equals to 3', ()=>{
    expect(sum(1,2)).toBe(3);
});

// toEqual() is used for matching arrays and objects
test('object assignment', ()=>{
    const data = {one:'1'};
    data['two'] = 2;
    expect(data).toEqual({one:'1',two:2});
});

test('null is falsy value', ()=>{
    const n = null;
    expect(n).toBeFalsy(); // simmilarly there is toBeTruthy
});

test('error handling', ()=>{
    expect(()=>{
        myFunction('Invalid');
    }).toThrow(); // simmilarly there is toBeTruthy
});

test('timeout function checking', (done)=>{
    fetchData((a)=>{
        try{
            expect(a).toBe(`Hello world`);
            done();
        }catch(error){
            done(error);
        }
    });
}, 10000);

test('promise checking', async()=>{
    try{
        const value = await fetchPromise().then(a=>a);
        expect(value).toBe(`Hello World!`);
    }catch(error){
        expect(error).toThrow();
    };
});

test('mock implementation', ()=>{
    const mockCallback = jest.fn(x=>42+x);
    expect(mockCallback(0)).toBe(42);
    expect(mockCallback(1)).toBe(43);
    expect(mockCallback).toHaveBeenCalledWith(1);
})

test('spying on a method of an object', ()=>{
    const video = {
        play(){
            return true;
        }
    };
    const spy = jest.spyOn(video,'play');
    video.play();
    expect(spy).toHaveBeenCalled();
    spy.mockRestore();//restore the orignal implementation of that function
})

describe('POST /users', ()=>{

    describe('given a username and password', ()=>{
        // should save the username and password 
        // should respond with a json object containing user id
        test('should respond with a 200 staus code',async()=>{
            console.log('inside');
            const response = await request(app).post('/users').send({
                username:'username',
                password:'password'
            });
            console.log(response);
            expect(response.statusCode).toBe(200);
        });     
        // should specify json in content-type header
    });

    describe('when the username and password is missing', ()=>{
        //
    });

});