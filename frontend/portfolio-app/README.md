# Frontend portfolio app

This app is the React/Vite frontend for the portfolio site. Content is loaded from
the WordPress-backed endpoints defined in `src/definitions/endpoints.js`.

## Loading states

The app has two separate loading experiences:

1. **Suspense fallback (`QuickFallback`)**
   - Defined in `src/App.jsx`
   - Rendered by `<Suspense fallback={<QuickFallback />}>`
   - Shows the CSS spinner from `.loader` in `src/styles.css`
   - Only appears while the route loader promise is still pending

2. **Intro animation (`LoadingAnimation`)**
   - Also defined in `src/App.jsx`
   - Runs after route data has already loaded
   - Uses `DynamicTextWall` and the animation styles under `src/styles/`
   - Hides the final UI until the intro sequence completes

### How the fallback is triggered

The home route is configured in `src/main.jsx` with `loader: appLoader`.
`src/loaders/appLoader.js` intentionally returns `{ fetchedData: dataPromise }`
without awaiting it. Because `App.jsx` reads that promise through
`useLoaderData()` and passes it to `<Await resolve={fetchedData}>`, React
Suspense can render `QuickFallback` until the network requests finish.

Once `fetchedData` resolves, the app stops rendering the spinner and starts the
separate `LoadingAnimation`. After that animation calls `onDone`, the final page
content is shown.
