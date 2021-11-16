import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Convert = ({ language, text }) => {
    const [translated, setTranslated] = useState('');
    const [debouncedText, setDebouncedText] = useState(text);

    useEffect(() => {
        const term = setTimeout(() => {
            setDebouncedText(text);
        }, 500);

        return () => {
            clearTimeout(term);
        }
    }, [text]);

    useEffect(() => {
        const doTranslation = async () => {
            if(debouncedText) {
                const { data } = await axios.post(
                    'https://translation.googleapis.com/language/translate/v2', 
                    {}, 
                    {
                        params: {
                            q: debouncedText,
                            target: language.value,
                            key: 'AIzaSyCHUCmpR7cT_yDFHC98CZJy2LTms-IwDlM'
                        },
                    }
                );

                setTranslated(data.data.translations[0].translatedText);

            }
        }

        doTranslation();

    }, [language, debouncedText]);
    return (
        <div>
            <h1>{translated}</h1>
        </div>
    );
}

export default Convert;

// second {} is for get request to send along with body
// third {} is for post

// import React from 'react';
// import {axios} from './axios';
// const { useState, useEffect } = React;

// const URL = 'https://jsonplaceholder.typicode.com/users';

// const App = () => {
//     const [users, setUsers] = useState([]);
    
//     useEffect(() => {
//         // Add code here to fetch some users with axios and the URL variable
//         // then update the 'users' piece of state
//         const fetchData = async () => {
//             const {data} = await axios.get(URL);
//             setUsers(data);
//         };
        
//         fetchData();
//     }, [users]);
     
//     const renderedUsers = users.map((user) => {
//         return <li key={user.id}>{user.name}</li>;
//     });
    
//     return (
//         <ul>
//             {renderedUsers}
//         </ul>
//     );
// }

// export default App;
