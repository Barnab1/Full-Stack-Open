```mermaid
graph TD;
    A[User] --> |Write a note and submit|B[Browser];
    B --> C[Server];
    C --> |send new Note|D[Database];
    D --> |send all notes updated|C;
    C --> B;
```