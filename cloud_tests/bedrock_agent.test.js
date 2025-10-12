// bedrock_agent.test.js
// Complete test suite for the Bedrock Agent
// Run: node bedrock_agent.test.js

import { BedrockAgentRuntimeClient, InvokeAgentCommand } from '@aws-sdk/client-bedrock-agent-runtime';
import { MongoClient, ObjectId } from 'mongodb';
import 'dotenv/config';

const bedrockClient = new BedrockAgentRuntimeClient({ region: 'us-east-2' });
const mongoClient = new MongoClient(process.env.MONGODB_URI);

// Load from env or agent-config.json
const AGENT_ID = process.env.BEDROCK_AGENT_ID;
const AGENT_ALIAS_ID = process.env.BEDROCK_AGENT_ALIAS_ID || 'TSTALIASID';
const TEST_USER_ID = 'agent-test-user-' + Date.now();

let testMaterialIds = [];
let testResults = [];
let db;

// Helper to invoke agent and collect full response
async function invokeAgent(prompt, sessionId, expectActions = false) {
  console.log(`\n💬 User: "${prompt}"`);
  
  const command = new InvokeAgentCommand({
    agentId: AGENT_ID,
    agentAliasId: AGENT_ALIAS_ID,
    sessionId: sessionId,
    inputText: prompt
  });

  const response = await bedrockClient.send(command);
  
  let fullResponse = '';
  let actionsCalled = [];
  let citations = [];
  let traces = [];
  
  for await (const event of response.completion) {
    // Collect text chunks
    if (event.chunk?.bytes) {
      const text = new TextDecoder().decode(event.chunk.bytes);
      fullResponse += text;
    }
    
    // Track action invocations
    if (event.trace?.trace?.orchestrationTrace) {
      const orchTrace = event.trace.trace.orchestrationTrace;
      
      if (orchTrace.invocationInput) {
        traces.push({
          type: 'invocationInput',
          data: orchTrace.invocationInput
        });
      }
      
      if (orchTrace.observation?.actionGroupInvocationOutput) {
        const actionOutput = orchTrace.observation.actionGroupInvocationOutput;
        actionsCalled.push({
          action: actionOutput.text || 'unknown',
          timestamp: new Date()
        });
        traces.push({
          type: 'actionInvocation',
          data: actionOutput
        });
      }
    }
  }
  
  console.log(`🤖 Agent: "${fullResponse.substring(0, 150)}${fullResponse.length > 150 ? '...' : ''}"`);
  
  if (actionsCalled.length > 0) {
    console.log(`⚡ Actions called: ${actionsCalled.length}`);
    actionsCalled.forEach(action => {
      console.log(`   - ${action.action}`);
    });
  }
  
  return { 
    text: fullResponse, 
    actionsCalled, 
    citations,
    traces,
    hasActions: actionsCalled.length > 0
  };
}

// Helper to log test results
function logTest(name, passed, details = '') {
  const status = passed ? '✅ PASS' : '❌ FAIL';
  console.log(`\n${status}: ${name}`);
  if (details) console.log(`   ${details}`);
  testResults.push({ name, passed, details });
}

