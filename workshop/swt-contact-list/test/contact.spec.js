const test = require('tape')
const request = require('supertest')
const should = require('chai').should()
const app = require('../server')

function isField(t, contacts){
    for(let i = 0; i < contacts.length; i++){
        t.true(contacts[i].should.include.keys(["id", "name", "email", "phone", "url", "notes"]),
         "res.body[" + i + "] have all property.") 
    }
}

test('GET /contects', function(t) {
    request(app).get('/contacts')
        // there should be 200 "OK"
        .expect(200)
        .then(function(res) {
            let contacts = res.body
            t.equal(12, contacts.length, "res.body has length is 12, when open /contects.")
            isField(t, contacts)
            t.end()
        })
})
/*
test('GET /contacts/id', () => {
    if ('should respond with a single user', (t) => {
            app.request
                .get('/contact/:id')
                .end((err, res) => {
                    // there should be no errors
                    should.not.exist(err);
                    // there should be a 200 status code
                    res.status.should.equal(200)
                    res.type.should.equal('application/json');
                    res.body.contacts[0].should.include.keys(
                        'id', 'name', 'email', 'url'
                    );
                    done();
                });
        });
});
*/
// test('POST /contacts', (t) => {
//     request(app).post('/contacts')
//         .send({ id: 12, name: 'Petyr Baelish', email: 'petyr@baelishindustries.com', phone: '123-456-7890', url: 'www.google.com', notes: 'Do not trust anyone.' })
//         .expect(200)
//         .then((res) => {
//             let student = res.body

//             t.equal('fluke', student.name)
//             t.end()
//         })
// })

test('PUT /contacts/:id', function(t) {
    const obj = {
        id: 12,
        name: 'Suphekiat Kiatkanya', 
        email: 'suphakiat@localmail.com', 
        phone: '082-222-2220', 
        url: 'www.douchebag.com', 
        notes: 'I don\'t seen anything'
    }
    
    request(app).put('/contacts/0')
        .send(obj)
        // there should be 200 "OK"
        .expect(200)
        .end(function(err, res) {
            if (err) throw err;
        })
        
    request(app).get('/contacts/')
        // there should be 200 "OK"
        .expect(200)
        .then(function(res) {
            let contacts = res.body
            t.equal(12, contacts.length, "there should has length at 12, when update contact.")
            t.equal(12, contacts[0].id, "id at position 0 should be 12.")
            t.equal('Suphekiat Kiatkanya', contacts[0].name, "name at position 0 should be Suphekiat Kiatkanya.")
            t.equal('suphakiat@localmail.com', contacts[0].email, "email at position 0 should be suphakiat@localmail.com.")
            t.equal('082-222-2220', contacts[0].phone, "phone at position 0 should be 082-222-2220.")
            t.equal('www.douchebag.com', contacts[0].url, "url at position 0 should be www.douchebag.com.")
            t.equal('I don\'t seen anything', contacts[0].notes, "notes at position 0 should be 'I don't seen anything'.")
            t.end()
        })
})