/*
*
*
*       FILL IN EACH FUNCTIONAL TEST BELOW COMPLETELY
*       -----[Keep the tests in the same order!]-----
*       (if additional are added, keep them at the very end!)
*/

var chaiHttp = require('chai-http');
var chai = require('chai');
var assert = chai.assert;
var server = require('../server');

chai.use(chaiHttp);

suite('Functional Tests', function() {
  
    let idToDelete;
  
    suite('POST /api/issues/{project} => object with issue data', function() {
      
      test('Every field filled in', function(done) {
       chai.request(server)
        .post('/api/issues/apitest')
        .send({
          issue_title: 'Title',
          issue_text: 'text',
          created_by: 'Functional Test - Every field filled in',
          assigned_to: 'Chai and Mocha',
          status_text: 'In QA'
        })
        .end(function(err, res){
         
          if(err){
            return done(err);
          }
         
          idToDelete = res.body._id;
         
          assert.equal(res.status, 200);
          assert.equal(res.body.issue_title, "Title");
          assert.equal(res.body.issue_text, "text");
          assert.equal(res.body.created_by, "Functional Test - Every field filled in");
          assert.equal(res.body.assigned_to, "Chai and Mocha");
          assert.equal(res.body.status_text, "In QA");
          assert.equal(res.body.open, true);
          done();
        });
      });
      
      test('Required fields filled in', function(done) {
        chai.request(server)
          .post("/api/issues/apitest")
          .send({
            issue_title: 'Title',
            issue_text: 'text',
            created_by: 'Functional Test - Every field filled in',
          })
          .end(function(err, res){
          
            if(err){
              return done(err);
            }
          
            assert.equal(res.status, 200);
            assert.property(res.body, "issue_title");
            assert.property(res.body, "issue_text");
            assert.property(res.body, "created_by");
            assert.property(res.body, "open");
            done();
          });
      });
      
      test('Missing required fields', function(done) {
        chai.request(server)
        .post("/api/issues/apitest")
        .send({

        })
        .end(function(err, res){
          
          if(err){
            return done(err);
          }
          assert.equal(res.status, 200);
          assert.notProperty(res.body, "issue_title");
          assert.notProperty(res.body, "issue_text");
          assert.notProperty(res.body, "created_by");
          done();
        });
      });
      
    });
    
    suite('PUT /api/issues/{project} => text', function() {
      
      test('No body', function(done) {
        chai.request(server)
        .put("/api/issues/apitest")
        .send({

        })
        .end(function(err, res){
          
          if(err){
            return done(err);
          }
          assert.equal(res.status, 200);
          assert.isEmpty(res.body);
          done();
        });
      });
      
      test('One field to update', function(done) {
        chai.request(server)
        .put("/api/issues/apitest")
        .send({
          _id: "5f389a1aa6f2c93b2ca0fc87",
          issue_title : "New title"
        })
        .end(function(err, res){
          
          if(err){
            return done(err);
          }
          assert.equal(res.status, 200);
          assert.equal(res.text, "successfully updated");
          done();
        });
      });
      
      test('Multiple fields to update', function(done) {
        chai.request(server)
        .put("/api/issues/apitest")
        .send({
          _id: "5f3996060150180140ce0879",
          issue_title : "New title2",
          issue_text: "New text2"
        })
        .end(function(err, res){
          
          if(err){
            return done(err);
          }
          assert.equal(res.status, 200);
          assert.equal(res.text, "successfully updated");
          done();
        });
      });
      
    });
    
    suite('GET /api/issues/{project} => Array of objects with issue data', function() {
      
      test('No filter', function(done) {
        chai.request(server)
        .get('/api/issues/test')
        .query({})
        .end(function(err, res){
          
          if(err){
            return done(err);
          }
          assert.equal(res.status, 200);
          assert.isArray(res.body);
          assert.property(res.body[0], 'issue_title');
          assert.property(res.body[0], 'issue_text');
          assert.property(res.body[0], 'created_on');
          assert.property(res.body[0], 'updated_on');
          assert.property(res.body[0], 'created_by');
          assert.property(res.body[0], 'assigned_to');
          assert.property(res.body[0], 'open');
          assert.property(res.body[0], 'status_text');
          assert.property(res.body[0], '_id');
          done();
        });
      });
      
      test('One filter', function(done) {
        chai.request(server)
        .get('/api/issues/test')
        .query({_id:"5f389a1aa6f2c93b2ca0fc87"})
        .end(function(err, res){
          
          if(err){
            return done(err);
          }
          assert.equal(res.status, 200);
          assert.isArray(res.body);
          assert.property(res.body[0], 'issue_title');
          assert.property(res.body[0], 'issue_text');
          assert.property(res.body[0], 'created_on');
          assert.property(res.body[0], 'updated_on');
          assert.property(res.body[0], 'created_by');
          assert.property(res.body[0], 'assigned_to');
          assert.property(res.body[0], 'open');
          assert.property(res.body[0], 'status_text');
          assert.property(res.body[0], '_id');
          
                    
          assert.equal(res.body[0].issue_title, "New title")
          assert.equal(res.body[0].issue_text, "what")
          assert.equal(res.body[0].created_on, "2020-08-16T02:29:46.538Z")
          assert.equal(res.body[0].created_by, "phuang")
          assert.equal(res.body[0].assigned_to, "wa")
          assert.equal(res.body[0].open, true)
          assert.equal(res.body[0].status_text, "wa")
          assert.equal(res.body[0]._id, "5f389a1aa6f2c93b2ca0fc87")
          done();
        });        
      });
      
      test('Multiple filters (test for multiple fields you know will be in the db for a return)', function(done) {
          chai.request(server)
        .get('/api/issues/test')
        .query({created_by:"phuang",assigned_to:"ok"})
        .end(function(err, res){
          if(err){
            return done(err);
          }
          assert.equal(res.status, 200);
          assert.isArray(res.body);
            
          for(let i = 0;i < res.body.length; i++){
            assert.property(res.body[i], 'issue_title');
            assert.property(res.body[i], 'issue_text');
            assert.property(res.body[i], 'created_on');
            assert.property(res.body[i], 'updated_on');
            assert.property(res.body[i], 'created_by');
            assert.property(res.body[i], 'assigned_to');
            assert.property(res.body[i], 'open');
            assert.property(res.body[i], 'status_text');
            assert.property(res.body[i], '_id'); 
          }
       
          assert.equal(res.body[0].issue_title, "ok")
          assert.equal(res.body[0].issue_text, "ok")
          assert.equal(res.body[0].created_on, "2020-08-16T23:26:38.887Z")
          assert.equal(res.body[0].updated_on, "2020-08-16T23:26:38.887Z")
          assert.equal(res.body[0].created_by, "phuang")
          assert.equal(res.body[0].assigned_to, "ok")
          assert.equal(res.body[0].open, true)
          assert.equal(res.body[0].status_text, "ok")
          assert.equal(res.body[0]._id, "5f39c0ae21b5fc42273a17b3")

                    
          assert.equal(res.body[1].issue_title, "ok3")
          assert.equal(res.body[1].issue_text, "ok3")
          assert.equal(res.body[1].created_on, "2020-08-16T23:28:54.318Z")
          assert.equal(res.body[1].updated_on, "2020-08-16T23:28:54.318Z")
          assert.equal(res.body[1].created_by, "phuang")
          assert.equal(res.body[1].assigned_to, "ok")
          assert.equal(res.body[1].open, true)
          assert.equal(res.body[1].status_text, "ok3")
          assert.equal(res.body[1]._id, "5f39c13621b5fc42273a17b5")  
          done();
        });       
      });
      
    });

    suite('DELETE /api/issues/{project} => text', function() {
   
      test('No _id', function(done) {
        chai.request(server)
        .delete("/api/issues/apitest")
        .query({
    
        })
        .end(function(err, res){
        
          if(err){
            return done(err);
          }
          assert.equal(res.status, 200);
          assert.equal(res.body, "_id error");
          done();
        });        
      });
      

      test('Valid _id', function(done) {
        
        chai.request(server)
        .delete("/api/issues/apitest")
        .send({
          _id: idToDelete
        })
        .end(function(err, res){
          if(err){
            return done(err);
          }
         
          assert.equal(res.status, 200);
          assert.equal(res.body, "deleted " + idToDelete);
          done();
        });  

      });
 
    });

});
