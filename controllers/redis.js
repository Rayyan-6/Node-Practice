import { createClient } from "redis";

let client;

const initRedisClient = async ()=>{
    if(!client){
        client = createClient();
        console.log("Redis client created")
        client.on("error", ()=> console.log("Error using redis client"))
    }

    try{
        await client.connect()
    }
    catch(error){
        console.log("Error occured while initialising redis");
        throw error;
    }
}


const getValue = async (key)=>{
    try {
        const value = await client.json.get(`user:${key}`)
        await client.expire(key, 30);
        return value;


    } catch (error) {
        console.log("redis get error for ", key)
        throw error
    }
}


const setValue = async (key,value)=>{
    try {
        const data = await client.json.set(`user:${key}`,"$", value);
        return data;
    } catch (error) {
        console.log("Error occured while setting value for key: ", key)
        throw error;
    }
}

export {initRedisClient, getValue, setValue};