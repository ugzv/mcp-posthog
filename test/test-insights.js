// Test script for insights creation
const axios = require('axios');

// Configuration - update these values
const POSTHOG_HOST = 'https://app.posthog.com'; // or your PostHog instance
const API_KEY = 'YOUR_PERSONAL_API_KEY'; // Replace with your personal API key
const PROJECT_ID = 'YOUR_PROJECT_ID'; // Replace with your project ID

async function testInsightCreation() {
  try {
    // Test 1: Create a simple trends insight
    console.log('Creating a simple trends insight...');
    const trendsInsight = await axios.post(
      `${POSTHOG_HOST}/api/projects/${PROJECT_ID}/insights/`,
      {
        name: 'Test Trends Insight',
        description: 'Testing trends insight creation with proper query structure',
        query: {
          kind: 'InsightVizNode',
          source: {
            kind: 'TrendsQuery',
            series: [{
              kind: 'EventsNode',
              event: '$pageview',
              math: 'total'
            }],
            dateRange: {
              date_from: '-7d',
              date_to: '0d'
            }
          }
        }
      },
      {
        headers: {
          'Authorization': `Bearer ${API_KEY}`,
          'Content-Type': 'application/json'
        }
      }
    );
    console.log('✓ Trends insight created successfully:', trendsInsight.data.id);

    // Test 2: Create insight with breakdown
    console.log('\nCreating insight with breakdown...');
    const breakdownInsight = await axios.post(
      `${POSTHOG_HOST}/api/projects/${PROJECT_ID}/insights/`,
      {
        name: 'Test Breakdown Insight',
        description: 'Testing insight with browser breakdown',
        query: {
          kind: 'InsightVizNode',
          source: {
            kind: 'TrendsQuery',
            series: [{
              kind: 'EventsNode',
              event: '$pageview',
              math: 'total'
            }],
            dateRange: {
              date_from: '-30d',
              date_to: '0d'
            },
            breakdownFilter: {
              breakdown: '$browser',
              breakdown_type: 'event'
            }
          }
        }
      },
      {
        headers: {
          'Authorization': `Bearer ${API_KEY}`,
          'Content-Type': 'application/json'
        }
      }
    );
    console.log('✓ Breakdown insight created successfully:', breakdownInsight.data.id);

    // Test 3: Create DAU insight
    console.log('\nCreating DAU insight...');
    const dauInsight = await axios.post(
      `${POSTHOG_HOST}/api/projects/${PROJECT_ID}/insights/`,
      {
        name: 'Daily Active Users',
        description: 'Testing DAU metric insight',
        query: {
          kind: 'InsightVizNode',
          source: {
            kind: 'TrendsQuery',
            series: [{
              kind: 'EventsNode',
              event: '$pageview',
              math: 'dau'
            }],
            dateRange: {
              date_from: '-14d',
              date_to: '0d'
            }
          }
        }
      },
      {
        headers: {
          'Authorization': `Bearer ${API_KEY}`,
          'Content-Type': 'application/json'
        }
      }
    );
    console.log('✓ DAU insight created successfully:', dauInsight.data.id);

    console.log('\n✅ All tests passed successfully!');
    console.log('The insights creation is working properly with the correct query structure.');
    
  } catch (error) {
    console.error('❌ Error creating insight:', error.response?.data || error.message);
    if (error.response?.data?.detail) {
      console.error('Details:', error.response.data.detail);
    }
  }
}

// Run the test
console.log('Testing PostHog insights creation...\n');
console.log('Make sure to update the configuration values at the top of this script!\n');
testInsightCreation();