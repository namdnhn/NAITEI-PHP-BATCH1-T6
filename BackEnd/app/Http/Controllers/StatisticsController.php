<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Statistic;

class StatisticsController extends Controller
{
    public function getStatistics(Request $request)
    {
        $startDate = $request->query('start_date');
        $endDate = $request->query('end_date');

        $statistics = Statistic::whereBetween('date', [$startDate, $endDate])->get();

        // Prepare the response data
        $labels = [];
        $sales = [];
        $orders = [];
        $users = [];

        foreach ($statistics as $stat) {
            $labels[] = $stat->date;
            $sales[] = $stat->total_sales;
            $orders[] = $stat->total_orders;
            $users[] = $stat->total_users;
        }

        return response()->json([
            'labels' => $labels,
            'sales' => $sales,
            'orders' => $orders,
            'users' => $users,
        ]);
    }
}
