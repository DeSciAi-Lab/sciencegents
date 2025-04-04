#!/usr/bin/env node

/**
 * Domain Migration Script
 * 
 * This script applies the domain migration SQL to initialize
 * the domains table in Supabase.
 */

const { createClient } = require('@supabase/supabase-js');
const fs = require('fs');
const path = require('path');
require('dotenv').config();

// Load environment variables
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseServiceKey) {
  console.error('Error: Missing Supabase credentials in environment variables.');
  console.error('Please ensure NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY are set.');
  process.exit(1);
}

// Initialize Supabase client with service role for admin privileges
const supabase = createClient(supabaseUrl, supabaseServiceKey);

async function applyDomainMigration() {
  try {
    console.log('Starting domain migration...');
    
    // Read SQL migration file
    const sqlFilePath = path.join(__dirname, 'migrations', 'init-domains.sql');
    const sql = fs.readFileSync(sqlFilePath, 'utf8');
    
    console.log('Executing SQL migration...');
    
    // Execute SQL using RPC call (requires properly configured function in Supabase)
    const { error } = await supabase.rpc('exec_sql', { sql_query: sql });
    
    if (error) throw error;
    
    console.log('✅ Domain migration completed successfully!');
    console.log('All default domains have been added to the Supabase domains table.');
    
  } catch (error) {
    console.error('❌ Error applying domain migration:');
    console.error(error);
    
    // Provide helpful troubleshooting tips
    console.log('\nTroubleshooting tips:');
    console.log('1. Ensure you have created the domains table using scripts/create-domains-table.sql');
    console.log('2. Make sure your Supabase credentials are correct');
    console.log('3. Verify you have the exec_sql database function created in Supabase');
    console.log('4. You can manually run the SQL in the Supabase SQL editor if this script fails');
    
    process.exit(1);
  }
}

// Add instructions for creating the exec_sql function if it doesn't exist
function printSetupInstructions() {
  console.log('\n-------------------------------------------------------------------------');
  console.log('Before running this script, you need to create an exec_sql function in Supabase.');
  console.log('Run the following SQL in your Supabase SQL editor:');
  console.log('\n```sql');
  console.log(`CREATE OR REPLACE FUNCTION exec_sql(sql_query TEXT)
RETURNS VOID AS $$
BEGIN
  EXECUTE sql_query;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;`);
  console.log('```');
  console.log('\nAlternatively, you can run the init-domains.sql script directly in the SQL editor.');
  console.log('-------------------------------------------------------------------------\n');
}

// Check if --help flag was provided
if (process.argv.includes('--help') || process.argv.includes('-h')) {
  console.log('Domain Migration Script');
  console.log('Usage: node apply-domain-migration.js [options]');
  console.log('\nOptions:');
  console.log('  --help, -h     Show this help message');
  console.log('  --setup        Show setup instructions for Supabase');
  printSetupInstructions();
  process.exit(0);
}

// Check if --setup flag was provided
if (process.argv.includes('--setup')) {
  printSetupInstructions();
  process.exit(0);
}

// Run the migration
applyDomainMigration(); 