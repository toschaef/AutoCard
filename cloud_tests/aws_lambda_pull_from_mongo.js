// aws_lambda_pull_from_mongo.js
// Complete test suite for the Lambda function
// Run: node aws_lambda_pull_from_mongo.js

import { LambdaClient, InvokeCommand } from '@aws-sdk/client-lambda';
import { MongoClient, ObjectId } from 'mongodb';
import 'dotenv/config';

const lambdaClient = new LambdaClient({ region: 'us-east-2' });
const mongoClient = new MongoClient(process.env.MONGODB_URI);

const FUNCTION_NAME = 'flashcard-agent-mongodb-actions';
const TEST_USER_ID = 'test-user-' + Date.now();

let testMaterialId;
let testResults = [];

// Helper to invoke Lambda
async function invokeLambda(payload) {
  const command = new InvokeCommand({
    FunctionName: FUNCTION_NAME,
    Payload: JSON.stringify(payload)
  });
  
  const response = await lambdaClient.send(command);
  const result = JSON.parse(new TextDecoder().decode(response.Payload));
  
  return result;
}

// Helper to log test results
function logTest(name, passed, details = '') {
  const status = passed ? '✅ PASS' : '❌ FAIL';
  console.log(`${status}: ${name}`);
  if (details) console.log(`   ${details}`);
  testResults.push({ name, passed, details });
}

// Test 1: Setup - Insert test data into MongoDB
async function setupTestData() {
  console.log('\n📦 Setting up test data in MongoDB...\n');
  
  try {
    await mongoClient.connect();
    const db = mongoClient.db('kahoot_flashcards');
    
    // Insert test study materials
    const materials = [
      {
        userId: TEST_USER_ID,
        title: 'Biology Chapter 1',
        content: 'Photosynthesis is the process by which plants convert light energy into chemical energy. Chloroplasts contain chlorophyll which captures light energy.',
        topic: 'biology',
        contentType: 'text',
        embedding: [],
        createdAt: new Date()
      },
      {
        userId: TEST_USER_ID,
        title: 'Chemistry Basics',
        content: 'An atom consists of protons, neutrons, and electrons. The periodic table organizes elements by atomic number.',
        topic: 'chemistry',
        contentType: 'text',
        embedding: [],
        createdAt: new Date()
      },
      {
        userId: 'other-user-123',
        title: 'Math Notes',
        content: 'Quadratic formula: x = (-b ± √(b²-4ac)) / 2a',
        topic: 'math',
        contentType: 'text',
        embedding: [],
        createdAt: new Date()
      }
    ];
    
    const result = await db.collection('study_materials').insertMany(materials);
    testMaterialId = Object.values(result.insertedIds)[0].toString();
    
    console.log(`✅ Inserted ${materials.length} test study materials`);
    console.log(`   Test Material ID: ${testMaterialId}`);
    console.log(`   Test User ID: ${TEST_USER_ID}\n`);
    
    return true;
  } catch (error) {
    console.error('❌ Failed to setup test data:', error);
    return false;
  }
}

// Test 2: getUserStudyMaterials - Valid user
async function testGetUserStudyMaterials() {
  console.log('Test 2: getUserStudyMaterials (valid user)');
  
  try {
    const payload = {
      actionGroup: 'test',
      apiPath: '/getUserStudyMaterials',
      httpMethod: 'POST',
      requestBody: {
        content: {
          'application/json': {
            body: JSON.stringify({ userId: TEST_USER_ID })
          }
        }
      },
      parameters: []
    };
    
    const result = await invokeLambda(payload);
    const responseBody = JSON.parse(result.response.responseBody['application/json'].body);
    
    const passed = responseBody.success === true && 
                   responseBody.materials.length === 2 &&
                   responseBody.materials[0].title;
    
    logTest(
      'getUserStudyMaterials returns materials for valid user',
      passed,
      `Found ${responseBody.materials?.length || 0} materials`
    );
    
    return passed;
  } catch (error) {
    logTest('getUserStudyMaterials returns materials for valid user', false, error.message);
    return false;
  }
}

