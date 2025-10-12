// aws_lambda.test.js
// Complete and updated test suite for the Lambda function
// Run: aws_lambda.test.js

import { LambdaClient, InvokeCommand } from '@aws-sdk/client-lambda';
import { MongoClient, ObjectId } from 'mongodb';
import 'dotenv/config';

const lambdaClient = new LambdaClient({ region: 'us-east-2' });
const mongoClient = new MongoClient(process.env.MONGODB_URI);

const FUNCTION_NAME = 'flashcard-agent-mongodb-actions';
const TEST_USER_ID = 'test-user-' + Date.now();

let testDocumentId;
let newCardsetId;
let testResults = [];

// Helper to invoke Lambda
async function invokeLambda(payload) {
  const command = new InvokeCommand({
    FunctionName: FUNCTION_NAME,
    Payload: JSON.stringify(payload)
  });
  
  const response = await lambdaClient.send(command);
  const result = JSON.parse(new TextDecoder().decode(response.Payload));
  
  // Handle potential errors returned by the Lambda function itself
  if (result.errorMessage) {
      throw new Error(result.errorMessage);
  }
  
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
    // ✅ FIX: Connect to the correct database
    const db = mongoClient.db('study_materials'); 
    
    const doc = {
        userId: TEST_USER_ID,
        title: 'Biology Chapter 1',
        content: 'Photosynthesis is the process by which plants convert light energy into chemical energy. Chloroplasts contain chlorophyll which captures light energy.',
        topic: 'biology',
        createdAt: new Date()
    };
    
    // ✅ FIX: Insert into the 'documents' collection
    const result = await db.collection('documents').insertOne(doc);
    testDocumentId = result.insertedId.toString();
    
    console.log(`✅ Inserted 1 test document`);
    console.log(`   Test Document ID: ${testDocumentId}`);
    console.log(`   Test User ID: ${TEST_USER_ID}\n`);
    
    return true;
  } catch (error) {
    console.error('❌ Failed to setup test data:', error);
    return false;
  }
}

// Test 2: getStudyMaterial - Valid ID (renamed from old test 4)
async function testGetStudyMaterial() {
  console.log('Test 2: getStudyMaterial (valid ID)');
  try {
    const payload = {
      apiPath: '/getStudyMaterial',
      requestBody: { content: { 'application/json': { body: JSON.stringify({ materialId: testDocumentId }) } } }
    };
    const result = await invokeLambda(payload);
    const responseBody = JSON.parse(result.response.responseBody['application/json'].body);
    
    const passed = responseBody.success === true && responseBody.title === 'Biology Chapter 1';
    logTest('getStudyMaterial retrieves correct document', passed, `Title: ${responseBody.title || 'N/A'}`);
    return passed;
  } catch (error) {
    logTest('getStudyMaterial retrieves correct document', false, error.message);
    return false;
  }
}

// Test 3: createCardset - Primary workflow test (replaces old saveFlashcards tests)
async function testCreateCardset() {
  console.log('Test 3: createCardset (primary workflow)');
  try {
    const flashcardsToCreate = [
      {
        genre: 'Biology',
        question: 'What is photosynthesis?',
        correctAnswer: 'The process by which plants convert light energy into chemical energy.',
        incorrectAnswers: ['Cellular Respiration', 'Transpiration'],
        difficulty: 'easy'
      },
      {
        genre: 'Biology',
        question: 'What pigment captures light energy?',
        correctAnswer: 'Chlorophyll',
        incorrectAnswers: ['Hemoglobin', 'Melanin'],
        difficulty: 'easy'
      }
    ];

    const payload = {
      apiPath: '/createCardset',
      requestBody: {
        content: {
          'application/json': {
            body: JSON.stringify({
              userId: TEST_USER_ID,
              title: 'Photosynthesis Basics',
              description: 'Generated from Biology Chapter 1 document.',
              flashcards: flashcardsToCreate
            })
          }
        }
      }
    };
    
    const result = await invokeLambda(payload);
    const responseBody = JSON.parse(result.response.responseBody['application/json'].body);
    
    const passed = responseBody.success === true && responseBody.cardsSaved === 2 && responseBody.cardsetId;
    if (passed) {
      newCardsetId = responseBody.cardsetId; // Save for integrity test
    }
    
    logTest('createCardset creates cards and a new set', passed, `Saved ${responseBody.cardsSaved || 0} cards in set ${responseBody.cardsetId || 'N/A'}`);
    return passed;
  } catch (error) {
    logTest('createCardset creates cards and a new set', false, error.message);
    return false;
  }
}

