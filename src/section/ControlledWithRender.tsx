import RichEditor from "../components/RichEditor";
import React, { useState, useEffect, useCallback }  from "react";
import { EditorState } from "draft-js";



const ControlledWithRender = () => {
    const [controlledValue, setControlledValue] = useState('')
    const [isLoading, setIsLoading] = useState(true)
    const [editorState, setEditorState] = useState(EditorState.createEmpty())

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

    const handleEditorStateChange = useCallback((state) => {
        setEditorState(state);
    }, []);

    const handleFillAndSendContent = async () => {
        if (editorState) {
            const sampleContent = JSON.stringify({
                blocks: [
                    {
                        key: 'sample1',
                        text: 'مرحباً بك في المحرر النصي',
                        type: 'header-one',
                        depth: 0,
                        inlineStyleRanges: [],
                        entityRanges: [],
                        data: {}
                    },
                    {
                        key: 'sample2',
                        text: 'مميزات المحرر النصي',
                        type: 'header-three',
                        depth: 0,
                        inlineStyleRanges: [],
                        entityRanges: [],
                        data: {}
                    },
                    {
                        key: 'sample3',
                        text: '• تنسيق النصوص بسهولة',
                        type: 'unordered-list-item',
                        depth: 0,
                        inlineStyleRanges: [],
                        entityRanges: [],
                        data: {}
                    },
                    {
                        key: 'sample4',
                        text: '• إضافة روابط وصور',
                        type: 'unordered-list-item',
                        depth: 0,
                        inlineStyleRanges: [],
                        entityRanges: [],
                        data: {}
                    },
                    {
                        key: 'sample5',
                        text: '• تصدير المحتوى بتنسيقات مختلفة',
                        type: 'unordered-list-item',
                        depth: 0,
                        inlineStyleRanges: [],
                        entityRanges: [],
                        data: {}
                    },
                    {
                        key: 'sample6',
                        text: 'خطوات الاستخدام',
                        type: 'header-three',
                        depth: 0,
                        inlineStyleRanges: [],
                        entityRanges: [],
                        data: {}
                    },
                    {
                        key: 'sample7',
                        text: '1. اكتب المحتوى في المحرر',
                        type: 'ordered-list-item',
                        depth: 0,
                        inlineStyleRanges: [],
                        entityRanges: [],
                        data: {}
                    },
                    {
                        key: 'sample8',
                        text: '2. قم بتنسيق النص حسب الحاجة',
                        type: 'ordered-list-item',
                        depth: 0,
                        inlineStyleRanges: [],
                        entityRanges: [],
                        data: {}
                    },
                    {
                        key: 'sample9',
                        text: '3. احفظ المحتوى أو قم بتصديره',
                        type: 'ordered-list-item',
                        depth: 0,
                        inlineStyleRanges: [],
                        entityRanges: [],
                        data: {}
                    },
                    {
                        key: 'sample10',
                        text: 'ملاحظة: يمكنك استخدام جميع أدوات التنسيق المتاحة في شريط الأدوات لتخصيص مظهر المحتوى الخاص بك.',
                        type: 'unstyled',
                        depth: 0,
                        inlineStyleRanges: [],
                        entityRanges: [],
                        data: {}
                    }
                ],
                entityMap: {}
            });

            setControlledValue(sampleContent);

            const contentState = editorState.getCurrentContent();
            const htmlContent = contentState.getPlainText(); 

            try {
                const response = await fetch('https://jsonplaceholder.typicode.com/posts', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ content: htmlContent })
                });

                if (response.ok) {
                    alert('Content sent successfully!');
                } else {
                    throw new Error('Failed to send content');
                }
            } catch (error) {
                console.error('Error sending content:', error);
                alert('Failed to send content to API');
            }
        }
    };

    return (
        <section>
            <h2>Controlled Mode With Render Toolbar</h2>
            {isLoading ? (
                <p>Loading editor content...</p>
            ) : (
                <RichEditor
                    value={controlledValue}
                    onChange={setControlledValue}
                    className="demo-editor"
                    placeHolder={'data'}
                    renderToolbar={(state, setState, config) => {
                        handleEditorStateChange(state);
                        return (
                            <div className='toolbar-render'>
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
                                <select onChange={(e) => config.heading.action(e.target.value)}>
                                    {config.heading.headingOptions.map((option) => (
                                        <option key={option.value} value={option.value}>
                                            {option.label}
                                        </option>
                                    ))}
                                </select>
                                <button
                                    onClick={config.print.action}
                                    className="toolbar-button"
                                    title="Print Content"
                                    aria-label="Print"
                                >
                                    {config.print.label}
                                </button>
                                <button
                                    onClick={config.export.action}
                                    className="toolbar-button"
                                    title="Export Content"
                                    aria-label="Export"
                                >
                                    {config.export.label}
                                </button>
                                <button
                                    onClick={config.fullscreen.action}
                                    className="toolbar-button"
                                    title="Toggle Fullscreen"
                                    aria-label="Fullscreen"
                                >
                                    {config.fullscreen.label}
                                </button>
                                <button
                                    onClick={config.link.action}
                                    className="toolbar-button"
                                    title="Add Link"
                                    aria-label="Link"
                                >
                                    {config.link.label}
                                </button>
                                <button
                                    onClick={config.orderedListDot.action}
                                    className="toolbar-button"
                                    title="Add Link"
                                    aria-label="Link"
                                >
                                    {config.orderedListDot.label}
                                </button>
                                <button
                                    onClick={config.orderedListNum.action}
                                    className="toolbar-button"
                                    title="Add Link"
                                    aria-label="Link"
                                >
                                    {config.orderedListNum.label}
                                </button>
                                <button
                                    onClick={handleFillAndSendContent}
                                    className="toolbar-button-render"
                                    title="Fill and Send Content"
                                    aria-label="Fill and Send"
                                >
                                    Fill & Send
                                </button>
                                <div className="test-input-link">
                                    <input
                                        type="text"
                                        value={config.link.url}
                                        onChange={(e) => config.link.setUrl(e.target.value)}
                                        placeholder="Enter URL"
                                        className="link-input"
                                    />
                                    <button onClick={config.link.action} className="add-link-button" aria-label="Add Link">
                                        Add
                                    </button>
                                </div>
                            </div>
                        )
                    }}
                />
            )}
        </section>
    )
}


export default ControlledWithRender;