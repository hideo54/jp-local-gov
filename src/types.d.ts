declare module '*/codes.json' {
    interface Ward {
        code: string;
        type: 'ward';
        name: string;
        ruby: string;
    }

    interface Municipality {
        code: string;
        type: 'municipality';
        name: string;
        ruby: string;
        wards?: Ward[];
    }

    interface Prefecture {
        code: string;
        type: 'prefecture';
        name: string;
        ruby: string;
        municipalities: Municipality[];
    }

    const data: Prefecture[];
    export = data;
}
