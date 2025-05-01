<?php

use App\Enums\AssignmentCategoryEnum;
use App\Enums\AssignmentTypeEnum;
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('assignments', function (Blueprint $table) {
            $table->id();

            $table->foreignId('guest_id')
                ->unique()
                ->constrained()
                ->cascadeOnDelete()
                ->cascadeOnUpdate();

            $table->foreignId('guest_seat_id')
                ->constrained()
                ->cascadeOnDelete()
                ->cascadeOnUpdate();

            $table->enum('type', array_map(
                fn(AssignmentTypeEnum $enum) => $enum->value,
                AssignmentTypeEnum::cases(),
            ));

            $table->enum('category', array_map(
                fn(AssignmentCategoryEnum $enum) => $enum->value,
                AssignmentCategoryEnum::cases(),
            ));

            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('assignments');
    }
};
