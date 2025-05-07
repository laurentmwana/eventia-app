<?php

namespace App\Http\Requests;

use App\Dto\GuestSeatDto;
use App\Enums\GuestSeatCategoryEnum;
use Illuminate\Validation\Rules\Enum;
use Illuminate\Foundation\Http\FormRequest;

class GuestSeatRequest extends FormRequest
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
            'name' => ['required', 'string', 'max:255'],
            'description' => ['required', 'string'],
            'event_id' => ['required', 'exists:events,id'],
            'category' => ['required', new Enum(GuestSeatCategoryEnum::class)],
        ];
    }

    public function toDto(): GuestSeatDto
    {
        return new GuestSeatDto($this->validated());
    }
}
