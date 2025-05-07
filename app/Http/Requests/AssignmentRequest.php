<?php

namespace App\Http\Requests;

use App\DTO\AssignmentDto;
use App\Enums\AssignmentTypeEnum;
use App\Enums\GuestSeatCategoryEnum;
use Illuminate\Validation\Rules\Enum;
use Illuminate\Foundation\Http\FormRequest;

class AssignmentRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'type' => ['required', new Enum(AssignmentTypeEnum::class)],
            'guest_id' => ['required', 'exists:guests,id'],
            'event_id' => ['required', 'exists:guests,id'],
            'guest_seat_id' => ['required', 'exists:guest_seats,id'],
        ];
    }

    public function toDto(): AssignmentDto
    {
        return new AssignmentDto($this->validated());
    }
}
