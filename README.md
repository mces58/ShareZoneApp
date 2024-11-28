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

[Watch App Screen Recording](https://github.com/user-attachments/assets/b5bc7861-08d8-4d92-b86d-4ed26e5980bd)

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
Add the Supabase and Google Generative API keys required for the project to the `.env` file:
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

## **Supabase Database Schema**

For the application to work, create the following tables in Supabase:

#### **users**

| Column Name    | Data Type | Description               |
|----------------|-----------|---------------------------|
| `id`           | uuid      | User ID **(primary key)** |
| `created_at`   | timestamp | User creation time        |
| `user_name`    | text      | User Name                 |
| `image`        | text      | Profile picture URL       |
| `bio`          | text      | User biography            |
| `email`        | text      | User email address        |
| `address`      | text      | Address information       |
| `phone_number` | text      | Phone Number              |

#### **posts**

| Column Name  | Data Type | Description                       |
|--------------|-----------|-----------------------------------|
| `id`         | uuid      | Post ID **(primary key)**         |
| `created_at` | timestamp | Post creation time                |
| `body`       | text      | Post content                      |
| `file`       | text      | Post file URL (image/video)       |
| `user_id`    | uuid      | The user ID that created the post |

**Foreign Key Relations:**
- `user_id` → `users.id`

#### **comments**

| Column Name  | Data Type | Description                    |
|--------------|-----------|--------------------------------|
| `id`         | uuid      | Comment ID **(primary key)**   |
| `created_at` | timestamp | Comment creation time          |
| `text`       | text      | Comment content                |
| `user_id`    | uuid      | User ID who made the comment   |
| `post_id`    | uuid      | Commented post ID              |

**Foreign Key Relations:**
- `post_id` → `posts.id`
- `user_id` → `users.id`

#### **post_likes**

| Column Name  | Data Type | Description                |
|--------------|-----------|----------------------------|
| `id`         | uuid      | Like ID **(primary key)**  |
| `created_at` | timestamp | Like creation time         |
| `user_id`    | uuid      | User ID who made the like  |
| `post_id`    | uuid      | Liked post ID              |

**Foreign Key Relations:**
- `post_id` → `posts.id`
- `user_id` → `users.id`

#### **notifications**

| Column Name   | Data Type | Description                           |
|---------------|-----------|---------------------------------------|
| `id`          | uuid      | Notification ID **(primary key)**     |
| `created_at`  | timestamp | Notification creation time            |
| `title`       | text      | Notification title                    |
| `data`        | text      | Notification content                  |
| `sender_id`   | uuid      | User ID who sent the notification     |
| `receiver_id` | uuid      | User ID who received the notification |

**Foreign Key Relations:**
- `sender_id` → `users.id`
- `receiver_id` → `users.id`

### **Table Relationships Overview**
1. **Users → Posts**: A user can create multiple posts.
2. **Users → Comments**: A user can make more than one comment.
3. **Users → Likes**:  A user can like more than once.
4. **Posts → Comments**: A post can have multiple comments.
5. **Posts → Likes**: A post can receive multiple likes.

#### **Note:**
- Foreign key definitions ensure that relationships are established correctly in Supabase. You can easily define foreign keys via the Supabase interface.
- These structures are critical for relational queries and real-time updates on the backend of the application.

---

## **Contributing**

To contribute to the project, follow these steps:

1. Fork the repository.
2. Create a new branch. `(git checkout -b feature)`
3. Make your changes and commit. `(git commit -m "feat(scope): add new feature")`
4. Open a pull request.
