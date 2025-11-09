Firebase deployment notes and next steps

What I implemented for you
- Created a Firebase project `arvindjicracks` and a Web App (`arvindjicracks-web`).
- Added client Firebase initialization in `src/firebase.ts` (contains the web app SDK config).
- Implemented Google Sign-In + Firestore user profile storage in `src/components/Auth.tsx`.
- Implemented simple download tracking in Firestore from `src/pages/SoftwareDetail.tsx`.
- Hosted the frontend on Firebase Hosting at: https://arvindjicracks.web.app
- Added a scheduled GitHub Action `.github/workflows/scrape-and-commit.yml` that runs `npm run scraper` every 6 hours and commits `data/scraped_software.json` back to the repo. If you add a `FIREBASE_TOKEN` secret, the action will also build and deploy the site.

Why I couldn't fully host the backend (Cloud Functions)
- I attempted to deploy the Express API as a Firebase Cloud Function (`functions/api`). Deploying functions requires enabling additional Google Cloud APIs and the project must be on the Blaze (pay-as-you-go) plan. The Firebase CLI returned an error requiring the Blaze plan.

Options to finish hosting the backend / automated scraping server
1) Upgrade the Firebase project to Blaze and deploy functions
   - Go to: https://console.firebase.google.com/project/arvindjicracks/usage/details and upgrade the project billing plan.
   - Then run locally:
     ```bash
     npm --prefix functions install
     firebase deploy --only functions --project arvindjicracks
     ```
   - The `functions/index.js` file implements a lightweight API that proxies the hosted `data/scraped_software.json` and provides `/api/software`, `/api/software/:id`, and `/api/categories`.

2) Run the Express API on Cloud Run or any other host
   - Build a container for `server/api.js` and deploy to Cloud Run. Update `firebase.json` rewrites to route `/api/**` to the Cloud Run service.

3) Keep using the GitHub Action scraper + Hosting
   - The scheduled action will update `data/scraped_software.json` in the repository every 6 hours. The hosted site will serve the updated JSON and the frontend will read it directly (and also enrich download counts from Firestore).

Firestore security rules (recommended)
1. In the Firebase Console → Firestore → Rules, set rules that allow authenticated users to manage their own profile and allow authenticated writes for downloads:

```
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /users/{userId} {
      allow read: if request.auth != null;
      allow write: if request.auth != null && request.auth.uid == userId;
    }

    match /downloads/{docId} {
      // Allow increments from authenticated users (or tighten as needed)
      allow read: if true;
      allow write: if request.auth != null;
    }
  }
}
```

How to enable automated deploys from GitHub
1. Create a Firebase CI token locally:
   ```bash
   firebase login:ci
   ```
   Save the token output.
2. Add the token to your GitHub repository secrets as `FIREBASE_TOKEN`.
3. The scheduled Action already uses that secret to deploy after scraping.

Next recommended steps I can take for you
- If you enable Blaze billing, I will deploy the Cloud Function so `/api/*` endpoints are available from Firebase.
- Add a small CI workflow to run tests and deploy on push to `main` (I can add it and show the secrets needed).
- Improve UI: add a modern hero, styles, and split the JS bundle to reduce chunk size warning.

Upload scraped data to Firestore (new helper)
-------------------------------------------
To enable server-side search and filtering via the deployed Cloud Function, you can upload the scraped JSON into Firestore. I added a helper script:

  - `scripts/uploadToFirestore.js`

Usage:

```bash
# Provide admin credentials via GOOGLE_APPLICATION_CREDENTIALS or run from an environment with admin access
export GOOGLE_APPLICATION_CREDENTIALS=/path/to/service-account.json
npm run upload-data
```

CI / automation idea
--------------------
After your scheduled scraper runs in GitHub Actions, add a step that calls `npm run upload-data` in the workflow (or use a service account) so Firestore is updated automatically whenever `data/scraped_software.json` changes. This keeps the Cloud Function data fresh without rebuilding the static site.

Indexes
-------
If you add Firestore queries that sort or filter on fields such as `rating` or `category`, create Firestore composite indexes via the Firebase Console or `firestore indexes` config for better performance.
