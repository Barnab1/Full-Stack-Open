```mermaid
graph TD;
   A[user] --> |studies.cs.helsinki.fi/exampleapp/spa| B[Browser];
    B --> |Search the website based on its DNS|C[Internet];
    C --> B;
    B --> |Display Content| A;
```