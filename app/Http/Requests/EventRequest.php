<?php

namespace App\Http\Requests;

use App\Dto\EventDto;
use App\Enums\EventTypeEnum;
use Illuminate\Validation\Rules\Enum;
use Illuminate\Foundation\Http\FormRequest;

class EventRequest extends FormRequest
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
            'image' => ['nullable', 'image', 'max:1024', 'mimes:png,jpg'], // max 2Mo
            'title' => ['required', 'string', 'max:255'],
            'type' => ['required', new Enum(EventTypeEnum::class)],
            'start_at' => ['required', 'date'],
            'end_at' => ['nullable', 'date', 'after_or_equal:start_at'],
            'description' => ['required', 'string'],
        ];
    }

    public function toDto(): EventDto
    {
        return new EventDto($this->validated());
    }
}
