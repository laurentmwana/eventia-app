<?php

namespace App\Http\Requests;

use App\Dto\EventNotifiedDto;
use Illuminate\Foundation\Http\FormRequest;

class EventNotifiedRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return false;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'event_id' => ['required', 'exists:events,id'],
        ];
    }

    public function toDto(): EventNotifiedDto
    {
        return new EventNotifiedDto($this->validated());
    }
}