// Test 4: MongoDB data integrity for new set
async function testMongoDBIntegrity() {
  console.log('Test 4: MongoDB data integrity');
  try {
    const db = mongoClient.db('study_materials');
    
    // 1. Verify the cardset was created
    const cardset = await db.collection('cardsets').findOne({ _id: new ObjectId(newCardsetId) });
    const hasCorrectSet = cardset && cardset.title === 'Photosynthesis Basics' && cardset.cardIds.length === 2;
    
    // 2. Verify the individual cards were created and are linked
    const cards = await db.collection('cards').find({ _id: { $in: cardset.cardIds } }).toArray();
    const hasCorrectCards = cards.length === 2 && cards[0].question === 'What is photosynthesis?';

    const passed = hasCorrectSet && hasCorrectCards;
    logTest('MongoDB contains correctly created and linked set/cards', passed, `Set valid: ${hasCorrectSet}, Cards valid: ${hasCorrectCards}`);
    return passed;
  } catch (error) {
    logTest('MongoDB contains correctly created and linked set/cards', false, error.message);
    return false;
  }
}

// Test 5: Unknown API path
async function testUnknownApiPath() {
    console.log('Test 5: Unknown API path');
    try {
        const payload = { apiPath: '/unknownEndpoint', requestBody: { content: { 'application/json': { body: '{}' } } } };
        const result = await invokeLambda(payload);
        const responseBody = JSON.parse(result.response.responseBody['application/json'].body);
        const passed = responseBody.success === false && responseBody.message.includes('Unknown');
        logTest('Lambda handles unknown API paths gracefully', passed, responseBody.message);
        return passed;
    } catch (error) {
        logTest('Lambda handles unknown API paths gracefully', false, error.message);
        return false;
    }
}


// Cleanup test data
async function cleanup() {
  console.log('\n🧹 Cleaning up test data...\n');
  try {
    const db = mongoClient.db('study_materials');
    
    // ✅ FIX: Clean up all new collections
    await db.collection('documents').deleteMany({ userId: TEST_USER_ID });
    await db.collection('cardsets').deleteMany({ userId: TEST_USER_ID });
    // This assumes cards are uniquely identified by the test user. 
    // A more robust approach might be needed if cards are shared.
    await db.collection('cards').deleteMany({ createdBy: TEST_USER_ID });
    
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
  
  if (failed > 0) {
    console.log('\nFailed Tests:');
    testResults.filter(t => !t.passed).forEach(t => {
      console.log(`  ❌ ${t.name}`);
      if (t.details) console.log(`      ${t.details}`);
    });
  }
  
  console.log('\n' + '='.repeat(60) + '\n');
}

// Run all tests
async function runTests() {
  console.log('🧪 Lambda Function Test Suite\n');
  console.log('Function: ' + FUNCTION_NAME);
  console.log('='.repeat(60) + '\n');
  
  try {
    const setupSuccess = await setupTestData();
    if (!setupSuccess) {
      console.error('❌ Setup failed. Aborting tests.');
      return;
    }
    
    await testGetStudyMaterial();
    await testCreateCardset();
    if(newCardsetId) { // Only run integrity check if the set was created
        await testMongoDBIntegrity();
    } else {
        logTest('MongoDB data integrity', false, 'Skipped because card set creation failed.');
    }
    await testUnknownApiPath();
    
    printSummary();
    await cleanup();
    
  } catch (error) {
    console.error('\n❌ Test suite failed:', error);
    await cleanup();
  }
}

// Run the tests
runTests();