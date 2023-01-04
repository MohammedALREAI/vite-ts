import { useEffect, useRef } from "react";
import { JSONEditor } from "vanilla-jsoneditor";
import "./index.css";

export default function SvelteJSONEditor(props: any) {
     const refContainer = useRef(null);
     const refEditor = useRef(null);

     useEffect(() => {
          refEditor.current = new JSONEditor({
               target: refContainer?.current as any,
               props: {}
          }) as any;
          return () => {
               // check  if refEditor.current have  method destroy
               if (refEditor.current) {
                    (refEditor.current as any)?.destroy();
                    refEditor.current = null;
               }
          };
     }, []);

     useEffect(() => {
          if (refEditor.current) {
               (refEditor.current as any)?.updateProps(props);
          }
     }, [props]);

     return <div className="vanilla-jsoneditor-react" ref={refContainer}></div>;
}
