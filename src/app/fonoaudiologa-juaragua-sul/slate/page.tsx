'use client';

// Import React dependencies.
import React, { useCallback, useState } from 'react';
// Import the Slate editor factory.
import { NodeEntry, createEditor } from 'slate';

// Import the Slate components and React plugin.
import { Slate, Editable, withReact } from 'slate-react';
import { BaseEditor, Descendant, Transforms, Element, Editor } from 'slate';
import { ReactEditor } from 'slate-react';
import { CodeElement } from '@/components/CodeElement';
import { DefaultElement } from '@/components/DefaultElement';

type CustomElement = { type: 'paragraph' | 'code'; children: CustomText[] };
type CustomText = { text: string };

declare module 'slate' {
  interface CustomTypes {
    Editor: BaseEditor & ReactEditor;
    Element: CustomElement;
    Text: CustomText;
  }
}

const initialValue: CustomElement[] = [
  {
    type: 'paragraph',
    children: [{ text: 'A line of text in a paragraph.' }],
  },
];

const App = () => {
  const [editor] = useState(() => withReact(createEditor()));
  // Render the Slate context.

  // Define a type for the props expected by CodeElement and DefaultElement
  type ElementProps = {
    attributes?: React.HTMLAttributes<HTMLElement>; // Adjusted to HTMLElement
    children?: React.ReactNode;
  };

  // Use the ElementProps type in your renderElement function
  const renderElement = useCallback((props: { element: { type: string } } & ElementProps) => {
    switch (props.element.type) {
      case 'code':
        return <CodeElement {...props} />;
      default:
        return <DefaultElement {...props} />;
    }
  }, []);

  return (
    <Slate editor={editor} initialValue={initialValue}>
      <Editable
        className="w-1/2 border border-black rounded mx-auto text-black min-h-[20vh] p-3"
        renderElement={renderElement}
        onKeyDown={(event) => {
          if (event.key === '`' && event.ctrlKey) {
            // Prevent the "`" from being inserted by default.
            event.preventDefault();
            // Otherwise, set the currently selected blocks type to "code".
            Transforms.setNodes(
              editor,
              { type: 'code' },
              { match: (n) => Element.isElement(n) && Editor.isBlock(editor, n) }
            );
          }
        }}
      />
    </Slate>
  );
};

export default App;