// Test 3: getUserStudyMaterials - User with no materials
async function testGetUserStudyMaterialsEmpty() {
  console.log('Test 3: getUserStudyMaterials (user with no materials)');
  
  try {
    const payload = {
      actionGroup: 'test',
      apiPath: '/getUserStudyMaterials',
      httpMethod: 'POST',
      requestBody: {
        content: {
          'application/json': {
            body: JSON.stringify({ userId: 'nonexistent-user' })
          }
        }
      },
      parameters: []
    };
    
    const result = await invokeLambda(payload);
    const responseBody = JSON.parse(result.response.responseBody['application/json'].body);
    
    const passed = responseBody.success === true && 
                   responseBody.materials.length === 0;
    
    logTest(
      'getUserStudyMaterials returns empty array for user with no materials',
      passed,
      `Found ${responseBody.materials?.length || 0} materials`
    );
    
    return passed;
  } catch (error) {
    logTest('getUserStudyMaterials returns empty array for user with no materials', false, error.message);
    return false;
  }
}

// Test 4: getStudyMaterial - Valid ID
async function testGetStudyMaterial() {
  console.log('Test 4: getStudyMaterial (valid ID)');
  
  try {
    const payload = {
      actionGroup: 'test',
      apiPath: '/getStudyMaterial',
      httpMethod: 'POST',
      requestBody: {
        content: {
          'application/json': {
            body: JSON.stringify({ materialId: testMaterialId })
          }
        }
      },
      parameters: []
    };
    
    const result = await invokeLambda(payload);
    const responseBody = JSON.parse(result.response.responseBody['application/json'].body);
    
    const passed = responseBody.success === true && 
                   responseBody.content && 
                   responseBody.title === 'Biology Chapter 1';
    
    logTest(
      'getStudyMaterial retrieves correct material',
      passed,
      `Title: ${responseBody.title || 'N/A'}`
    );
    
    return passed;
  } catch (error) {
    logTest('getStudyMaterial retrieves correct material', false, error.message);
    return false;
  }
}

// Test 5: getStudyMaterial - Invalid ID
async function testGetStudyMaterialInvalid() {
  console.log('Test 5: getStudyMaterial (invalid ID)');
  
  try {
    const payload = {
      actionGroup: 'test',
      apiPath: '/getStudyMaterial',
      httpMethod: 'POST',
      requestBody: {
        content: {
          'application/json': {
            body: JSON.stringify({ materialId: new ObjectId().toString() })
          }
        }
      },
      parameters: []
    };
    
    const result = await invokeLambda(payload);
    const responseBody = JSON.parse(result.response.responseBody['application/json'].body);
    
    const passed = responseBody.success === false && 
                   responseBody.message.includes('not found');
    
    logTest(
      'getStudyMaterial handles invalid ID gracefully',
      passed,
      responseBody.message
    );
    
    return passed;
  } catch (error) {
    logTest('getStudyMaterial handles invalid ID gracefully', false, error.message);
    return false;
  }
}

// Test 6: saveFlashcards - Valid data
async function testSaveFlashcards() {
  console.log('Test 6: saveFlashcards (valid data)');
  
  try {
    const flashcards = [
      {
        question: 'What is photosynthesis?',
        answer: 'The process by which plants convert light energy into chemical energy',
        difficulty: 'easy'
      },
      {
        question: 'Where does photosynthesis occur?',
        answer: 'In chloroplasts',
        difficulty: 'medium'
      },
      {
        question: 'What pigment captures light energy?',
        answer: 'Chlorophyll',
        difficulty: 'easy'
      }
    ];
    
    const payload = {
      actionGroup: 'test',
      apiPath: '/saveFlashcards',
      httpMethod: 'POST',
      requestBody: {
        content: {
          'application/json': {
            body: JSON.stringify({
              userId: TEST_USER_ID,
              flashcards: JSON.stringify(flashcards),
              topic: 'biology',
              materialId: testMaterialId
            })
          }
        }
      },
      parameters: []
    };
    
    const result = await invokeLambda(payload);
    const responseBody = JSON.parse(result.response.responseBody['application/json'].body);
    
    const passed = responseBody.success === true && 
                   responseBody.count === 3 &&
                   responseBody.flashcardIds.length === 3;
    
    logTest(
      'saveFlashcards saves all flashcards correctly',
      passed,
      `Saved ${responseBody.count || 0} flashcards`
    );
    
    return passed;
  } catch (error) {
    logTest('saveFlashcards saves all flashcards correctly', false, error.message);
    return false;
  }
}

