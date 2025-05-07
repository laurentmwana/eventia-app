<?php

namespace App\Http\Controllers\DataValues;

use App\Models\Event;
use App\Models\Guest;
use App\Models\GuestSeat;
use App\Models\Assignment;
use Illuminate\Http\Request;
use Illuminate\Support\Carbon;
use Illuminate\Support\Facades\DB;
use App\Http\Controllers\Controller;

class DataValueStatisticEventController extends Controller
{
    public function __construct(private Request $request) {}

    public function getMonthlyStatistics(Request $request)
    {
        // Check if user is authenticated
        if (!$this->request->user()) {
            return response()->json([
                'chartData' => [],
                'totals' => [
                    'currentYear' => 0,
                    'previousYear' => 0,
                ]
            ]);
        }

        // Current year by default, or year specified in the request
        $currentYear = $request->input('year', now()->year);
        $previousYear = $currentYear - 1;

        // Get data for current year
        $currentYearData = $this->getYearlyData($currentYear);

        // Get data for previous year
        $previousYearData = $this->getYearlyData($previousYear);

        // Format data for the chart
        $chartData = $this->formatChartData($currentYearData, $previousYearData);

        return response()->json([
            'chartData' => $chartData,
            'totals' => [
                'currentYear' => array_sum(array_column($chartData, 'currentYear')),
                'previousYear' => array_sum(array_column($chartData, 'previousYear')),
            ]
        ]);
    }

    private function getYearlyData($year)
    {
        // If user is not authenticated, return empty array
        if (!$this->request->user()) {
            return [];
        }

        $eventsData = Event::selectRaw('MONTH(start_at) as month, COUNT(*) as count')
            ->whereYear('start_at', $year)
            ->groupBy(DB::raw('MONTH(start_at)'))
            ->where('user_id', '=', $this->request->user()->id)
            ->orderBy('month')
            ->get()
            ->keyBy('month')
            ->map(function ($item) {
                return $item->count;
            })
            ->toArray();

        // Get number of guests per month for the specified year
        $guestsData = Guest::selectRaw('MONTH(created_at) as month, COUNT(*) as count')
            ->whereYear('created_at', $year)
            ->groupBy(DB::raw('MONTH(created_at)'))
            ->orderBy('month')
            ->get()
            ->keyBy('month')
            ->map(function ($item) {
                return $item->count;
            })
            ->toArray();

        // Get number of assignments per month for the specified year
        $assignmentsData = Assignment::selectRaw('MONTH(created_at) as month, COUNT(*) as count')
            ->whereYear('created_at', $year)
            ->groupBy(DB::raw('MONTH(created_at)'))
            ->orderBy('month')
            ->get()
            ->keyBy('month')
            ->map(function ($item) {
                return $item->count;
            })
            ->toArray();

        // Combine data (you can adjust the formula according to your needs)
        $combinedData = [];
        for ($month = 1; $month <= 12; $month++) {
            $eventCount = $eventsData[$month] ?? 0;
            $guestCount = $guestsData[$month] ?? 0;
            $assignmentCount = $assignmentsData[$month] ?? 0;

            $combinedData[$month] = $eventCount + $guestCount + $assignmentCount;
        }

        return $combinedData;
    }

    private function formatChartData($currentYearData, $previousYearData)
    {
        $chartData = [];
        $currentYear = now()->year;

        for ($month = 1; $month <= 12; $month++) {
            $daysInMonth = Carbon::createFromDate($currentYear, $month, 1)->daysInMonth;

            for ($day = 1; $day <= $daysInMonth; $day++) {
                $date = Carbon::createFromDate($currentYear, $month, $day)->format('Y-m-d');

                $currentYearValue = isset($currentYearData[$month])
                    ? round($currentYearData[$month] / $daysInMonth * (0.7 + mt_rand(0, 60) / 100))
                    : 0;

                $previousYearValue = isset($previousYearData[$month])
                    ? round($previousYearData[$month] / $daysInMonth * (0.7 + mt_rand(0, 60) / 100))
                    : 0;

                $chartData[] = [
                    'date' => $date,
                    'currentYear' => $currentYearValue,
                    'previousYear' => $previousYearValue
                ];
            }
        }

        return $chartData;
    }

    public function getSeatCategoryStatistics()
    {
        // Check if user is authenticated
        if (!$this->request->user()) {
            return response()->json([]);
        }

        $categories = GuestSeat::selectRaw('category, COUNT(*) as count')
            ->groupBy('category')
            ->get();

        return response()->json($categories);
    }

    public function getEventTypeStatistics()
    {
        // Check if user is authenticated
        if (!$this->request->user()) {
            return response()->json([]);
        }

        $types = Event::selectRaw('type, COUNT(*) as count')
            ->groupBy('type')
            ->get();

        return response()->json($types);
    }
}
