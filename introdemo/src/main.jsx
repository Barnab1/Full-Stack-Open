import ReactDom from 'react-dom/client';
import App from './App';


const notes = [
    {
        id:1,
        content: 'HTML is easy',
        important: true
    },
    {
        id:2,
        content: 'Browser can only execute Javascript',
        important: false
    },
    {
        id:3,
        content: 'GET and POST are the most important methods of HTTP Protocol',
        important: true
    }
]

ReactDom.createRoot(document.getElementById('root')).render(<App notes = {notes}/>) 



