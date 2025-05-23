# ScienceGents Token Dashboard

## Recent Updates

### Token Statistics Integration (March 2025)

We recently enhanced the application with better token statistics integration:

- **Token Age Display**: Added display of token age in days throughout the app
- **USD Value Integration**: Using direct market_cap_usd and token_price_usd values from the database
- **Bulk Synchronization**: Added 'Sync All ScienceGents' button in admin dashboard with progress tracking
- **UI Improvements**: Better formatting, consistent display of token values, and enhanced error handling

See the full [CHANGELOG.md](./CHANGELOG.md) for detailed release notes.

## Overview

The ScienceGents Token Dashboard provides a comprehensive interface for managing and monitoring ScienceGent tokens on the blockchain. Users can explore tokens, view detailed statistics, and perform various operations.

## Project info

**URL**: https://lovable.dev/projects/b82aa3c6-c599-4e8a-90da-28a576c4317b

## How can I edit this code?

There are several ways of editing your application.

**Use Lovable**

Simply visit the [Lovable Project](https://lovable.dev/projects/b82aa3c6-c599-4e8a-90da-28a576c4317b) and start prompting.

Changes made via Lovable will be committed automatically to this repo.

**Use your preferred IDE**

If you want to work locally using your own IDE, you can clone this repo and push changes. Pushed changes will also be reflected in Lovable.

The only requirement is having Node.js & npm installed - [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating)

Follow these steps:

```sh
# Step 1: Clone the repository using the project's Git URL.
git clone <YOUR_GIT_URL>

# Step 2: Navigate to the project directory.
cd <YOUR_PROJECT_NAME>

# Step 3: Install the necessary dependencies.
npm i

# Step 4: Start the development server with auto-reloading and an instant preview.
npm run dev
```

**Edit a file directly in GitHub**

- Navigate to the desired file(s).
- Click the "Edit" button (pencil icon) at the top right of the file view.
- Make your changes and commit the changes.

**Use GitHub Codespaces**

- Navigate to the main page of your repository.
- Click on the "Code" button (green button) near the top right.
- Select the "Codespaces" tab.
- Click on "New codespace" to launch a new Codespace environment.
- Edit files directly within the Codespace and commit and push your changes once you're done.

## What technologies are used for this project?

This project is built with .

- Vite
- TypeScript
- React
- shadcn-ui
- Tailwind CSS

## How can I deploy this project?

Simply open [Lovable](https://lovable.dev/projects/b82aa3c6-c599-4e8a-90da-28a576c4317b) and click on Share -> Publish.

## I want to use a custom domain - is that possible?

We don't support custom domains (yet). If you want to deploy your project under your own domain then we recommend using Netlify. Visit our docs for more details: [Custom domains](https://docs.lovable.dev/tips-tricks/custom-domain/)

## Domain Management

The application uses a domains table in Supabase to store scientific domains for ScienceGents and capabilities. We've provided several options to initialize this table:

### Option 1: Using the Supabase SQL Editor (Recommended)

1. Go to your Supabase project
2. Navigate to the SQL Editor
3. Copy the contents of `scripts/migrations/init-domains-auto-uuid.sql`
4. Paste it into the SQL Editor and run it

This script will:
- Create the domains table if it doesn't exist
- Insert default domains with auto-generated UUIDs
- Set up the necessary permissions

### Option 2: Using the Node.js Script

1. Make sure you have the following environment variables set:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `SUPABASE_SERVICE_ROLE_KEY`

2. Create the required database function in Supabase:
   ```sql
   CREATE OR REPLACE FUNCTION exec_sql(sql_query TEXT)
   RETURNS VOID AS $$
   BEGIN
     EXECUTE sql_query;
   END;
   $$ LANGUAGE plpgsql SECURITY DEFINER;
   ```

3. Run the migration script:
   ```sh
   node scripts/apply-domain-migration.js
   ```

### Troubleshooting

If you experience any issues, you can also try:
- Using `scripts/migrations/init-domains-direct.sql` which includes explicit UUIDs
- Directly querying the database using the Supabase dashboard.

