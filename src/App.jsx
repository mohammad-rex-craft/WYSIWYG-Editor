import {useState, useEffect} from 'react'
import './App.css'
import RichEditor from './components/RichEditor'

function App() {
    const [controlledValue, setControlledValue] = useState('')
    const [isLoading, setIsLoading] = useState(true)
    const [editorState, setEditorState] = useState(null)

    useEffect(() => {
        const loadInitialContent = async () => {
            await new Promise(resolve => setTimeout(resolve, 1000))
            const initialContent = JSON.stringify({
                blocks: [
                    {
                        key: 'initial',
                        text: 'This is some initial content loaded from an API...',
                        type: 'unstyled',
                        depth: 0,
                        inlineStyleRanges: [],
                        entityRanges: [],
                        data: {}
                    }
                ],
                entityMap: {}
            })
            setControlledValue(initialContent)
            setIsLoading(false)
        }

        loadInitialContent()
    }, [])

    const handleSave = async (content) => {
        await new Promise(resolve => setTimeout(resolve, 1000))
        console.log('Saving content:', content)
    }

    const handleClearContent = () => {
        if (editorState) {
            const emptyContent = JSON.stringify({
                blocks: [
                    {
                        key: 'empty',
                        text: '',
                        type: 'unstyled',
                        depth: 0,
                        inlineStyleRanges: [],
                        entityRanges: [],
                        data: {}
                    }
                ],
                entityMap: {}
            })
            setControlledValue(emptyContent)
        }
    }

    const handleCopyContent = () => {
        if (editorState) {
            const content = editorState.getCurrentContent().getPlainText()
            navigator.clipboard.writeText(content)
                .then(() => alert('Content copied to clipboard!'))
                .catch(err => console.error('Failed to copy content:', err))
        }
    }

    return (
        <div className="app">
            <section>
                <h2>Controlled Mode</h2>
                {isLoading ? (
                    <p>Loading editor content...</p>
                ) : (
                    <RichEditor
                        value={controlledValue}
                        onChange={setControlledValue}
                        className="demo-editor"
                        placeHolder={'data'}
                        toolbarButtons={['FULLSCREEN','HEADING', 'BOLD', 'ITALIC', 'UNDERLINE',"LINK", 'LEFT', 'CENTER', 'RIGHT', 'EXPORT_WORD', 'IMAGE', 'UNORDERED_LIST', 'ORDERED_LIST', 'PRINT']}
                        renderToolbar={(state, setState) => {
                            setEditorState(state)
                            return (
                                <div className="rich-editor-toolbar">
                                    <button 
                                        onClick={handleClearContent}
                                        className="toolbar-button"
                                        title="Clear Content"
                                        aria-label="Clear"
                                    >
                                        Clear
                                    </button>
                                    <button 
                                        onClick={handleCopyContent}
                                        className="toolbar-button"
                                        title="Copy Content"
                                        aria-label="Copy"
                                    >
                                        Copy
                                    </button>
                                </div>
                            )
                        }}
                    />
                )}
                <button onClick={() => handleSave(controlledValue)}>Save Content</button>
            </section>

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
        </div>
    )
}

export default App
