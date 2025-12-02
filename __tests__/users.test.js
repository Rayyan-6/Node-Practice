import supertest from "supertest"
import { app } from ".."

// describe("Describe block",()=>{
//     test("test 1",()=>{
//         expect(true).toBe(true)

//     }),

//     test("test 2", ()=>{
//         expect(true).toBe(true)

//     })
// })


describe("Post API tests",()=>{
    describe("given the post do not exist",()=>{
        it("should return 404",async ()=>{
            const post = "123"
            await supertest(app).get(`/post/${productId}`).expect(404);
        })

    })
})