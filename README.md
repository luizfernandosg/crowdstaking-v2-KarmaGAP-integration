# Karma GAP Integration for Breadchain

A comprehensive integration of Karma GAP (Global Allocation Platform) into the Breadchain crowdstaking app, providing voters with real-time project progress data, milestone updates, and impact metrics to make more informed funding allocation decisions.

## 🎯 Overview

This integration displays project progress information from Karma GAP directly on the governance voting page, helping voters make more informed funding allocation decisions through:

- **Recent Updates**: Display of latest project updates and milestones active in the period
- **External Links**: Direct links to view full project details on Karma GAP

## ✨ Features

### Core Functionality
- **Recent Updates**: Displays latest project milestones and announcements
- **External Links**: Direct integration with Karma GAP platform
- **Responsive Design**: Works on both mobile and desktop layouts
- **Error Handling**: Graceful degradation when data is unavailable
- **Performance Optimization**: Caching and lazy loading

## 🏗️ Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                    Karma GAP Integration                    │
├─────────────────────────────────────────────────────────────┤
│ Frontend Components:                                        │
│ • ProjectRow (enhanced with Karma GAP data)                │
│ • KarmaGAPInsights (main display component)                │
├─────────────────────────────────────────────────────────────┤
│ Data Layer:                                                 │
│ • useKarmaGAPData (React hook for data fetching)           │
│ • KarmaGAPService (API service class)                      │
│ • karmaGAPProcessing (utility functions)                   │
├─────────────────────────────────────────────────────────────┤
│ API Integration:                                            │
│ • /api/karma-gap/[...path] (secure proxy)                  │
│ • /api/projects/sync-karma-gap (manual sync)               │
├─────────────────────────────────────────────────────────────┤
│ Configuration:                                              │
│ • Environment variables for API keys                       │
│ • Project metadata linking (karmaGAPId field)              │
│ • Caching and error handling                               │
└─────────────────────────────────────────────────────────────┘
```

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ 
- pnpm (recommended) or npm
- Karma GAP API key

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd karma-gap-integration
   ```

2. **Install dependencies**
   ```bash
   pnpm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env.local
   ```

   Add your Karma GAP API credentials:
   ```bash
   # Karma GAP Integration
   NEXT_PUBLIC_KARMA_GAP_API_URL=https://api.karmahq.xyz/api
   KARMA_GAP_API_KEY=your_api_key_here
   KARMA_GAP_WEBHOOK_SECRET=your_webhook_secret_here
   ```

4. **Link projects to Karma GAP**
   ```typescript
   // In src/app/projectsMeta.ts
   {
     name: "Project Name",
     // ... other fields
     karmaGAPId: "real-karma-gap-project-id", // Link to Karma GAP project
   }
   ```

5. **Start development server**
   ```bash
   pnpm run dev
   ```

## �� Project Structure

```
src/
├── config/
│   └── karma.ts                 # Karma GAP configuration
├── types/
│   └── karma.ts                 # TypeScript type definitions
├── services/
│   └── karmaGAP.ts             # API service layer
├── hooks/
│   └── useKarmaGAPData.ts      # React hook for data fetching
├── utils/
│   └── karmaGAPProcessing.ts   # Data processing utilities
└── app/
    ├── governance/
    │   └── components/
    │       ├── ProjectRow.tsx   # Enhanced with Karma GAP data
    │       └── KarmaGAPInsights.tsx
```

## 🔧 Core Components

### 1. Configuration (`src/config/karma.ts`)
```typescript
export const karmaGAPConfig = {
  apiBaseURL: process.env.NEXT_PUBLIC_KARMA_GAP_API_URL || 'https://api.karmahq.xyz/api',
  apiKey: process.env.KARMA_GAP_API_KEY,
  // ... other config options
};
```

### 2. Type Definitions (`src/types/karma.ts`)
- `KarmaGAPProject`: Core project data from Karma GAP
- `Milestone`: Project milestone information
- `ProjectUpdate`: Project updates and announcements
- `ImpactMetric`: Impact measurement data
- `ProjectWithGAPData`: Extended project data including Karma GAP info

### 3. API Service (`src/services/karmaGAP.ts`)
```typescript
export class KarmaGAPService {
  async getCompleteProjectData(karmaGAPId: string): Promise<ProjectProfile | null>
  // ... other methods
}
```

### 4. React Hook (`src/hooks/useKarmaGAPData.ts`)
```typescript
export function useKarmaGAPData(karmaGAPId?: string): UseKarmaGAPDataResult {
  // Handles data fetching, loading states, and error handling
}
```

