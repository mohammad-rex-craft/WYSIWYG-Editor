import RichEditor from "../components/RichEditor";
import React from "react";






const Uncontrolled = () => {

    return (

        <section>
            <h2>Uncontrolled Mode</h2>
            <RichEditor
                placeHolder={'data'}
                value={JSON.stringify({
                    blocks: [
                        {
                            key: 'uncontrolled',
                            text: 'This is uncontrolled editor content...',
                            type: 'unstyled',
                            depth: 0,
                            inlineStyleRanges: [],
                            entityRanges: [],
                            data: {}
                        }
                    ],
                    entityMap: {}
                })}
                className="demo-editor"
                
            />
        </section>
    )
}


export default Uncontrolled;