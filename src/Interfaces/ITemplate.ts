export interface ITemplate {
    name: string;
    _id: string;
    aiGenerated: boolean;
    lists: { name: string }[];
    organization: string;
}