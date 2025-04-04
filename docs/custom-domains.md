# Custom Scientific Domains Feature

This document provides an overview of the custom scientific domains feature, which allows creators to add their own domains to ScienceGents and capabilities.

## Overview

The custom domains feature allows creators to:

1. Select from a list of predefined scientific domains.
2. Create their own custom domains if needed.
3. Filter ScienceGents and capabilities by domain.

All domains are stored in a central Supabase `domains` table and are accessible across the application.

## Implementation Details

### Database Structure

The feature uses a `domains` table in Supabase with the following schema:

| Column         | Type      | Description                                 |
|----------------|-----------|---------------------------------------------|
| id             | UUID      | Primary key for the domain                  |
| name           | Text      | Name of the domain (unique)                 |
| created_at     | Timestamp | When the domain was created                 |
| creator_address| Text      | Address of the user who created the domain  |
| custom         | Boolean   | Whether this is a custom or default domain  |

### Components and Services

The implementation includes:

1. A domains service (`services/domains.ts`) with functions to fetch and create domains.
2. Updates to form components to include domain selection with custom domain creation:
   - ScienceGent creation form
   - Capability creation form
3. Updates to explore pages to use domains from Supabase for filtering:
   - Explore ScienceGents page
   - Explore Capabilities page

### Default Domains

The system is initialized with a set of default domains:

- General Science
- Chemistry
- Physics
- Biology
- Biochemistry
- Materials Science
- Protein Analysis
- Drug Discovery
- Genomics
- Quantum Simulations

These default domains are inserted into the Supabase table if it's empty when the application starts.

## How to Use

### For Users

1. **Creating a new ScienceGent or capability**:
   - Select a domain from the dropdown
   - If your domain isn't listed, click the "+" button next to the dropdown
   - Enter your custom domain name and click "Add"

2. **Exploring ScienceGents or capabilities**:
   - Use the domain filter dropdown to view items in a specific domain
   - All custom domains will appear in the dropdown alongside default domains

### For Administrators

1. **Setting up the domain system**:
   - Run the SQL script in `scripts/create-domains-table.sql` in your Supabase project
   - The application will initialize default domains on first run

2. **Managing domains**:
   - Currently, there's no admin interface for domain management
   - Use Supabase directly to manage domains if needed

## Future Improvements

Potential improvements for the domain system:

1. Domain categories or hierarchies for better organization
2. Admin interface for domain management
3. Domain verification process for quality assurance
4. Support for domain icons and descriptions

## Technical Notes

- Default domains are marked with `custom: false` in the database
- Domains are sorted alphabetically in dropdowns
- Domain filtering is case-insensitive
- Domain creation requires authentication 