/// <reference types="react" />
declare const elements: {
    h1: {
        Button: () => import("react").JSX.Element;
        Element: ({ attributes, children }: {
            attributes: any;
            children: any;
        }) => import("react").JSX.Element;
    };
    h2: {
        Button: () => import("react").JSX.Element;
        Element: ({ attributes, children }: {
            attributes: any;
            children: any;
        }) => import("react").JSX.Element;
    };
    h3: {
        Button: () => import("react").JSX.Element;
        Element: ({ attributes, children }: {
            attributes: any;
            children: any;
        }) => import("react").JSX.Element;
    };
    h4: {
        Button: () => import("react").JSX.Element;
        Element: ({ attributes, children }: {
            attributes: any;
            children: any;
        }) => import("react").JSX.Element;
    };
    h5: {
        Button: () => import("react").JSX.Element;
        Element: ({ attributes, children }: {
            attributes: any;
            children: any;
        }) => import("react").JSX.Element;
    };
    h6: {
        Button: () => import("react").JSX.Element;
        Element: ({ attributes, children }: {
            attributes: any;
            children: any;
        }) => import("react").JSX.Element;
    };
    link: {
        Button: import("react").FC<{
            path: string;
            fieldProps: import("../types").Props;
        }>;
        Element: import("react").FC<{
            attributes: import("react").HTMLAttributes<HTMLDivElement>;
            children: import("react").ReactNode;
            element: any;
            fieldProps: import("../types").Props;
            editorRef: import("react").RefObject<HTMLDivElement>;
        }>;
        plugins: ((incomingEditor: import("slate").BaseEditor & import("slate-react").ReactEditor & import("slate-history").HistoryEditor) => import("slate").BaseEditor & import("slate-react").ReactEditor & import("slate-history").HistoryEditor)[];
    };
    blockquote: {
        Button: () => import("react").JSX.Element;
        Element: ({ attributes, children }: {
            attributes: any;
            children: any;
        }) => import("react").JSX.Element;
    };
    ol: {
        Button: () => import("react").JSX.Element;
        Element: ({ attributes, children }: {
            attributes: any;
            children: any;
        }) => import("react").JSX.Element;
    };
    ul: {
        Button: () => import("react").JSX.Element;
        Element: ({ attributes, children }: {
            attributes: any;
            children: any;
        }) => import("react").JSX.Element;
    };
    li: {
        Element: (props: any) => import("react").JSX.Element;
    };
    indent: {
        Button: () => import("react").JSX.Element;
        Element: ({ attributes, children }: {
            attributes: any;
            children: any;
        }) => import("react").JSX.Element;
    };
    relationship: {
        Button: (props: {
            path: string;
            enabledCollectionSlugs: string[];
        }) => import("react").ReactNode;
        Element: (props: {
            attributes: import("react").HTMLAttributes<HTMLDivElement>;
            children: import("react").ReactNode;
            element: any;
            fieldProps: import("../types").Props;
        }) => import("react").ReactNode;
        plugins: ((incomingEditor: any) => any)[];
    };
    upload: {
        Button: (props: {
            path: string;
            enabledCollectionSlugs: string[];
        }) => import("react").ReactNode;
        Element: (props: import("./upload/Element").ElementProps) => import("react").ReactNode;
        plugins: ((incomingEditor: any) => any)[];
    };
};
export default elements;
