import { EventModel, GuestModel, GuestSeatModel } from "./model";

export interface EventStateModel {
    status: string[];
    types: string[];
}

export interface EventUserModel {
    id: number;
    title: number;
    status: string;
}


export interface DataValueEnumModel {
    genders: string[]
    guest_seat_categories: string[],
    availabilities: string[]
    assignment_types: string[]
}


export interface DataValueAssignmentsModel {
    guests: GuestModel[]
    guestSeats: GuestSeatModel[],
    events: EventModel[]
}
