# Full-Stack Next App Template (auth/localization/apis/form/lint/ui-framwork)

## Overview
A full-stack Next.js application template built-in with configured NextAuth, Next-Intl, tRPC, Prisma, Tailwind CSS, Shadcn, along with linting and React Hook Form with Zod.

## Screenshots
![Screenshot_28-9-2024_185645_localhost](https://github.com/user-attachments/assets/2aa6f5c3-19b5-4a6d-ac37-2b736c5f3eea)
![Screenshot_28-9-2024_185734_localhost](https://github.com/user-attachments/assets/0fe7a92f-3ccd-4d7a-b5c0-115c1e3da6e2)
![Screenshot_28-9-2024_185855_localhost](https://github.com/user-attachments/assets/fd66ef1b-8ef2-4581-9e17-f1209986b70f)

## Technology Stack
- **Framework:** Next.js
- **Authentication:** Configured with NextAuth.js
- **Internationalization:** Integrated with Next-Intl
- **API Handling:** Using tRPC for type-safe APIs
- **Database Management:** Prisma for ORM
- **Styling:** Tailwind CSS for responsive design
- **Component Library:** Shadcn for UI components
- **Code Quality:** ESLint for linting
- **Form Handling:** React Hook Form through wrapper around the custom inputs
- **Validation:** Zod
- **Deployment Ready:** Optimized for deployment on platforms like Vercel

## How to Run the Project
### Prerequisites
Ensure you have the following installed on your machine:
- Node.js (v14 or higher)
- npm or yarn

### Setup
1. Install dependencies (Required envs autometically created with this):
   ```bash
   npm install
   ```

2. Config a `.env` file in the root directory and add your API keys (Optional):
   ```env
    #! Next Auth (Required)
    # You can generate a new secret on the command line with:
    # openssl rand -base64 32
    # https://next-auth.js.org/configuration/options#secret
    NEXTAUTH_SECRET="random-string"
    NEXTAUTH_URL="http://localhost:3000"

    # Prisma (Optional)
    # https://www.prisma.io/docs/reference/database-reference/connection-urls#env
    # Mock database password is set to '12345678'
    # DATABASE_URL="postgresql://postgres:12345678@localhost:5432/full-stack-next-app"

    # Next Auth Google Provider (Optional)
    #GOOGLE_CLIENT_ID="google-client-id"
    #GOOGLE_CLIENT_SECRET="google-client-secret"

   ```
3. If you want to run the application as full-stack app with ready-to-deploy tools
   - Make sure DATABASE_URL is svailablie in .env
   - Make sure Docker is installed and start database through the script:
         ```bash
         npm run start-database
         ```
   - Set up Prisma schema to the database:
         ```bash
         npx prisma db push
         ```

### Running the Application
Start the development server:
```bash
npm run dev
```
Open your browser and navigate to [http://localhost:3000](http://localhost:3000).

## License
This project is licensed under the MIT License.