## 🎨 UI Components

### Complete Insights Panel
```typescript
<KarmaGAPInsights 
  profile={karmaGAPProfile} 
  compact={false} 
/>
```

## 🔌 API Integration

### Proxy Endpoint
- **Route**: `/api/karma-gap/[...path]`
- **Purpose**: Secure proxy for Karma GAP API calls
- **Features**: Request caching, error handling, API key management

### Project Sync
- **Route**: `/api/projects/sync-karma-gap`
- **Method**: POST
- **Purpose**: Manual synchronization of project data
- **Body**: `{ projectId: string, karmaGAPId: string }`

## 🛡️ Security & Performance

### Security Features
- **API Key Protection**: Keys stored securely in environment variables
- **Proxy Routes**: API calls routed through backend to hide credentials
- **Input Validation**: All user inputs validated before API calls
- **CORS Handling**: Proper CORS configuration for external API access

### Performance Optimizations
- **Caching**: API responses cached for 5 minutes by default
- **Lazy Loading**: Data only fetched for projects with `karmaGAPId`
- **Compact Mode**: Lightweight display option for listing views
- **Error Boundaries**: Prevents integration issues from breaking main UI

## 🔄 Data Flow

1. **Project Setup**: Projects link their Karma GAP profiles via `karmaGAPId` in metadata
2. **Data Fetching**: `useKarmaGAPData` hook fetches project data when component mounts
3. **Display**: `KarmaGAPInsights` component renders progress indicators and trust scores
4. **Updates**: Data can be refreshed via the sync API or automatically cached

## 🎯 Integration Points

### ProjectRow Enhancement
The main integration point is in `src/app/governance/components/ProjectRow.tsx`, where Karma GAP insights are displayed for projects that have linked their Karma GAP profiles.

```typescript
// Karma GAP data is fetched and displayed conditionally
{karmaGAPData && !karmaGAPLoading && (
  <div className="mt-3">
    <KarmaGAPInsights profile={karmaGAPData} compact />
  </div>
)}
```

### Governance Page Enhancement
Projects with linked Karma GAP profiles now display:
- **Recent milestone updates** with status indicators
- **Last update timestamps** in human-readable format
- **Direct links** to view full details on Karma GAP

## 🛠️ Customization

### Adding New Projects
1. Add project to `projectsMeta.ts` with `karmaGAPId`
2. Ensure the Karma GAP project ID is valid
3. The integration will automatically display for linked projects

### Styling Customization
Components use Tailwind CSS classes and can be customized by:
- Modifying color schemes in utility functions
- Adjusting size variants in component props
- Updating layout in `KarmaGAPInsights` component

### Data Processing
Customize data processing by modifying functions in `src/utils/karmaGAPProcessing.ts`:
- `calculateProjectHealth()`: Adjust health calculation logic
- `getTrustScoreColor()`: Modify trust score color mapping
- `formatRelativeTime()`: Change time formatting

## 🐛 Troubleshooting

### Common Issues

1. **No Data Displayed**: Check `karmaGAPId` in project metadata
2. **API Errors**: Verify API key and network connectivity
3. **Styling Issues**: Ensure Tailwind CSS classes are available
4. **Type Errors**: Run `pnpm tsc --noEmit` to check TypeScript compilation

### Debug Mode

Enable debug logging by setting:
```bash
DEBUG=karma-gap:*
```

This will log all API calls and data processing steps to the console.

## 🔮 Future Enhancements

Potential improvements for future versions:
1. **Real-time Updates**: Webhook integration for instant data updates
2. **Advanced Filtering**: Filter projects by trust score or activity level
3. **Detailed Modals**: Full project detail views with complete milestone timelines
4. **Admin Dashboard**: Management interface for linking/unlinking projects
5. **Analytics**: Track correlation between Karma GAP data and voting patterns

## 📚 API Documentation

For detailed API information, refer to the [Karma GAP API Documentation](https://documenter.getpostman.com/view/36647319/2sAXxQdrkZ).

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Support

For issues with the Karma GAP integration:
1. Check this documentation first
2. Review the [Karma GAP API Documentation](https://documenter.getpostman.com/view/36647319/2sAXxQdrkZ)
3. Open an issue in the project repository with detailed error information

---

## 🎉 Karma GAP Integration Complete!

This integration successfully provides Breadchain voters with comprehensive project progress data, enabling more informed governance decisions through real-time Karma GAP insights.