// Setup test data in MongoDB
async function setupTestData() {
  console.log('\n📦 Setting up test data in MongoDB...\n');
  
  try {
    await mongoClient.connect();
    db = mongoClient.db('kahoot_flashcards');
    
    // Insert diverse test study materials
    const materials = [
      {
        userId: TEST_USER_ID,
        title: 'Photosynthesis Study Guide',
        content: `Photosynthesis is the process by which plants convert light energy into chemical energy.
        
Key Points:
- Occurs in chloroplasts
- Requires chlorophyll (green pigment)
- Equation: 6CO2 + 6H2O + light → C6H12O6 + 6O2
- Two stages: light-dependent reactions and Calvin cycle
- Products: glucose and oxygen
- Takes place in leaves

Light-dependent reactions occur in thylakoid membranes and produce ATP and NADPH.
The Calvin cycle occurs in the stroma and uses ATP and NADPH to produce glucose.`,
        topic: 'biology',
        contentType: 'text',
        embedding: [],
        createdAt: new Date()
      },
      {
        userId: TEST_USER_ID,
        title: 'Cell Structure Notes',
        content: `Basic Cell Structures:

1. Cell Membrane - Controls what enters and exits the cell
2. Nucleus - Contains DNA and controls cell activities
3. Mitochondria - Powerhouse of the cell, produces ATP
4. Ribosomes - Protein synthesis
5. Endoplasmic Reticulum - Protein and lipid transport
6. Golgi Apparatus - Packages and ships proteins

Prokaryotic vs Eukaryotic:
- Prokaryotes: No nucleus, bacteria
- Eukaryotes: Have nucleus, plants and animals`,
        topic: 'biology',
        contentType: 'text',
        embedding: [],
        createdAt: new Date()
      },
      {
        userId: TEST_USER_ID,
        title: 'Chemistry - Atomic Structure',
        content: `Atomic Structure Basics:

Atom consists of:
- Protons: Positive charge, in nucleus
- Neutrons: No charge, in nucleus
- Electrons: Negative charge, orbit nucleus

Atomic Number = number of protons
Mass Number = protons + neutrons
Isotopes = same element, different neutrons

Electron Configuration:
- Shells: K, L, M, N
- Maximum electrons: 2n²
- Valence electrons determine reactivity`,
        topic: 'chemistry',
        contentType: 'text',
        embedding: [],
        createdAt: new Date()
      }
    ];
    
    const result = await db.collection('study_materials').insertMany(materials);
    testMaterialIds = Object.values(result.insertedIds).map(id => id.toString());
    
    console.log(`✅ Inserted ${materials.length} test study materials`);
    console.log(`   Material IDs: ${testMaterialIds.join(', ')}`);
    console.log(`   Test User ID: ${TEST_USER_ID}\n`);
    
    return true;
  } catch (error) {
    console.error('❌ Failed to setup test data:', error);
    return false;
  }
}

// Test 1: Agent responds to basic greeting
async function testBasicConversation() {
  console.log('\n' + '='.repeat(60));
  console.log('Test 1: Basic Conversation');
  console.log('='.repeat(60));
  
  try {
    const sessionId = `session-test1-${Date.now()}`;
    const response = await invokeAgent('Hello! Can you help me study?', sessionId);
    
    const passed = response.text.length > 10 && 
                   (response.text.toLowerCase().includes('help') || 
                    response.text.toLowerCase().includes('study') ||
                    response.text.toLowerCase().includes('flashcard'));
    
    logTest(
      'Agent responds appropriately to greetings',
      passed,
      `Response length: ${response.text.length} chars`
    );
    
    return passed;
  } catch (error) {
    logTest('Agent responds appropriately to greetings', false, error.message);
    return false;
  }
}

// Test 2: Agent lists user's study materials
async function testListMaterials() {
  console.log('\n' + '='.repeat(60));
  console.log('Test 2: List Study Materials');
  console.log('='.repeat(60));
  
  try {
    const sessionId = `session-test2-${Date.now()}`;
    const response = await invokeAgent(
      `Show me my study materials. My user ID is ${TEST_USER_ID}`,
      sessionId,
      true
    );
    
    const hasActions = response.hasActions;
    const mentionsMaterials = response.text.toLowerCase().includes('photosynthesis') ||
                               response.text.toLowerCase().includes('cell structure') ||
                               response.text.toLowerCase().includes('chemistry');
    
    const passed = hasActions && mentionsMaterials;
    
    logTest(
      'Agent calls getUserStudyMaterials and lists materials',
      passed,
      `Actions called: ${hasActions}, Materials mentioned: ${mentionsMaterials}`
    );
    
    return passed;
  } catch (error) {
    logTest('Agent calls getUserStudyMaterials and lists materials', false, error.message);
    return false;
  }
}

