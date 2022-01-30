<?php

declare(strict_types=1);

namespace App\Http\Api\Requests\Message;

use App\UseCases\Message\MessageService;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class MessageRequest extends FormRequest
{
    public function authorize()
    {
        return true;
    }

    public function validator($factory)
    {
        return $factory->make(
            $this->sanitize(), $this->container->call([$this, 'rules']), $this->messages()
        );
    }

    public function sanitize()
    {
        $this->merge([
            'message' => json_decode($this->input('message'), true),
            'admin_ids' => json_decode($this->input('admin_ids'), true),
        ]);

        return $this->all();
    }

    public function rules()
    {
        return [
            "save_mode" => ["required", Rule::in([
                MessageService::SAVE_MODE_DRAFT,
                MessageService::SAVE_MODE_PUBLISH,
                MessageService::SAVE_MODE_PLANNED,
                MessageService::SAVE_MODE_TEST,
            ])],
            "admin_ids" => ["nullable", "array",],
            "admin_ids.*" => ["integer",],
            "message" => ["array", "required",],
            "message.body" => ["required", "string", ],
            "message.name" => ["required", "string", ],
            "message.parse_mode" => ["required", Rule::in(["html", "md",])],
            "message.run_at" => ["nullable", "string",],
            "attachments_ids" => ["nullable", "array",],
            "attachments_ids.*" => ["integer",],
            "files" => ["array", "nullable",],
            "files.*" => ["image",],
        ];
    }
}
