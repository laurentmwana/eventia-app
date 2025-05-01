<?php

use App\Enums\EventTypeEnum;
use App\Enums\EventStatusEnum;
use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('events', function (Blueprint $table) {
            $table->id();
            $table->string('image')->nullable();
            $table->string('title');
            $table->enum('status', array_map(
                fn(EventStatusEnum $enum) => $enum->value,
                EventStatusEnum::cases(),
            ))->default(EventStatusEnum::NEXT->value);
            $table->enum('type', array_map(
                fn(EventTypeEnum $enum) => $enum->value,
                EventTypeEnum::cases(),
            ));
            $table->date('start_at');
            $table->date('end_at')->nullable();
            $table->longtext('description');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('events');
    }
};
