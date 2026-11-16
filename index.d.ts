export interface MemeInput { top?: string; bottom?: string; imageUrl?: string }
export interface MemeOptions { width?: number; height?: number; background?: string }
export declare function renderMeme(input: MemeInput, options?: MemeOptions): string;
