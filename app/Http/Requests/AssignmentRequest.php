<?php

namespace App\Http\Requests;

use App\Enums\AssignmentTypeEnum;
use App\Enums\AssignmentCategoryEnum;
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
            'category' => ['required', new Enum(AssignmentCategoryEnum::class)],
            'guest_id' => ['required', 'exists:guests,id'],
            'guest_seat_id' => ['required', 'exists:guest_seats,id'],
        ];
    }
}
