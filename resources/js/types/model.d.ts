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
    guests: GuestModel[];
    guest_seats: GuestSeatModel[];
    created_at: string;
    updated_at: string;
}

export interface GuestModel {
    id: number;
    avatar: string;
    name: string;
    firstname: string;
    gender: string;
    phone: string;
    event: EventModel;
    assignment?: AssignmentModel;
    assignment_id: number;
    event_id: number;
    created_at: string;
    updated_at: string;
}

export interface GuestSeatModel {
    id: number;
    name: string;
    description: string;
    event: EventModel;
    category: string;
    event_id: number;
    assignments: AssignmentModel[];
    created_at: string;
    updated_at: string;
}

export interface AssignmentModel {
    id: number;
    type: string;
    availability: string;
    guest: GuestModel;
    guest_seat: GuestSeatModel;
    guest_id: number;
    guest_seat_id: number;
    created_at: string;
    updated_at: string;
}

export interface EventModelPaginated extends PaginationData<EventModel> {}

export interface GuestSeatModelPaginated extends PaginationData<GuestSeatModel> {}

export interface AssignmentModelPaginated extends PaginationData<AssignmentModel> {}

export interface GuestModelPaginated extends PaginationData<GuestModel> {}
