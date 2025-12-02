// import supertest from "supertest"
// import { app } from ".."
// import Post from "../models/post.js"

// jest.mock("../models/post.js");


// // describe("Describe block",()=>{
// //     test("test 1",()=>{
// //         expect(true).toBe(true)

// //     }),

// //     test("test 2", ()=>{
// //         expect(true).toBe(true)

// //     })
// // })


// describe("Post API tests",()=>{
//     describe("given the post do not exist",()=>{
//         it("should return 404",async ()=>{
//             const postId = "123"
//             await supertest(app).get(`/post/${postId}`).expect(404);
//         })

//     })
// })



















import supertest from 'supertest';
import { app } from '../app.js';
import Post from '../models/post.js';

jest.mock('../models/post.js'); // mock DB

describe('Post API', () => {
  it('GET /post/:id returns 404 when not found', async () => {
    const postId = '123';
    Post.findById.mockResolvedValue(null);

    const res = await supertest(app).get(`/post/${postId}`);
    expect(res.status).toBe(404);
    expect(res.body).toEqual({
      success: false,
      message: 'Post not found'
    });
  });
});
