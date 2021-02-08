/* eslint-disable no-underscore-dangle */
/* eslint-disable jest/valid-expect-in-promise */
/* eslint-disable jest/expect-expect */
import supertest from 'supertest';
import expres from 'express';
import server from '../../../src/app';

let app: expres.Application;
let request: supertest.SuperTest<supertest.Test>;
const baseUri = '/api/user';

beforeAll(() => {
  app = server.app;
  request = supertest(app);
});

// list
it('should get list users', async () => {
  const response = await request.get(baseUri);
  expect(response.status).toBe(200);
  expect(response.body).toBeInstanceOf(Array);
});

// save
// describe('should save user', () => {
//   it('should authenticate', async () => {
//     const username = 'user saved with unit tes';
//     const email = `test@${Math.random().toString(5)}.com`;
//     const oaid = Math.random().toString(32)

//     const response = await request.post(baseUri)
//       .send({ username, email, oaid })
//       .set('Accept', 'application/json');
//     expect(response.status).toBe(200);
//     expect(response.body.username).toBeDefined();
//     expect(response.body.username).toEqual(username);

//     // remove a user saved
//     const responseRemove = await request.delete(`${baseUri}/${response.body._id}`);
//     expect(responseRemove.status).toBe(200);
//     expect(responseRemove.body.username).toBeDefined();
//   });

//   it('should fail save without username with 400 status', async () => {
//     const response = await request.post(baseUri)
//       .set('Accept', 'application/json');
//     expect(response.status).toBe(400);
//     expect(response.body.username).toBeUndefined();
//   });
// });

// get by id
describe('should get user by id', () => {
  it('should response with 200 status', async () => {
    const id = '6020287d9fdf5e756921a923'; // verify that this id exist in your database
    const response = await request.get(`${baseUri}/${id}`);
    expect(response.status).toBe(200);
  });

  it('should response with 404 status', async () => {
    const id = '5fe0287346956c638f701222';
    const response = await request.get(`${baseUri}/${id}`);
    expect(response.status).toBe(404);
    expect(response.body.username).toBeUndefined();
  });
});

// update
describe('should update a user', () => {
  it('should update with 200 status', async () => {
    const id: string = '6020287d9fdf5e756921a923'; // verify that this id exist in your database
    const user = { 
      username: 'user update with test', 
      email: `test@${Math.random().toString(5)}.com`,
      oaid: Math.random().toString(30)
    };
    
    const response = await request.put(`${baseUri}/${id}`)
      .send(user);
    expect(response.status).toBe(200);
    expect(response.body.username).toEqual(user.username);
  });

  it('should fail with 404 status', async () => {
    const id = '5fe0287346956c638f701bd2';
    const response = await request.put(`${baseUri}/${id}`)
      .send({ username: 'user update with test', email: `test@${Math.random().toString(5)}.com`});
    expect(response.status).toBe(404);
    expect(response.body.username).toBeUndefined();
  });
});

// remove
describe('should remove a user', () => {
  it('should fail with 404 status', async () => {
    const id = '5fe0287346956c638f701bd2';
    const response = await request.delete(`${baseUri}/${id}`);
    expect(response.status).toBe(404);
    expect(response.body.username).toBeUndefined();
  });
});
