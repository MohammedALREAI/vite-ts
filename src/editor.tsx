import { useState } from 'react';
import { Content } from 'vanilla-jsoneditor';
import SvelteJSONEditor from './SvelteJSONEditor';

const EditorsTeam = () => {

     const [content, setContent] = useState<Content>({
          json: {
               greeting: "Hello World",
               color: "#ff3e00",
               fontSize: 40,

               ok: true,
               values: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15]
          },
          text: "some thext here "
     });
     return (
          <div>
               <h1>Editors Team</h1>
               <p>Here you can edit the content of the page</p>
               <SvelteJSONEditor
                    content={content}
                    onChange={setContent}
               />
          </div>
     );
};

export default EditorsTeam;
