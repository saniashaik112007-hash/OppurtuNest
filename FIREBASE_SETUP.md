# Firebase Setup Guide for Opportunest

This guide will help you set up Firebase Authentication and Firestore for your Opportunest application.

## Step 1: Enable Firebase Authentication

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Select your project: **opportunest-b44b4**
3. Navigate to **Authentication** → **Sign-in method**
4. Click on **Email/Password**
5. Enable the **Email/Password** provider
6. Click **Save**

## Step 2: Set Up Firestore Database

1. In Firebase Console, go to **Firestore Database**
2. Click **Create database**
3. Choose one of the following:

   **Option A: Start in test mode (for development)**
   - Select **Start in test mode**
   - Choose a location (e.g., `us-central1`)
   - Click **Enable**

   **Option B: Start in production mode (recommended for production)**
   - Select **Start in production mode**
   - Choose a location
   - Click **Enable**

4. After creating the database, go to **Rules** tab and update the rules:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Users can only read/write their own user document
    match /users/{userId} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
    }
    
    // Add other collections as needed
    match /{document=**} {
      allow read, write: if request.auth != null;
    }
  }
}
```

5. Click **Publish** to save the rules

## Step 3: Verify Your Configuration

Your Firebase configuration is already set up in `src/lib/firebase.ts` with:
- ✅ API Key
- ✅ Auth Domain
- ✅ Project ID
- ✅ Storage Bucket
- ✅ Messaging Sender ID
- ✅ App ID

## Step 4: Test the Application

1. Start the development server:
   ```bash
   npm run dev
   ```

2. Navigate to `http://localhost:5173`

3. **Create a new account:**
   - Click "Sign up" or go to `/signup`
   - Fill in all the required fields
   - Create a password (minimum 6 characters)
   - Click "Create Profile"

4. **Sign in:**
   - Use the email and password you just created
   - You should be redirected to the dashboard

## Troubleshooting

### Error: "auth/invalid-credential"
- **Cause**: Trying to log in with credentials that don't exist
- **Solution**: Make sure you've created an account first via the signup page

### Error: "Could not reach Cloud Firestore backend"
- **Cause**: Firestore is not enabled or not properly configured
- **Solution**: 
  1. Go to Firebase Console → Firestore Database
  2. Make sure the database is created and enabled
  3. Check your internet connection
  4. Verify Firestore rules allow authenticated users

### Error: "Function components cannot be given refs"
- **Status**: ✅ FIXED - The Button component now uses `forwardRef`

### Firestore Rules Issues
If you're getting permission errors:
1. Go to Firebase Console → Firestore Database → Rules
2. Make sure the rules allow authenticated users to read/write their own data
3. Click "Publish" after updating rules

## Security Notes

⚠️ **Important**: The Firebase Admin SDK JSON file (`opportunest-b44b4-firebase-adminsdk-fbsvc-adaeaf6fa3.json`) is for **server-side use only**. 

- ✅ **Client-side**: Uses the Firebase Web SDK (already configured)
- ❌ **Never expose**: The Admin SDK credentials in client-side code
- ✅ **Safe**: The Admin SDK file can be used for backend/server operations

## Next Steps

Once Firebase is set up:
1. ✅ Authentication will work automatically
2. ✅ User profiles will be saved to Firestore
3. ✅ All dashboard data will be fetched from Firebase
4. ✅ Users can log in, sign up, and reset passwords

## Support

If you encounter any issues:
1. Check the browser console for detailed error messages
2. Verify all Firebase services are enabled in the Firebase Console
3. Ensure your Firestore rules allow authenticated access
4. Check that Email/Password authentication is enabled

