// Test script for actions
const axios = require('axios');

// Configuration - update these values
const POSTHOG_HOST = 'https://app.posthog.com'; // or your PostHog instance
const API_KEY = 'YOUR_PERSONAL_API_KEY'; // Replace with your personal API key
const PROJECT_ID = 'YOUR_PROJECT_ID'; // Replace with your project ID

async function testActions() {
  const baseUrl = `${POSTHOG_HOST}/api/projects/${PROJECT_ID}/actions/`;
  const headers = {
    'Authorization': `Bearer ${API_KEY}`,
    'Content-Type': 'application/json'
  };

  let createdActionId;

  try {
    // Test 1: Create a pageview action
    console.log('Test 1: Creating a pageview action...');
    const pageviewResponse = await axios.post(
      baseUrl,
      {
        name: 'View Pricing Page',
        description: 'Track when users view the pricing page',
        steps: [{
          event: '$pageview',
          url: '/pricing',
          url_matching: 'contains'
        }],
        tags: ['conversion', 'funnel']
      },
      { headers }
    );
    createdActionId = pageviewResponse.data.id;
    console.log('✓ Pageview action created:', {
      id: createdActionId,
      name: pageviewResponse.data.name,
      steps: pageviewResponse.data.steps
    });

    // Test 2: Create a click action
    console.log('\nTest 2: Creating a click action...');
    const clickResponse = await axios.post(
      baseUrl,
      {
        name: 'Sign Up Button Click',
        description: 'Track clicks on the sign up button',
        steps: [{
          event: '$autocapture',
          selector: 'button.signup-btn',
          text: 'Sign Up',
          text_matching: 'contains'
        }],
        tags: ['conversion', 'signup']
      },
      { headers }
    );
    console.log('✓ Click action created:', {
      id: clickResponse.data.id,
      name: clickResponse.data.name,
      selector: clickResponse.data.steps[0].selector
    });

    // Test 3: Create a complex action with properties
    console.log('\nTest 3: Creating action with properties...');
    const complexResponse = await axios.post(
      baseUrl,
      {
        name: 'Premium Feature Usage',
        description: 'Track usage of premium features',
        steps: [{
          event: 'feature_used',
          properties: [{
            feature_type: 'premium',
            user_tier: 'pro'
          }]
        }],
        tags: ['product', 'engagement']
      },
      { headers }
    );
    console.log('✓ Complex action created:', {
      id: complexResponse.data.id,
      name: complexResponse.data.name,
      properties: complexResponse.data.steps[0].properties
    });

    // Test 4: List actions
    console.log('\nTest 4: Listing actions...');
    const listResponse = await axios.get(
      baseUrl,
      { 
        headers,
        params: { limit: 10 }
      }
    );
    console.log(`✓ Found ${listResponse.data.count} total actions`);
    const activeActions = listResponse.data.results.filter(a => !a.deleted);
    console.log(`  - ${activeActions.length} active actions`);
    console.log('Recent actions:', activeActions.slice(0, 3).map(a => ({
      id: a.id,
      name: a.name,
      tags: a.tags
    })));

    // Test 5: Retrieve specific action
    console.log('\nTest 5: Retrieving specific action...');
    const getResponse = await axios.get(
      `${baseUrl}${createdActionId}/`,
      { headers }
    );
    console.log('✓ Retrieved action:', {
      id: getResponse.data.id,
      name: getResponse.data.name,
      created_at: getResponse.data.created_at,
      is_calculating: getResponse.data.is_calculating
    });

    // Test 6: Update action
    console.log('\nTest 6: Updating action...');
    const updateResponse = await axios.patch(
      `${baseUrl}${createdActionId}/`,
      {
        name: 'View Pricing Page (Updated)',
        description: 'Track when users view any pricing-related pages',
        steps: [{
          event: '$pageview',
          url: '/pricing',
          url_matching: 'contains'
        }, {
          event: '$pageview',
          url: '/plans',
          url_matching: 'contains'
        }]
      },
      { headers }
    );
    console.log('✓ Action updated:', {
      id: updateResponse.data.id,
      name: updateResponse.data.name,
      steps_count: updateResponse.data.steps.length
    });

    // Test 7: Create action with Slack integration
    console.log('\nTest 7: Creating action with Slack notification...');
    const slackResponse = await axios.post(
      baseUrl,
      {
        name: 'High-Value Conversion',
        description: 'Track and notify on high-value conversions',
        steps: [{
          event: 'purchase_completed',
          properties: [{
            amount: { $gte: 1000 }
          }]
        }],
        post_to_slack: true,
        slack_message_format: 'High-value purchase: ${properties.amount} by ${distinct_id}',
        tags: ['alerts', 'revenue']
      },
      { headers }
    );
    console.log('✓ Slack-enabled action created:', {
      id: slackResponse.data.id,
      name: slackResponse.data.name,
      post_to_slack: slackResponse.data.post_to_slack
    });

    // Test 8: Export actions as CSV (if supported)
    console.log('\nTest 8: Testing CSV export format...');
    try {
      const csvResponse = await axios.get(
        baseUrl,
        { 
          headers,
          params: { 
            format: 'csv',
            limit: 5
          }
        }
      );
      console.log('✓ CSV export supported, received data');
    } catch (csvError) {
      if (csvError.response?.status === 406) {
        console.log('⚠️  CSV export not available or not properly formatted');
      } else {
        throw csvError;
      }
    }

    // Test 9: Soft delete action
    console.log('\nTest 9: Marking action as deleted...');
    const deleteResponse = await axios.patch(
      `${baseUrl}${createdActionId}/`,
      {
        deleted: true
      },
      { headers }
    );
    console.log('✓ Action marked as deleted:', {
      id: deleteResponse.data.id,
      deleted: deleteResponse.data.deleted
    });

    console.log('\n✅ All action tests passed successfully!');
    
  } catch (error) {
    console.error('\n❌ Error in action tests:', error.response?.data || error.message);
    if (error.response?.data?.detail) {
      console.error('Details:', error.response.data.detail);
    }
    if (error.response?.status === 401) {
      console.error('\n⚠️  Authentication failed. Please check your API key.');
    }
    if (error.response?.status === 404) {
      console.error('\n⚠️  Project not found. Please check your project ID.');
    }
    if (error.response?.status === 403) {
      console.error('\n⚠️  Permission denied. Make sure your API key has action:write scope.');
    }
  }
}

// Run the test
console.log('Testing PostHog Actions API...');
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

testActions();