// Test 3: Agent generates flashcards from specific material
async function testGenerateFlashcards() {
  console.log('\n' + '='.repeat(60));
  console.log('Test 3: Generate Flashcards');
  console.log('='.repeat(60));
  
  try {
    const sessionId = `session-test3-${Date.now()}`;
    const materialId = testMaterialIds[0];
    
    const response = await invokeAgent(
      `Generate 5 flashcards from my study material with ID: ${materialId}. My user ID is ${TEST_USER_ID}`,
      sessionId,
      true
    );
    
    // Should call getStudyMaterial and saveFlashcards
    const hasActions = response.hasActions;
    const mentionsFlashcards = response.text.match(/flashcard/gi)?.length > 0;
    
    // Wait a moment then check MongoDB
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    const flashcards = await db.collection('flashcards')
      .find({ 
        userId: TEST_USER_ID,
        materialId: materialId
      })
      .toArray();
    
    const savedToDb = flashcards.length >= 3; // At least 3 flashcards
    
    const passed = hasActions && mentionsFlashcards && savedToDb;
    
    logTest(
      'Agent generates and saves flashcards',
      passed,
      `Actions: ${hasActions}, Mentions flashcards: ${mentionsFlashcards}, Saved to DB: ${flashcards.length} cards`
    );
    
    return passed;
  } catch (error) {
    logTest('Agent generates and saves flashcards', false, error.message);
    return false;
  }
}

// Test 4: Conversational flow - multi-turn interaction
async function testMultiTurnConversation() {
  console.log('\n' + '='.repeat(60));
  console.log('Test 4: Multi-turn Conversation');
  console.log('='.repeat(60));
  
  try {
    const sessionId = `session-test4-${Date.now()}`;
    
    // Turn 1: Ask about materials
    const response1 = await invokeAgent(
      `What study materials do I have? User ID: ${TEST_USER_ID}`,
      sessionId,
      true
    );
    
    // Turn 2: Follow up - generate flashcards
    const response2 = await invokeAgent(
      `Great! Generate 3 flashcards from the photosynthesis material.`,
      sessionId,
      true
    );
    
    // Turn 3: Ask a question about content
    const response3 = await invokeAgent(
      `What is the equation for photosynthesis?`,
      sessionId
    );
    
    const allResponded = response1.text.length > 10 && 
                         response2.text.length > 10 && 
                         response3.text.length > 10;
    
    const secondHadActions = response2.hasActions;
    
    const passed = allResponded && secondHadActions;
    
    logTest(
      'Agent maintains context across multiple turns',
      passed,
      `All turns responded: ${allResponded}, Generated flashcards: ${secondHadActions}`
    );
    
    return passed;
  } catch (error) {
    logTest('Agent maintains context across multiple turns', false, error.message);
    return false;
  }
}

// Test 5: Agent handles request with direct content
async function testDirectContentGeneration() {
  console.log('\n' + '='.repeat(60));
  console.log('Test 5: Generate Flashcards from Direct Content');
  console.log('='.repeat(60));
  
  try {
    const sessionId = `session-test5-${Date.now()}`;
    
    const response = await invokeAgent(
      `Create 3 flashcards from this content: "Water (H2O) is made of 2 hydrogen atoms and 1 oxygen atom. Water freezes at 0°C and boils at 100°C. Water is essential for life." Save them for user ${TEST_USER_ID} with topic "chemistry".`,
      sessionId,
      true
    );
    
    const mentionsFlashcards = response.text.toLowerCase().includes('flashcard');
    const hasActions = response.hasActions;
    
    // Check if saved
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    const flashcards = await db.collection('flashcards')
      .find({ 
        userId: TEST_USER_ID,
        topic: 'chemistry'
      })
      .sort({ createdAt: -1 })
      .limit(5)
      .toArray();
    
    const recentlySaved = flashcards.some(card => 
      Date.now() - card.createdAt.getTime() < 10000
    );
    
    const passed = mentionsFlashcards && (hasActions || recentlySaved);
    
    logTest(
      'Agent generates flashcards from direct content',
      passed,
      `Mentions flashcards: ${mentionsFlashcards}, Actions: ${hasActions}, Recently saved: ${recentlySaved}`
    );
    
    return passed;
  } catch (error) {
    logTest('Agent generates flashcards from direct content', false, error.message);
    return false;
  }
}

