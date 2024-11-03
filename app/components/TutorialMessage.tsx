export function TutorialMessage() {
  return (
    <div className="text-center text-gray-900 dark:text-gray-100">
      🥳 App successfully hosted. Try creating a new todo.
      <br />
      <a 
        href="https://docs.amplify.aws/nextjs/start/quickstart/nextjs-app-router-client-components/"
        className="font-bold hover:text-primary-600 dark:hover:text-primary-400"
      >
        Review next steps of this tutorial.
      </a>
    </div>
  );
} 