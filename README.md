# Fluently App
Wildly important goal: **To get Fluently app to market by May 3.**

Ask yourself this question: *Are you really willing to derail release for this unimportant little feature?*

## TO DO
Add subscription functionality - backend and front end []
    - Subscription restrictions on front end []
    - Subscribe dialog []
    - Take payment []
    - Manage subscription dialog & APIs []

- Deploy backend to cloud cost-effectively []
    - First testflight build []
- Learner & Learning languages seperate out because not all equal right now []
- When open a book you are taken to where you were up to []
- Be able to add cards raw to the set []

## IN PROGRESS
- Display & allow chapter navigation []

## DONE
- Edit a card after it has been saved [✅]
- Auto log in [✅]
- Fix code not going into src control [✅] - solution documented down below.
- Store the "category of the book" for ease of browsing [✅]
- Make words multi language directional [✅]
- Setting language learner and learning NOT saving [✅]
- Remember where users are at in their book and record reads [✅]
- Delete card from set [✅]
- Be able to save books to library [✅]
    - Add the bottom card [✅]
- Add to set works perfectly [✅]
    - Resolve infinite loop issue [✅]
    - Resolve cards not loading issue [✅]
    - Resolve card groupings [✅]
- Fix up awfull lozenge colours. [✅]
- Content progress is updated as the user reads. [✅]
- Display percentage complete in library [✅]
- Resolve save to library not working [✅]
- Pesky tap bottom card and it closes bug [✅]
- Be able to set the revision type [✅]
- Be able to set card limit to study [✅]
- Add actual user log in and signup functionality [✅]
    - Add user confirmation [✅]
    - Test that syncing works [✅]
    - Auth protect all remaining APIs [✅]
    - Make sure current APIs only relevant to use [✅]
- EJECT OUT OF EXPO [✅]
- Add app logger functionality [✅]
    - Integrate AWS logging solution []
- API to save feedback from users [✅]
- Polish study functionality [✅]
- Implement library scroll design [✅]
- add study set functionality [✅]
    - Fix bug where first card auto flips [✅]
- App internationalisation [✅]
- Dark theming for reading in the dark [✅]
- Implement drop down, button, circular progress & flip card components [✅]
- Implement inspect word text to speech [✅]
- Complete settings page - select learner & learning language. [✅]
- Scaffold revise page. [✅]
- Complete login screen design with floating texts. [✅]
- Get paginating content working seemlessly [✅]
- Implement char based pages so that text always perfectly fits. [✅]
- Integrate sets data with the app [✅]
- When content is enriched, the dictionary as a whole updates. [✅]

## If you find fluentlyapp is not being picked up by git:
```
npx react-native-clean-project
git rm --cached fluentlyapp
```