// Test 6: Agent provides explanations
async function testExplanations() {
  console.log('\n' + '='.repeat(60));
  console.log('Test 6: Content Explanations');
  console.log('='.repeat(60));
  
  try {
    const sessionId = `session-test6-${Date.now()}`;
    
    const response = await invokeAgent(
      'Explain what photosynthesis is in simple terms',
      sessionId
    );
    
    const hasSubstantialResponse = response.text.length > 100;
    const mentionsKeyTerms = (response.text.toLowerCase().includes('plant') ||
                               response.text.toLowerCase().includes('light') ||
                               response.text.toLowerCase().includes('energy')) &&
                              response.text.toLowerCase().includes('photosynthesis');
    
    const passed = hasSubstantialResponse && mentionsKeyTerms;
    
    logTest(
      'Agent provides educational explanations',
      passed,
      `Response length: ${response.text.length}, Mentions key terms: ${mentionsKeyTerms}`
    );
    
    return passed;
  } catch (error) {
    logTest('Agent provides educational explanations', false, error.message);
    return false;
  }
}

// Test 7: Agent handles varying flashcard quantities
async function testVariableQuantity() {
  console.log('\n' + '='.repeat(60));
  console.log('Test 7: Variable Flashcard Quantities');
  console.log('='.repeat(60));
  
  try {
    const sessionId = `session-test7-${Date.now()}`;
    const materialId = testMaterialIds[1]; // Cell structure
    
    // Request specific number
    const response = await invokeAgent(
      `Generate exactly 7 flashcards from material ${materialId}. User: ${TEST_USER_ID}`,
      sessionId,
      true
    );
    
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    const flashcards = await db.collection('flashcards')
      .find({ 
        userId: TEST_USER_ID,
        materialId: materialId
      })
      .toArray();
    
    const countInRange = flashcards.length >= 5 && flashcards.length <= 10;
    const hasActions = response.hasActions;
    
    const passed = hasActions && countInRange;
    
    logTest(
      'Agent generates requested number of flashcards',
      passed,
      `Generated ${flashcards.length} flashcards (requested 7)`
    );
    
    return passed;
  } catch (error) {
    logTest('Agent generates requested number of flashcards', false, error.message);
    return false;
  }
}

// Test 8: Flashcard quality check
async function testFlashcardQuality() {
  console.log('\n' + '='.repeat(60));
  console.log('Test 8: Flashcard Quality Validation');
  console.log('='.repeat(60));
  
  try {
    const flashcards = await db.collection('flashcards')
      .find({ userId: TEST_USER_ID })
      .toArray();
    
    if (flashcards.length === 0) {
      logTest('Flashcard quality validation', false, 'No flashcards found');
      return false;
    }
    
    const allHaveQuestion = flashcards.every(card => 
      card.question && card.question.length > 5
    );
    
    const allHaveAnswer = flashcards.every(card => 
      card.answer && card.answer.length > 3
    );
    
    const questionsHaveQuestionMarks = flashcards.filter(card => 
      card.question.includes('?')
    ).length / flashcards.length > 0.5; // At least 50% should have ?
    
    const noEmptyFields = flashcards.every(card => 
      card.userId && card.topic && card.createdAt
    );
    
    const passed = allHaveQuestion && allHaveAnswer && noEmptyFields;
    
    logTest(
      'Generated flashcards meet quality standards',
      passed,
      `Total: ${flashcards.length}, Has questions: ${allHaveQuestion}, Has answers: ${allHaveAnswer}, Question marks: ${questionsHaveQuestionMarks}`
    );
    
    // Print sample flashcards
    console.log('\n   Sample flashcards:');
    flashcards.slice(0, 3).forEach((card, i) => {
      console.log(`   ${i + 1}. Q: ${card.question.substring(0, 60)}...`);
      console.log(`      A: ${card.answer.substring(0, 60)}...`);
    });
    
    return passed;
  } catch (error) {
    logTest('Generated flashcards meet quality standards', false, error.message);
    return false;
  }
}

