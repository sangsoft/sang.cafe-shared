export interface Photo {
    url: string;
    main?: boolean;
    fileName?: string;
    fileType?: string;
    dimensions?: {
        width: number;
        height: number;
    };
    sml?: Photo;
    med?: Photo;
    fileId?: string;
    bucketId?: string;
}
export declare function fromExifData(url: string, exif: any): Photo;
export declare function toPhoto(photo: string | Photo): Photo;
