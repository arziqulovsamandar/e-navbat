/// <reference types="react" />
declare const _default: {
    array: import("react").FC<{
        data: Record<string, unknown>;
        field: import("../../../../../../../fields/config/types").ArrayField;
    }>;
    blocks: import("react").FC<{
        data: any;
        field: import("../../../../../../../fields/config/types").BlockField;
    }>;
    code: ({ data }: {
        data: any;
    }) => import("react").JSX.Element;
    checkbox: ({ data }: {
        data: any;
    }) => import("react").JSX.Element;
    date: ({ data, field }: {
        data: any;
        field: any;
    }) => import("react").JSX.Element;
    json: ({ data }: {
        data: any;
    }) => import("react").JSX.Element;
    relationship: import("react").FC<{
        field: import("../../../../../../../fields/config/types").UIField | import("../../../../../../../fields/config/types").FieldAffectingData;
        data: unknown;
    }>;
    richText: ({ data }: {
        data: any;
    }) => import("react").JSX.Element;
    select: import("react").FC<{
        data: any;
        field: import("../../../../../../../fields/config/types").SelectField;
    }>;
    radio: import("react").FC<{
        data: any;
        field: import("../../../../../../../fields/config/types").SelectField;
    }>;
    textarea: ({ data }: {
        data: any;
    }) => import("react").JSX.Element;
    upload: import("react").FC<{
        field: import("../../../../../../../fields/config/types").UIField | import("../../../../../../../fields/config/types").FieldAffectingData;
        data: unknown;
    }>;
    File: ({ rowData, data, collection }: {
        rowData: any;
        data: any;
        collection: any;
    }) => import("react").JSX.Element;
};
export default _default;
