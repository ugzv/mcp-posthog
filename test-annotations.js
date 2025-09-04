// Test script for annotations
const axios = require('axios');

// Configuration - update these values
const POSTHOG_HOST = 'https://app.posthog.com'; // or your PostHog instance
const API_KEY = 'YOUR_PERSONAL_API_KEY'; // Replace with your personal API key
const PROJECT_ID = 'YOUR_PROJECT_ID'; // Replace with your project ID

async function testAnnotations() {
  const baseUrl = `${POSTHOG_HOST}/api/projects/${PROJECT_ID}/annotations/`;
  const headers = {
    'Authorization': `Bearer ${API_KEY}`,
    'Content-Type': 'application/json'
  };

  let createdAnnotationId;

  try {
    // Test 1: Create an annotation for today
    console.log('Test 1: Creating an annotation for today...');
    const now = new Date();
    const createResponse = await axios.post(
      baseUrl,
      {
        content: 'Deployed new feature: User Dashboard v2.0',
        date_marker: now.toISOString(),
        scope: 'project'
      },
      { headers }
    );
    createdAnnotationId = createResponse.data.id;
    console.log('✓ Annotation created:', {
      id: createdAnnotationId,
      content: createResponse.data.content,
      date: createResponse.data.date_marker
    });

    // Test 2: List annotations
    console.log('\nTest 2: Listing annotations...');
    const listResponse = await axios.get(
      baseUrl,
      { 
        headers,
        params: { limit: 5 }
      }
    );
    console.log(`✓ Found ${listResponse.data.count} total annotations`);
    console.log('Recent annotations:', listResponse.data.results.slice(0, 3).map(a => ({
      id: a.id,
      content: a.content,
      date: a.date_marker
    })));

    // Test 3: Retrieve specific annotation
    console.log('\nTest 3: Retrieving specific annotation...');
    const getResponse = await axios.get(
      `${baseUrl}${createdAnnotationId}/`,
      { headers }
    );
    console.log('✓ Retrieved annotation:', {
      id: getResponse.data.id,
      content: getResponse.data.content,
      created_by: getResponse.data.created_by?.email
    });

    // Test 4: Update annotation
    console.log('\nTest 4: Updating annotation...');
    const updateResponse = await axios.patch(
      `${baseUrl}${createdAnnotationId}/`,
      {
        content: 'Deployed new feature: User Dashboard v2.0 - Fixed minor bugs'
      },
      { headers }
    );
    console.log('✓ Annotation updated:', {
      id: updateResponse.data.id,
      new_content: updateResponse.data.content
    });

    // Test 5: Search annotations
    console.log('\nTest 5: Searching annotations...');
    const searchResponse = await axios.get(
      baseUrl,
      { 
        headers,
        params: { 
          search: 'deploy',
          limit: 5 
        }
      }
    );
    console.log(`✓ Found ${searchResponse.data.results.length} annotations matching "deploy"`);

    // Test 6: Create annotation for past event
    console.log('\nTest 6: Creating annotation for past event...');
    const pastDate = new Date();
    pastDate.setDate(pastDate.getDate() - 7); // 7 days ago
    const pastResponse = await axios.post(
      baseUrl,
      {
        content: 'Marketing campaign launched',
        date_marker: pastDate.toISOString(),
        scope: 'project'
      },
      { headers }
    );
    console.log('✓ Past annotation created:', {
      id: pastResponse.data.id,
      content: pastResponse.data.content,
      date: pastResponse.data.date_marker
    });

    // Test 7: Soft delete annotation
    console.log('\nTest 7: Marking annotation as deleted...');
    const deleteResponse = await axios.patch(
      `${baseUrl}${createdAnnotationId}/`,
      {
        deleted: true
      },
      { headers }
    );
    console.log('✓ Annotation marked as deleted:', {
      id: deleteResponse.data.id,
      deleted: deleteResponse.data.deleted
    });

    console.log('\n✅ All annotation tests passed successfully!');
    
  } catch (error) {
    console.error('\n❌ Error in annotation tests:', error.response?.data || error.message);
    if (error.response?.data?.detail) {
      console.error('Details:', error.response.data.detail);
    }
    if (error.response?.status === 401) {
      console.error('\n⚠️  Authentication failed. Please check your API key.');
    }
    if (error.response?.status === 404) {
      console.error('\n⚠️  Project not found. Please check your project ID.');
    }
  }
}

// Run the test
console.log('Testing PostHog Annotations API...');
console.log('=====================================');
console.log('Host:', POSTHOG_HOST);
console.log('Project ID:', PROJECT_ID);
console.log('=====================================\n');

if (API_KEY === 'YOUR_PERSONAL_API_KEY' || PROJECT_ID === 'YOUR_PROJECT_ID') {
  console.error('⚠️  Please update the configuration values at the top of this script!');
  console.error('   - Replace YOUR_PERSONAL_API_KEY with your actual API key');
  console.error('   - Replace YOUR_PROJECT_ID with your actual project ID');
  process.exit(1);
}

testAnnotations();