<?php

use Illuminate\Support\Facades\Schema;
use App\Enums\AssignmentAvailabilityEnum;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::table('assignments', function (Blueprint $table) {
            $table->enum('availability', array_map(
                fn(AssignmentAvailabilityEnum $enum) => $enum->value,
                AssignmentAvailabilityEnum::cases(),
            ))->default(AssignmentAvailabilityEnum::PENDING->value);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('assignments', function (Blueprint $table) {
            $table->dropColumn('availability');
        });
    }
};
