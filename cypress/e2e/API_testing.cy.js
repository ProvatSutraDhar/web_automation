
describe('Single User API', () => {
    it('should retrieve a single user by ID', () => {
      cy.request('GET', 'https://reqres.in/api/users/1')
        .should((response) => {
          expect(response.status).to.eq(200);
          expect(response.body).to.have.property('data').and.to.be.an('object');
          expect(response.body.data).to.have.property('id').and.to.eq(1);
        });
    });
  });
describe('API CRUD Tests', () => {
    it('Create - POST', () => {
      cy.request({
        method: 'POST',
        url: 'https://reqres.in/api/users',
        body: {
          name: 'Provat Sutradhar',
          job: 'Web Automation Tester'
        }
      }).then((response) => {
        expect(response.status).to.eq(201); // Check response status code is 201 (Created)
        expect(response.body.name).to.eq('Provat Sutradhar'); // Check response contains the expected data
      });
    });
  
    it('Read - GET', () => {
      cy.request('GET', 'https://reqres.in/api/users/2').then((response) => {
        expect(response.status).to.eq(200); // Check the response status
        expect(response.body.data.id).to.eq(2); // Check  response contains given data
      });
    });
  
    it('Update - PUT', () => {
      cy.request({
        method: 'PUT',
        url: 'https://reqres.in/api/users/2',
        body: {
          name: 'Provat Sutradhar(updated)',
          job: 'Web API Tester'
        }
      }).then((response) => {
        expect(response.status).to.eq(200); // Check if the response status code is 200 (OK)
        expect(response.body.name).to.eq('Provat Sutradhar(updated)'); // Check response for expected updated data
        expect(response.body.job).to.eq('Web API Tester')
    });
    });
  
    it('Delete - DELETE', () => {
      cy.request('DELETE', 'https://reqres.in/api/users/2').then((response) => {
        expect(response.status).to.eq(204); // Check response status code is 204 (No Content)
      });
    });
  });