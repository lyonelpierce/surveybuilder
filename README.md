# Survey Builder

## Get Started

git clone <url>

cd surveybuilder

Run `npm install`

Run `npm run dev` to run the app on `localhost:3000`

## Architectural Approach

1. Different components for modularity
2. Local state management through `SurveyBuilder.tsx` (no need for global state/no prop drilling)
3. Client-side page (requirement)

## Design

1. 3 columns to keep everything is visible without any extra user interaction.
2. Tabs on JSON outputs in case of large surveys.

## Notes

1. I will do pages on server side and use a wrapper that handles all client-side interaction so we can have better SEO and provide users with faster feedback.
2. Will do reusable UI elements (easier way to do it is ShadcnUI) but avoid it because requirements were not to use UI libraries.
