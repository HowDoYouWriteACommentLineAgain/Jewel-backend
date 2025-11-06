// wag na ata gamitin, andami lang code for nothing
import assert from 'assert';
import { createProduct, deleteProduct, getProducts } from '../controllers/ProductController.js';

let testId; 
await testCreateProduct();
await testGetProducts();
await testDeleteProduct(testId);

async function testCreateProduct() {
  try {
    const fakeReq = { body: { name: 'Test', price: 1, description: 'This should be deleted after test', image: null } };
    const fakeRes = {
      status: function(code) { this.statusCode = code; return this; },
      json: function(msg) { this.message = msg.message; this.id = msg.id }
    };

    await createProduct(fakeReq, fakeRes);

    assert.strictEqual(fakeRes.statusCode, 201);
    console.log('✅ createProduct test passed');
    testId = fakeRes.id;
  } catch (err) {
    console.error('❌ createProduct test failed:', err.message);
  }
}

async function testGetProducts(){
    try {
        const fakeRes = {
            status: function(code){this.statusCode = code; return this;},
            send: function(msg){this.message = msg}
        };

        await getProducts({/*sic*/}, fakeRes);
        assert.strictEqual(fakeRes.statusCode, 200);
        console.log('✅ getProduct test passed');
    } catch (err) {
        console.error('❌ getProduct test failed:', err.message);
    }
}

async function testDeleteProduct(sampleId) {
  try {
    const fakeReq = { params: {id: sampleId} };
    const fakeRes = {
      status: function(code) { this.statusCode = code; return this; },
      send: function(msg) { this.message = msg; }
    };

    await deleteProduct(fakeReq, fakeRes);

    assert.strictEqual(fakeRes.statusCode, 200);
    console.log('✅ deleteProduct test passed');
  } catch (err) {
    console.error('❌ deleteProduct test failed:', err.message);
  }
}

