# ScienceGents Application Changelog

## [Version 1.1.0] - 2025-03-28

### Enhancement: Token Statistics Integration

This release focuses on improving the display and utilization of token statistics across the application, with significant improvements to data handling and UI components.

#### Added

- **Token Age Display**: 
  - Added token age display (in days) across the application
  - Implemented calculation fallbacks when age data is not directly available
  - Added dedicated Age card in ScienceGentStatsCards component

- **USD Value Integration**:
  - Direct integration of market_cap_usd and token_price_usd values from Supabase
  - Enhanced display formatting for USD values in TokenStatistics component
  - Added proper currency symbols and value formatting

- **Bulk Synchronization**:
  - Added 'Sync All ScienceGents' button in the admin dashboard
  - Implemented progress tracking for bulk token synchronization
  - Added visual progress indicators with completion percentage
  
#### Improved

- **Error Handling**:
  - Better error recovery when token data is incomplete
  - Improved fallback calculations for when USD values aren't available
  - Robust handling of missing fields in the database

- **UI Enhancements**:
  - Improved market cap display with proper currency formatting
  - Enhanced price display with 24h change indicators
  - Updated ScienceGentTable to display market cap in USD
  - Consistent token value formatting across all components

#### Technical Updates

- Updated data fetching to include age, market_cap_usd, and token_price_usd fields
- Enhanced type definitions and interfaces for ScienceGent data structures
- Implemented proper fallbacks for calculating derived values
- Added compatibility with existing age column in the database

## [Version 1.0.0] - Initial Release

- Initial application release 