# Collaborative Text Editing App

Welcome to the **Collaborative Text Editing App (CollabWrite)**, a powerful tool designed for real-time collaborative writing. This app allows multiple users to work on a document simultaneously, leveraging modern web technologies to provide a seamless and interactive experience.

## Features

- **Real-time Collaboration:** Multiple users can edit the same document at the same time with live updates.
- **Rich Text Editor:** Fully-featured text editor with support for rich text formatting, color, lists, and more.
- **User Permissions:** Users can request and grant editing permissions dynamically.
- **Responsive Design:** Built with Tailwind CSS for a modern, responsive interface.

## Technologies Used

- **Angular & React:** Combined for frontend development, using Angular for routing and overall application structure, and React for the rich text editor component.
- **Nx Monorepo:** Manages both Angular and React projects in a single monorepo for efficient development and collaboration.
- **Tailwind CSS:** Provides a utility-first CSS framework for rapid UI development.
- **Firestore Database:** Backend database solution for storing and managing documents, user data, and permissions.

## Installation

1. **Clone the repository:**

   ```bash
   git clone https://github.com/FojoBass/collab-write.git
   ```

2. **Navigate to the project directory:**

   ```bash
   cd collab-write
   ```

3. **Install dependencies:**

   ```bash
   npm install
   ```

4. **Run the development server:**

   ```bash
   npx nx serve collab-write
   ```

## Usage

1. **Start the app:**

   Run the development server as described above.

2. **Access the application:**

   Open your browser and navigate to `http://localhost:4200`

## Development

### Frontend

- **Angular:** Manages application routing, user management, and overall structure.
- **React:** Provides the rich text editor component with real-time updates and formatting options.

### Backend

- **Firestore Database:** Handles document storage, user data, and permissions management.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgements

- **Tailwind CSS:** For its amazing utility-first CSS framework.
- **Nx Monorepo:** For enabling efficient management of both Angular and React projects.
- **Firestore:** For providing a scalable and flexible backend solution.