// Test 7: saveFlashcards - Array format (not stringified)
async function testSaveFlashcardsArray() {
  console.log('Test 7: saveFlashcards (array format)');
  
  try {
    const flashcards = [
      {
        question: 'Test question 1?',
        answer: 'Test answer 1'
      }
    ];
    
    const payload = {
      actionGroup: 'test',
      apiPath: '/saveFlashcards',
      httpMethod: 'POST',
      requestBody: {
        content: {
          'application/json': {
            body: JSON.stringify({
              userId: TEST_USER_ID,
              flashcards: flashcards, // Not stringified
              topic: 'test'
            })
          }
        }
      },
      parameters: []
    };
    
    const result = await invokeLambda(payload);
    const responseBody = JSON.parse(result.response.responseBody['application/json'].body);
    
    const passed = responseBody.success === true && responseBody.count === 1;
    
    logTest(
      'saveFlashcards handles array format (not stringified)',
      passed,
      `Saved ${responseBody.count || 0} flashcards`
    );
    
    return passed;
  } catch (error) {
    logTest('saveFlashcards handles array format (not stringified)', false, error.message);
    return false;
  }
}

// Test 8: saveFlashcards - Using parameters instead of body
async function testSaveFlashcardsParameters() {
  console.log('Test 8: saveFlashcards (using parameters)');
  
  try {
    const flashcards = [
      {
        question: 'Parameter test question?',
        answer: 'Parameter test answer'
      }
    ];
    
    const payload = {
      actionGroup: 'test',
      apiPath: '/saveFlashcards',
      httpMethod: 'POST',
      parameters: [
        { name: 'userId', value: TEST_USER_ID },
        { name: 'flashcards', value: JSON.stringify(flashcards) },
        { name: 'topic', value: 'test' }
      ],
      requestBody: {
        content: {}
      }
    };
    
    const result = await invokeLambda(payload);
    const responseBody = JSON.parse(result.response.responseBody['application/json'].body);
    
    const passed = responseBody.success === true && responseBody.count === 1;
    
    logTest(
      'saveFlashcards works with parameters instead of body',
      passed,
      `Saved ${responseBody.count || 0} flashcards`
    );
    
    return passed;
  } catch (error) {
    logTest('saveFlashcards works with parameters instead of body', false, error.message);
    return false;
  }
}

// Test 9: Unknown API path
async function testUnknownApiPath() {
  console.log('Test 9: Unknown API path');
  
  try {
    const payload = {
      actionGroup: 'test',
      apiPath: '/unknownEndpoint',
      httpMethod: 'POST',
      requestBody: {
        content: {
          'application/json': {
            body: '{}'
          }
        }
      },
      parameters: []
    };
    
    const result = await invokeLambda(payload);
    const responseBody = JSON.parse(result.response.responseBody['application/json'].body);
    
    const passed = responseBody.success === false && 
                   responseBody.message.includes('Unknown');
    
    logTest(
      'Lambda handles unknown API paths gracefully',
      passed,
      responseBody.message
    );
    
    return passed;
  } catch (error) {
    logTest('Lambda handles unknown API paths gracefully', false, error.message);
    return false;
  }
}

// Test 10: Verify MongoDB data integrity
async function testMongoDBIntegrity() {
  console.log('Test 10: MongoDB data integrity');
  
  try {
    const db = mongoClient.db('kahoot_flashcards');
    
    // Check flashcards were saved correctly
    const flashcards = await db.collection('flashcards')
      .find({ userId: TEST_USER_ID })
      .toArray();
    
    const allHaveRequiredFields = flashcards.every(card => 
      card.userId && 
      card.question && 
      card.answer && 
      card.topic && 
      card.createdAt &&
      Array.isArray(card.embedding)
    );
    
    const passed = flashcards.length >= 5 && allHaveRequiredFields;
    
    logTest(
      'MongoDB contains correctly formatted flashcards',
      passed,
      `Found ${flashcards.length} flashcards, all fields valid: ${allHaveRequiredFields}`
    );
    
    return passed;
  } catch (error) {
    logTest('MongoDB contains correctly formatted flashcards', false, error.message);
    return false;
  }
}

