<?php

use App\Enums\GenderEnum;
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
        Schema::create('guests', function (Blueprint $table) {
            $table->id();
            $table->string('avatar')->nullable();
            $table->string('name');
            $table->string('firstname');
            $table->string('phone');
            $table->enum('gender', array_map(
                fn(GenderEnum $enum) => $enum->value,
                GenderEnum::cases(),
            ));
            $table->foreignId('event_id')
                ->constrained()
                ->cascadeOnDelete()
                ->cascadeOnUpdate();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('guests');
    }
};
