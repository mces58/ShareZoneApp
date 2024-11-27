# **ShareZoneApp**

**ShareZoneApp** is a modern and innovative mobile application designed to enhance users' social media experience to the fullest. The platform combines essential social media features such as sharing posts, leaving comments, sending likes, receiving notifications, and updating profiles in one seamless package. Additionally, with its sleek design and user-friendly interface, the app offers personalized notifications and an enjoyable way to interact on social media. ShareZoneApp not only allows individuals to consume content but also empowers them to create unique posts and reach a broader audience. This platform strengthens social connections while providing a safe and engaging environment where everyone can express themselves freely and creatively.

---

## **Features**

- User registration and login processes (with email and password verification).
- Sharing and deleting posts.
- Commenting on and liking posts.
- Notifications for likes and comments.
- Updating profile information.
- Stylish and user-friendly design.

---

## **Technologies and Tools**

Main technologies and tools used in this project:

- **React Native (Expo):** Mobile application development.
- **TypeScript:** A type-safe code base.
- **Supabase:** Real-time database and user authentication.
- **Git:** Version control system.
- **ESLint & Prettier:** Maintaining code quality and formatting.
- **Storybook:** Developing and documenting components in isolation.
- **Husky, Commitlint & Lint-staged:** Automatic checking of commit messages and code changes.
- **GitHub Workflow:** Automated processing for ESLint and Prettier.
- **Yarn:** Package manager.
- **Google Generative API:** Present tense control for commit messages.

---

## **Screen Recording**

The video below shows the app's key features and user interactions:

---

## **Installation and Operation**

To run the project in a local environment, follow the steps below:

#### **1. Required Tools**
- **Node.js** (v22 or above)
- **Yarn** (for dependency management)
- **Supabase account and project keys**
- **Google Generative AI Api Key**

#### **2. Clone Repository**
```bash
git https://github.com/mces58/ShareZoneApp.git
cd ShareZoneApp
```

#### **3. Install Dependencies**
```bash
yarn install
```

#### **4. Set Environment Variables**
Add the Supabase and Google Generative API keys required for the project to the ```.env``` file:
```bash
# Supabase Environment Variables
SUPABASE_PROJECT_URL=your-supabase-url
SUPABASE_ANON_KEY=your-supabase-anon-key

# Google Generative AI API Key
GOOGLE_GENERATIVE_AI_API_KEY=your-google-generative-ai-api-key
```

#### **5. Launch the App**
```bash
yarn start
```

---

## **Project Structure**
```bash
/src
  /assets       # Application icons and font files
  /components   # Reusable components (Buttons, Cards, etc.)
  /contexts     # React Context definitions
  /navigations  # App navigation configurations
  /screens      # Different screens (Login, Profile, Home, etc.)
  /services     # API and Supabase connections
  /supabase     # Supabase related operations and configurations
  /utils        # Auxiliary functions
```

---

## **Contributing**

To contribute to the project, follow these steps:

1. Fork the repository.
2. Create a new branch. ```(git checkout -b feature)```
3. Make your changes and commit. ```(git commit -m feat(scope): add new feature```
4. Open a pull request.