# Welcome to your Lovable project

## Project info

**URL**: https://lovable.dev/projects/REPLACE_WITH_PROJECT_ID

## How can I edit this code?

There are several ways of editing your application.

**Use Lovable**

Simply visit the [Lovable Project](https://lovable.dev/projects/REPLACE_WITH_PROJECT_ID) and start prompting.

Changes made via Lovable will be committed automatically to this repo.

**Use your preferred IDE**

If you want to work locally using your own IDE, you can clone this repo and push changes. Pushed changes will also be reflected in Lovable.

The only requirement is having Node.js & npm installed - [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating)

Follow these steps:

```sh
# Step 1: Clone the repository using the project's Git URL.
git clone <YOUR_GIT_URL>

# Step 2: Navigate to the project directory.
cd <YOUR_PROJECT_NAME>

# Step 3: Install the necessary dependencies.
npm i

# Step 4: Start the development server with auto-reloading and an instant preview.
npm run dev
```

**Edit a file directly in GitHub**

- Navigate to the desired file(s).
- Click the "Edit" button (pencil icon) at the top right of the file view.
- Make your changes and commit the changes.

**Use GitHub Codespaces**

- Navigate to the main page of your repository.
- Click on the "Code" button (green button) near the top right.
- Select the "Codespaces" tab.
- Click on "New codespace" to launch a new Codespace environment.
- Edit files directly within the Codespace and commit and push your changes once you're done.

## What technologies are used for this project?

This project is built with:

- Vite
- TypeScript
- React
- shadcn-ui
- Tailwind CSS

## How can I deploy this project?

Simply open [Lovable](https://lovable.dev/projects/REPLACE_WITH_PROJECT_ID) and click on Share -> Publish.

## Can I connect a custom domain to my Lovable project?

Yes, you can!

To connect a domain, navigate to Project > Settings > Domains and click Connect Domain.

Read more here: [Setting up a custom domain](https://docs.lovable.dev/features/custom-domain#custom-domain)

---

## EmailJS Integration Setup

The **Contact Us** form uses [EmailJS](https://www.emailjs.com/) to send messages directly to `acureatus@gmail.com`. Follow these steps to activate it:

### Step 1 — Create an EmailJS Account
1. Go to [https://www.emailjs.com/](https://www.emailjs.com/) and sign up (free tier: 200 emails/month).

### Step 2 — Add an Email Service
1. In the EmailJS dashboard, go to **Email Services** → **Add New Service**.
2. Choose **Gmail** and connect your `acureatus@gmail.com` account.
3. Copy the **Service ID** (e.g. `service_abc123`).

### Step 3 — Create an Email Template
1. Go to **Email Templates** → **Create New Template**.
2. Set up the template with these variables:

| Variable | Description |
|---|---|
| `{{from_name}}` | Sender's name |
| `{{from_email}}` | Sender's email |
| `{{phone}}` | Sender's phone |
| `{{subject}}` | Message subject |
| `{{message}}` | Message body |
| `{{to_email}}` | Recipient (acureatus@gmail.com) |

3. Example template body:
```
New Contact Form Submission

Name: {{from_name}}
Email: {{from_email}}
Phone: {{phone}}
Subject: {{subject}}

Message:
{{message}}
```
4. Set **To Email** to `{{to_email}}` and **Reply To** to `{{from_email}}`.
5. Copy the **Template ID** (e.g. `template_xyz789`).

### Step 4 — Get Your Public Key
1. Go to **Account** → **API Keys**.
2. Copy the **Public Key**.

### Step 5 — Update the Code
Open `src/components/ContactFormSection.tsx` and replace the placeholder values:

```ts
const EMAILJS_SERVICE_ID = "your_service_id";   // from Step 2
const EMAILJS_TEMPLATE_ID = "your_template_id"; // from Step 3
const EMAILJS_PUBLIC_KEY = "your_public_key";    // from Step 4
```

That's it! The contact form will now send emails to `acureatus@gmail.com`.