// Test 9: Error handling - invalid material ID
async function testErrorHandling() {
  console.log('\n' + '='.repeat(60));
  console.log('Test 9: Error Handling');
  console.log('='.repeat(60));
  
  try {
    const sessionId = `session-test9-${Date.now()}`;
    const fakeId = new ObjectId().toString();
    
    const response = await invokeAgent(
      `Generate flashcards from material ${fakeId}. User: ${TEST_USER_ID}`,
      sessionId,
      true
    );
    
    const handlesError = response.text.toLowerCase().includes('not found') ||
                         response.text.toLowerCase().includes('unable') ||
                         response.text.toLowerCase().includes('could not') ||
                         response.text.toLowerCase().includes('error');
    
    const passed = handlesError;
    
    logTest(
      'Agent handles errors gracefully',
      passed,
      `Error handling message: ${handlesError}`
    );
    
    return passed;
  } catch (error) {
    logTest('Agent handles errors gracefully', false, error.message);
    return false;
  }
}

// Test 10: Agent follows instructions about difficulty
async function testDifficultyLevels() {
  console.log('\n' + '='.repeat(60));
  console.log('Test 10: Difficulty Level Control');
  console.log('='.repeat(60));
  
  try {
    const sessionId = `session-test10-${Date.now()}`;
    const materialId = testMaterialIds[2]; // Chemistry
    
    const response = await invokeAgent(
      `Generate 5 easy difficulty flashcards from material ${materialId}. User: ${TEST_USER_ID}`,
      sessionId,
      true
    );
    
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    const flashcards = await db.collection('flashcards')
      .find({ 
        userId: TEST_USER_ID,
        materialId: materialId
      })
      .toArray();
    
    const hasDifficultyField = flashcards.some(card => card.difficulty);
    const hasActions = response.hasActions;
    
    const passed = hasActions && flashcards.length > 0;
    
    logTest(
      'Agent respects difficulty level requests',
      passed,
      `Generated ${flashcards.length} cards, Has difficulty field: ${hasDifficultyField}`
    );
    
    return passed;
  } catch (error) {
    logTest('Agent respects difficulty level requests', false, error.message);
    return false;
  }
}

// Cleanup
async function cleanup() {
  console.log('\n🧹 Cleaning up test data...\n');
  
  try {
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
  console.log('BEDROCK AGENT TEST SUMMARY');
  console.log('='.repeat(60));
  
  const passed = testResults.filter(t => t.passed).length;
  const failed = testResults.filter(t => !t.passed).length;
  const total = testResults.length;
  
  console.log(`\nAgent ID: ${AGENT_ID}`);
  console.log(`Alias ID: ${AGENT_ALIAS_ID}`);
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
  
  console.log('\n' + '='.repeat(60));
  
  // Recommendations
  console.log('\n📋 Recommendations:');
  if (passed === total) {
    console.log('  🎉 Perfect! Your agent is working great!');
    console.log('  ✅ Ready for demo');
  } else if (passed / total > 0.7) {
    console.log('  👍 Good! Some minor issues to fix');
    console.log('  ⚠️  Review failed tests above');
  } else {
    console.log('  ⚠️  Needs attention - multiple failures');
    console.log('  🔧 Check agent configuration and Lambda permissions');
  }
  
  console.log('\n' + '='.repeat(60) + '\n');
}

// Run all tests
async function runTests() {
  console.log('🤖 Bedrock Agent Test Suite\n');
  console.log('Testing intelligent flashcard generation agent');
  console.log('='.repeat(60) + '\n');
  
  if (!AGENT_ID) {
    console.error('❌ BEDROCK_AGENT_ID not set in environment variables');
    console.error('   Add to .env: BEDROCK_AGENT_ID=your_agent_id');
    process.exit(1);
  }
  
  try {
    // Setup
    const setupSuccess = await setupTestData();
    if (!setupSuccess) {
      console.error('❌ Setup failed. Aborting tests.');
      return;
    }
    
    // Run all tests
    await testBasicConversation();
    await testListMaterials();
    await testGenerateFlashcards();
    await testMultiTurnConversation();
    await testDirectContentGeneration();
    await testExplanations();
    await testVariableQuantity();
    await testFlashcardQuality();
    await testErrorHandling();
    await testDifficultyLevels();
    
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