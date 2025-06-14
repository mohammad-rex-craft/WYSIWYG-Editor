# محرر النصوص المتقدم React WYSIWYG

محرر نصوص متقدم ومرن مبني باستخدام React و draft-js. تم تطويره بواسطة محمد الحلبي.

## المميزات

- يدعم وضع التحكم (Controlled) وعدم التحكم (Uncontrolled)
- تنسيق النصوص الأساسي (عريض، مائل، تحته خط)
- شريط أدوات قابل للتخصيص
- دعم التنسيق المخصص
- دعم TypeScript
- اختبارات وحدة

## التثبيت

لتثبيت المشروع، قم بتنفيذ الأمر التالي:

```bash
npm install
```

## التطوير

لتشغيل خادم التطوير:

```bash
npm run dev
```

## الاختبار

لتشغيل الاختبارات:

```bash
npm test
```

## الاستخدام

### الاستخدام الأساسي

```jsx
import RichEditor from './components/RichEditor';

function App() {
  return <RichEditor />;
}
```

### وضع التحكم

```jsx
import { useState } from 'react';
import RichEditor from './components/RichEditor';

function App() {
  const [value, setValue] = useState('');

  return (
    <RichEditor
      value={value}
      onChange={setValue}
    />
  );
}
```

### وضع عدم التحكم مع محتوى أولي

```jsx
import RichEditor from './components/RichEditor';

function App() {
  const initialContent = JSON.stringify({
    blocks: [
      {
        key: 'initial',
        text: 'المحتوى الأولي',
        type: 'unstyled',
        depth: 0,
        inlineStyleRanges: [],
        entityRanges: [],
        data: {}
      }
    ],
    entityMap: {}
  });

  return <RichEditor initialContent={initialContent} />;
}
```

### التنسيق المخصص

```jsx
import RichEditor from './components/RichEditor';

function App() {
  return (
    <RichEditor
      className="custom-editor"
      style={{ border: '2px solid blue' }}
    />
  );
}
```

### شريط الأدوات المخصص

```jsx
import RichEditor from './components/RichEditor';

function App() {
  const customToolbar = (editorState, handleChange) => (
    <div className="custom-toolbar">
      {/* تنفيذ شريط الأدوات المخصص */}
    </div>
  );

  return <RichEditor renderToolbar={customToolbar} />;
}
```

## الخصائص (Props)

| الخاصية | النوع | الوصف | القيمة الافتراضية |
|---------|-------|--------|-------------------|
| value | string | محتوى المحرر بتنسيق JSON (وضع التحكم) | - |
| onChange | function | دالة يتم استدعاؤها عند تغيير المحتوى (وضع التحكم) | - |
| initialContent | string | المحتوى الأولي بتنسيق JSON (وضع عدم التحكم) | - |
| className | string | اسم فئة CSS مخصص | - |
| style | object | أنماط CSS مخصصة | - |
| renderToolbar | function | دالة مخصصة لعرض شريط الأدوات | - |

## الترخيص

MIT

## المطور

تم تطوير هذا المشروع بواسطة محمد الحلبي
