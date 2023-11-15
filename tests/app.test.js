import app from "../src/app";
import request from "supertest";
describe('GET /tasks', () => {
    test('should respond whith a 200 status code', async () => {
        const response = await request(app).get('/tasks').send()
        expect(response.statusCode).toBe(200)
    })


    test("should respond with an array", async () => {
        const response = await request(app).get('/tasks').send()
        expect(response.body).toBeInstanceOf(Array)
    })
})



describe('Post /tasks', () => {
    describe("given a title and description", () => {
        const newTask = {
            title: "Test Task",
            description: "Test Description jejej"
        }
        test('should respond whith a 200 status code', async () => {
            const response = await request(app).post('/tasks').send(newTask)
            expect(response.statusCode).toBe(200)
        })


        test('should have a content-type: aplication/json in header', async () => {
            const response = await request(app).post("/tasks").send(newTask);
            expect(response.header['content-type']).toEqual(
                expect.stringContaining("json")
            )
        })

        test('should respond with an task ID', async () => {
            const response = await request(app).post('/tasks').send(newTask)
            expect(response.body.id).toBeDefined()
        })
    })

    describe('when  title and  description is missing', () => {
        test("should response whit a 400 status code", async () => {
            const fields = [
                {},
                { title: "Rest title" },
                { descrption: "test" }
            ]

            for (const body of fields) {
                const response = await request(app).post('/tasks').send(body)
                expect(response.statusCode).toBe(400)
            }
        })
    })
})