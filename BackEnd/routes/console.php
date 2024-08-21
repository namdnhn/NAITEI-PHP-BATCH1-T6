<?php

use Illuminate\Foundation\Inspiring;
use Illuminate\Support\Facades\Artisan;
use App\Console\Commands\DailyStatistic;
use Illuminate\Console\Scheduling\Schedule;

Artisan::command('inspire', function () {
    $this->comment(Inspiring::quote());
})->purpose('Display an inspiring quote')->hourly();

// Đăng ký lệnh statistics:daily không cần định nghĩa lịch trình ở đây
// Artisan::command('statistics:daily', function () {
//     $this->call(DailyStatistic::class);
// });

$this->app->booted(function () {
    $schedule = app(Schedule::class);

    // Định nghĩa lịch chạy hàng ngày cho lệnh statistics:daily
    $schedule->command('statistics:daily')->daily();
});
