# iOS Release Checklist

## Stage 1: Project Identity

- Confirm final app name: NutriPlan.
- Confirm final bundle identifier before creating the App Store Connect app record.
- Current bundle identifier: `com.swc497197.nutriplan`.
- Current iOS build number: `1`.
- Current app version: `0.1.0`.
- Replace placeholder icon and splash before public release if needed.

## Stage 2: Health And Nutrition Review Boundary

- Do not claim disease diagnosis, clinical nutrition treatment, or guaranteed fat loss.
- Do not describe genetic tendencies as medical conclusions.
- Keep nutrition values labeled as demo or estimated until a real calculation model exists.
- If collecting real health-related data later, prepare a privacy policy and deletion mechanism first.
- Do not enable HealthKit until there is a clear product reason and review-ready privacy wording.

## Stage 3: Accounts And Data

- Current prototype keeps data local.
- Do not upload body profile, diet preferences, or genetic preferences without explicit consent.
- If a backend is added later, define storage, deletion, export, and access-control rules before release.

## Stage 4: Build And TestFlight

- Install EAS CLI and log in to Expo.
- Log in to Apple Developer / App Store Connect.
- Run a production iOS build with EAS.
- Upload the build to App Store Connect.
- Test through TestFlight on real iPhone before App Store review.

## Stage 5: App Store Metadata

- App description must position the app as a diet planning assistant, not a medical tool.
- Screenshots should show plan, shopping list, share page, and profile/settings.
- Privacy nutrition labels should match actual data collection.
- Add a support URL and privacy policy URL before public submission.
