const request = require('supertest')
const app = require('../server')

describe('GET /contects', function() {
    it('should return all contacts, when call /contects with method GET.', function() {
        return request(app).get('/contacts')
            // there should be 200 "OK"
            .expect(200)
            .then(function(res) {
                let contacts = res.body
                expect(contacts).toHaveLength(12)
                
                for(let i = 0; i < contacts.length; i++) {
                    expect(contacts[i].id).toBeDefined()
                    expect(contacts[i].name).toBeDefined()
                    expect(contacts[i].email).toBeDefined()
                    expect(contacts[i].phone).toBeDefined()
                    expect(contacts[i].url).toBeDefined()
                    expect(contacts[i].notes).toBeDefined()
                }
            })
    })
})

describe('GET /contects/:id', function() {
    // test case
})

/*

test('GET /contects/:id', function(t) {
    request(app).get('/contacts/id')
        // there should be 200 "OK"
        .expect(200)
        .then(function(res) {
            let contacts = res.body
            t.equal(11, contacts.length, "there should has length is 11, when open /contects/id.")
            t.equal(contacts.id, 2, "id at position 0 should be 11.")
            t.equal(contacts.name, 'Samwell Tarly', "get name at id 2")
            t.equal(contacts.email, 'starly@castleblack.com', "get email at id 2")
            t.equal(contacts.phone, '123-456-7890', "get phone at id 2")
            t.equal(contacts.url, 'www.google.com', "get url at id 2")
            t.equal(contacts.notes, 'Loyal brother of the watch.', "get notes at id 2")
            isField(t, contacts)
            t.end()
        })
})
*/

describe('POST /contacts', function() {
    it('should return contact at position 12, when call /contects/ with method POST and sent new contact.', function() {
        const obj = {
            name: 'thakdanai chanklom',
            email: 'thakdanai@chanklom.com',
            phone: '086-222-5894',
            url: 'www.chanklom.com',
            notes: 'Do not trust anyone'
        }

        return request(app).post('/contacts')
            .send(obj)
            // there should be 201 "Created"
            .expect(201)
            .then((res) => {
                let contact = res.body
                expect(contact.id).toBe(12)
                expect(contact.name).toBe('thakdanai chanklom')
                expect(contact.email).toBe('thakdanai@chanklom.com')
                expect(contact.phone).toBe('086-222-5894')
                expect(contact.url).toBe('www.chanklom.com')
                expect(contact.notes).toBe('Do not trust anyone')

                return request(app).get('/contacts')
                    .then((res) => {
                        let contacts = res.body
                        expect(contacts).toHaveLength(13)
                    })
            })
    })

    it('should return contact at position 13, when call /contects/ with method POST and sent new contact don\'t have phone.', function() {
        const obj = {
            name: 'thakdanai chanklom',
            email: 'thakdanai@chanklom.com',
            url: 'www.chanklom.com',
            notes: 'Do not trust anyone'
        }

        return request(app).post('/contacts')
            .send(obj)
            // there should be 201 "Created"
            .expect(201)
            .then((res) => {
                let contact = res.body
                expect(contact.id).toBe(13)
                expect(contact.name).toBe('thakdanai chanklom')
                expect(contact.email).toBe('thakdanai@chanklom.com')
                expect(contact.url).toBe('www.chanklom.com')
                expect(contact.notes).toBe('Do not trust anyone')
                expect(contact.phone).toBeUndefined()

                return request(app).get('/contacts')
                    .then((res) => {
                        let contacts = res.body
                        expect(contacts).toHaveLength(14)
                    })
            })
    })
})

describe('PUT /contacts/:id', function() {
    it('should update contact at position 0, when call /contects/0 with method PUT and send obj for update.', function() {
        const obj = {
            id: 12,
            name: 'Suphekiat Kiatkanya',
            email: 'suphakiat@gmail.com',
            phone: '082-222-2220',
            url: 'www.douchebag.com',
            notes: 'I don\'t seen anything'
        }
    
        return request(app).put('/contacts/0')
            .send(obj)
            // there should be 200 "OK"
            .expect(200)
            .then(function(response) {
                return request(app).get('/contacts/0')
                    // there should be 200 "OK"
                    .expect(200)
                    .then(function(res) {
                        let contact = res.body
                        expect(contact.id).toBe(12)
                        expect(contact.name).toBe('Suphekiat Kiatkanya')
                        expect(contact.email).toBe('suphakiat@gmail.com')
                        expect(contact.phone).toBe('082-222-2220')
                        expect(contact.url).toBe('www.douchebag.com')
                        expect(contact.notes).toBe('I don\'t seen anything')
                    })
            })
    })

    it('should update contact at position 13, when call /contects/13 with method PUT and send obj for update, but obj don\'t have url and notes.', function() {
        const obj = {
            id: 13,
            name: 'thakdanai chanklom',
            email: 'thakdanai@chanklom.com',
            phone: '086-222-5894'
        }

        return request(app).put('/contacts/13')
        .send(obj)
        // there should be 200 "OK"
        .expect(200)
        .then(function(response) {
            return request(app).get('/contacts/13')
                // there should be 200 "OK"
                .expect(200)
                .then(function(res) {
                    let contact = res.body
                    expect(contact.id).toBe(13)
                    expect(contact.name).toBe('thakdanai chanklom')
                    expect(contact.email).toBe('thakdanai@chanklom.com')
                    expect(contact.phone).toBe('086-222-5894')
                    expect(contact.url).toBeUndefined()
                    expect(contact.notes).toBeUndefined()
                })
        })
    })
})

describe('DELETE /contects/:id', function() {
    // test case
})