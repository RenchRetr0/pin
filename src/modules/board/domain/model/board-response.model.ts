export class BoardResponseModel {
    id!: string;
    created_at!: Date;
    board_pins_modified_at!: Date;
    name!: string;
    description?: string | null;
    collaborator_count!: number;
    pin_count!: number;
    follower_count!: number;
    media?: {
        image_cover_url?: string | null;
        pin_thumbnail_urls?: Array<string> | null;
    };
    owner?: {
        username?: string | null;
    };
    privacy!: string;
}
