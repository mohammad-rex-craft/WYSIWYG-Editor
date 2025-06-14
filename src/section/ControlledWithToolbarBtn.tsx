import RichEditor from "../components/RichEditor";
import React, { useState } from "react";


const ControlledWithToolbarBtn = () => {
    const [controlledValue, setControlledValue] = useState('')
    


    return (
        <section>
            <h2>Controlled Mode With Toolbar Buttons</h2>
                <RichEditor
                    value={controlledValue}
                    onChange={setControlledValue}
                    className="demo-editor"
                    placeHolder={'data'}
                    toolbarButtons={['HEADING', 'BOLD', 'ITALIC', 'UNDERLINE', "LINK", 'LEFT', 'CENTER', 'RIGHT', 'EXPORT_WORD', 'IMAGE', 'ORDERED_LIST_DOT', 'ORDERED_LIST_NUM', 'PRINT']}
                />
        </section>
    )
}


export default ControlledWithToolbarBtn;