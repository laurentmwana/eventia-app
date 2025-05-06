<?php

use App\Enums\AssignmentTypeEnum;
use App\Enums\GuestSeatCategoryEnum;
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
        Schema::create('guest_seats', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('description');
            $table->foreignId('event_id')
                ->constrained()
                ->cascadeOnDelete()
                ->cascadeOnUpdate();


            $table->enum('category', array_map(
                fn(GuestSeatCategoryEnum $enum) => $enum->value,
                GuestSeatCategoryEnum::cases(),
            ));
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('guest_seats');
    }
};
