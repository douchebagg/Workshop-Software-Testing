const request = require('supertest')
const app = require('../server')

describe('GET /contacts', function() {
    it('should return all contacts, when call /contacts with method GET.', function() {
        return request(app).get('/contacts')
            // there should be 200 "OK"
            .expect(200)
            .then(function(res) {
                let contacts = res.body
                expect(contacts).toHaveLength(12)
                
                for(let i = 0; i < contacts.length; i++) {
                    expect(contacts[i]).toHaveProperty('id')
                    expect(contacts[i]).toHaveProperty('name')
                    expect(contacts[i]).toHaveProperty('email')
                    expect(contacts[i]).toHaveProperty('phone')
                    expect(contacts[i]).toHaveProperty('url')
                    expect(contacts[i]).toHaveProperty('notes')
                }
            })
    })
})

describe('GET /contacts/:id', function() {
    it('should return contact at position 0, when call /contacts/0 with method GET.', () => {
        return request(app).get('/contacts/0')
        .expect(200)
        .then((res) => {
            let contact = res.body
            expect(contact).toHaveProperty('id')
            expect(contact).toHaveProperty('name')
            expect(contact).toHaveProperty('email')
            expect(contact).toHaveProperty('phone')
            expect(contact).toHaveProperty('url')
            expect(contact).toHaveProperty('notes')
            expect(contact.id).toBe(0)
            expect(contact.name).toBe('Ned Stark')
            expect(contact.email).toBe('ned@winterfell.com')
            expect(contact.phone).toBe('123-456-7890')
            expect(contact.url).toBe('www.google.com')
            expect(contact.notes).toBe('Winter is coming.')
             
        })
    })

    it('should return contact at position 1, when call /contacts/1 with method GET.', ()=>{
        return request(app).get('/contacts/1')
        .expect(200)
        .then((res) => {
            let contact = res.body
            expect(contact).toHaveProperty('id')
            expect(contact).toHaveProperty('name')
            expect(contact).toHaveProperty('email')
            expect(contact).toHaveProperty('phone')
            expect(contact).toHaveProperty('url')
            expect(contact).toHaveProperty('notes')
            expect(contact.id).toBe(1)
            expect(contact.name).toBe('Theon Greyjoy')
            expect(contact.email).toBe('tgreyjoy@winterfell.com')
            expect(contact.phone).toBe('123-456-7890')
            expect(contact.url).toBe('www.google.com')
            expect(contact.notes).toBe('Reluctant to pay iron price.')
        })
    })
})

describe('POST /contacts', function() {
    it('should return contact at position 12, when call /contacts with method POST and sent new contact.', function() {
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
                expect(contact).toHaveProperty('id')
                expect(contact).toHaveProperty('name')
                expect(contact).toHaveProperty('email')
                expect(contact).toHaveProperty('phone')
                expect(contact).toHaveProperty('url')
                expect(contact).toHaveProperty('notes')

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

    it('should return contact at position 13, when call /contacts with method POST and sent new contact, but there contact don\'t have phone.', function() {
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
                expect(contact).toHaveProperty('id')
                expect(contact).toHaveProperty('name')
                expect(contact).toHaveProperty('email')
                expect(contact).toHaveProperty('url')
                expect(contact).toHaveProperty('notes')
                expect(contact).not.toHaveProperty('phone')

                expect(contact.id).toBe(13)
                expect(contact.name).toBe('thakdanai chanklom')
                expect(contact.email).toBe('thakdanai@chanklom.com')
                expect(contact.url).toBe('www.chanklom.com')
                expect(contact.notes).toBe('Do not trust anyone')

                return request(app).get('/contacts')
                    .then((res) => {
                        let contacts = res.body
                        expect(contacts).toHaveLength(14)
                    })
            })
    })
})

describe('PUT /contacts/:id', function() {
    it('should update contact at position 0, when call /contacts/0 with method PUT and send obj for update.', function() {
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
                        expect(contact).toHaveProperty('id')
                        expect(contact).toHaveProperty('name')
                        expect(contact).toHaveProperty('email')
                        expect(contact).toHaveProperty('phone')
                        expect(contact).toHaveProperty('url')
                        expect(contact).toHaveProperty('notes')

                        expect(contact.id).toBe(12)
                        expect(contact.name).toBe('Suphekiat Kiatkanya')
                        expect(contact.email).toBe('suphakiat@gmail.com')
                        expect(contact.phone).toBe('082-222-2220')
                        expect(contact.url).toBe('www.douchebag.com')
                        expect(contact.notes).toBe('I don\'t seen anything')
                    })
            })
    })

    it('should update contact at position 13, when call /contacts/13 with method PUT and send obj for update, but obj don\'t have url and notes.', function() {
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
                    expect(contact).toHaveProperty('id')
                    expect(contact).toHaveProperty('name')
                    expect(contact).toHaveProperty('email')
                    expect(contact).toHaveProperty('phone')
                    expect(contact).not.toHaveProperty('url')
                    expect(contact).not.toHaveProperty('notes')

                    expect(contact.id).toBe(13)
                    expect(contact.name).toBe('thakdanai chanklom')
                    expect(contact.email).toBe('thakdanai@chanklom.com')
                    expect(contact.phone).toBe('086-222-5894')
                })
        })
    })
})

describe('DELETE /contacts/:id', function() {
    it('should delete contact position 0, when call /contacts/0 with method DELETE.',()=>{
        return request(app).delete('/contacts/0')
        .expect(204)
        .then((response) => {
            return request(app).get('/contacts')
            .expect(200)
            .then((res) =>{
                let contacts = res.body
                
                expect(contacts).toHaveLength(13)
                expect(contacts[0]).toHaveProperty('id')
                expect(contacts[0]).toHaveProperty('name')
                expect(contacts[0]).toHaveProperty('email')
                expect(contacts[0]).toHaveProperty('phone')
                expect(contacts[0]).toHaveProperty('url')
                expect(contacts[0]).toHaveProperty('notes')
                expect(contacts[0].id).toBe(1)
                expect(contacts[0].name).toBe('Theon Greyjoy')
                expect(contacts[0].email).toBe('tgreyjoy@winterfell.com')
                expect(contacts[0].phone).toBe('123-456-7890')
                expect(contacts[0].url).toBe('www.google.com')
                expect(contacts[0].notes).toBe('Reluctant to pay iron price.')
            })
        })
    })
    it('should delete contact position 1, when call /contacts/1 with method DELETE.', () => {
        return request(app).delete('/contacts/1')
        .expect(204)
        .then((response) => {
            return request(app).get('/contacts')
            .expect(200)
            .then((res) => {
                let contacts = res.body
                expect(contacts).toHaveLength(12)
                expect(contacts[1]).toHaveProperty('id')
                expect(contacts[1]).toHaveProperty('name')
                expect(contacts[1]).toHaveProperty('email')
                expect(contacts[1]).toHaveProperty('phone')
                expect(contacts[1]).toHaveProperty('url')
                expect(contacts[1]).toHaveProperty('notes')
                expect(contacts[1].id).toBe(3)
                expect(contacts[1].name).toBe('Jon Snow')
                expect(contacts[1].email).toBe('jsnow@castleblack.com')
                expect(contacts[1].phone).toBe('123-456-7890')
                expect(contacts[1].url).toBe('www.google.com')
                expect(contacts[1].notes).toBe('Knows nothing.')

            })
        })
        
        
    })
})