// Test 11: Response format validation
async function testResponseFormat() {
  console.log('Test 11: Response format validation');
  
  try {
    const payload = {
      actionGroup: 'testGroup',
      apiPath: '/getUserStudyMaterials',
      httpMethod: 'POST',
      requestBody: {
        content: {
          'application/json': {
            body: JSON.stringify({ userId: TEST_USER_ID })
          }
        }
      },
      parameters: []
    };
    
    const result = await invokeLambda(payload);
    
    // Validate Bedrock Agent response format
    const hasCorrectFormat = 
      result.messageVersion === '1.0' &&
      result.response &&
      result.response.actionGroup === 'testGroup' &&
      result.response.apiPath === '/getUserStudyMaterials' &&
      result.response.httpStatusCode === 200 &&
      result.response.responseBody &&
      result.response.responseBody['application/json'];
    
    logTest(
      'Lambda returns correct Bedrock Agent response format',
      hasCorrectFormat,
      `Format valid: ${hasCorrectFormat}`
    );
    
    return hasCorrectFormat;
  } catch (error) {
    logTest('Lambda returns correct Bedrock Agent response format', false, error.message);
    return false;
  }
}

// Test 12: Concurrent requests (stress test)
async function testConcurrentRequests() {
  console.log('Test 12: Concurrent requests (stress test)');
  
  try {
    const promises = [];
    
    // Fire 5 concurrent requests
    for (let i = 0; i < 5; i++) {
      const payload = {
        actionGroup: 'test',
        apiPath: '/getUserStudyMaterials',
        httpMethod: 'POST',
        requestBody: {
          content: {
            'application/json': {
              body: JSON.stringify({ userId: TEST_USER_ID })
            }
          }
        },
        parameters: []
      };
      
      promises.push(invokeLambda(payload));
    }
    
    const results = await Promise.all(promises);
    const allSucceeded = results.every(result => {
      const body = JSON.parse(result.response.responseBody['application/json'].body);
      return body.success === true;
    });
    
    logTest(
      'Lambda handles concurrent requests correctly',
      allSucceeded,
      `${results.length} concurrent requests all succeeded: ${allSucceeded}`
    );
    
    return allSucceeded;
  } catch (error) {
    logTest('Lambda handles concurrent requests correctly', false, error.message);
    return false;
  }
}

// Cleanup test data
async function cleanup() {
  console.log('\n🧹 Cleaning up test data...\n');
  
  try {
    const db = mongoClient.db('kahoot_flashcards');
    
    await db.collection('study_materials').deleteMany({ userId: TEST_USER_ID });
    await db.collection('flashcards').deleteMany({ userId: TEST_USER_ID });
    
    console.log('✅ Test data cleaned up');
  } catch (error) {
    console.error('❌ Failed to cleanup:', error);
  } finally {
    await mongoClient.close();
  }
}

// Print summary
function printSummary() {
  console.log('\n' + '='.repeat(60));
  console.log('TEST SUMMARY');
  console.log('='.repeat(60));
  
  const passed = testResults.filter(t => t.passed).length;
  const failed = testResults.filter(t => !t.passed).length;
  const total = testResults.length;
  
  console.log(`\nTotal Tests: ${total}`);
  console.log(`✅ Passed: ${passed}`);
  console.log(`❌ Failed: ${failed}`);
  console.log(`Success Rate: ${((passed / total) * 100).toFixed(1)}%\n`);
  
  if (failed > 0) {
    console.log('Failed Tests:');
    testResults.filter(t => !t.passed).forEach(t => {
      console.log(`  ❌ ${t.name}`);
      if (t.details) console.log(`     ${t.details}`);
    });
  }
  
  console.log('\n' + '='.repeat(60) + '\n');
}

// Run all tests
async function runTests() {
  console.log('🧪 Lambda Function Test Suite\n');
  console.log('Function: ' + FUNCTION_NAME);
  console.log('Region: us-east-2\n');
  console.log('='.repeat(60) + '\n');
  
  try {
    // Setup
    const setupSuccess = await setupTestData();
    if (!setupSuccess) {
      console.error('❌ Setup failed. Aborting tests.');
      return;
    }
    
    // Run all tests
    await testGetUserStudyMaterials();
    await testGetUserStudyMaterialsEmpty();
    await testGetStudyMaterial();
    await testGetStudyMaterialInvalid();
    await testSaveFlashcards();
    await testSaveFlashcardsArray();
    await testSaveFlashcardsParameters();
    await testUnknownApiPath();
    await testMongoDBIntegrity();
    await testResponseFormat();
    await testConcurrentRequests();
    
    // Print results
    printSummary();
    
    // Cleanup
    await cleanup();
    
  } catch (error) {
    console.error('\n❌ Test suite failed:', error);
    await cleanup();
  }
}

// Run the tests
runTests();