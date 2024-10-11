const request = require('supertest')
const http = require('http')

const { app } = require('../index')
const { getAllMovies } = require('../controllers')

jest.mock("../controllers/index.js", () => ({
    ...jest.requireActual("../controllers/index.js"),
    getAllMovies: jest.fn()
}))

let server
beforeAll((done) => {
    server = http.createServer(app)
    server.listen(3001, done)
})

afterAll((done) => {
    server.close(done)
})

describe("Controller Function Tests", () => {
    beforeEach(() => {
        jest.clearAllMocks()
    })

    it("should return all movies", () => {
        const mockMovies = [
            {
                'movieId': 1,
                'title': 'Inception',
                'genre': 'Sci-Fi',
                'director': 'Christopher Nolan'
            },
            {
                'movieId': 2,
                'title': 'The Shawshank Redemption',
                'genre': 'Drama',
                'director': 'Frank Darabont'
            },
            {
                'movieId': 3,
                'title': 'The Godfather',
                'genre': 'Crime',
                'director': 'Francis Ford Coppola'
            }
        ]
        getAllMovies.mockReturnValue(mockMovies)
        const movies = getAllMovies()
        expect(movies).toEqual(mockMovies)
        expect(movies.length).toEqual(3)
    })
})

describe("API Endpoints", () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('GET /movies should get all movies',async () => {
        const mockMovies = [
            {
                'movieId': 1,
                'title': 'Inception',
                'genre': 'Sci-Fi',
                'director': 'Christopher Nolan'
            },
            {
                'movieId': 2,
                'title': 'The Shawshank Redemption',
                'genre': 'Drama',
                'director': 'Frank Darabont'
            },
            {
                'movieId': 3,
                'title': 'The Godfather',
                'genre': 'Crime',
                'director': 'Francis Ford Coppola'
            }
        ]
        const res = await request(server).get('/movies')
        expect(res.statusCode).toBe(200)
        expect(res.body.movies.length).toBe(3)
        expect(res.body.movies).toEqual(mockMovies)
    })

    it('GET /movies/details/:id should get employee with matching movieid', async () => {
        const mockMovie = {
            'movieId': 1,
            'title': 'Inception',
            'genre': 'Sci-Fi',
            'director': 'Christopher Nolan'
        }
        const res = await request(server).get('/movies/details/1')
        expect(res.statusCode).toBe(200)
        expect(res.body.movie).toEqual(mockMovie)
    })
})