import { PaginationData } from './paginate';

// Model Event
export interface EventModel {
    id: number;
    image: string;
    title: string;
    start_at: string;
    end_at: string | null;
    type: string;
    status: string;
    description: string;
    guests: GuestModel[]
    created_at: string;
    updated_at: string;
}


export interface GuestModel {
    id: number;
    image: string;
    name: string;
    firstname: string;
    gender: string;
    phone: string;
    event: EventModel;
    created_at: string;
    updated_at: string;
}



export interface EventModelPaginated extends PaginationData<EventModel> {}
