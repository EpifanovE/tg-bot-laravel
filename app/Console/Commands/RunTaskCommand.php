<?php

namespace App\Console\Commands;

use App\Models\Task\Task;
use Illuminate\Console\Command;

class RunTaskCommand extends Command
{
    protected $signature = 'tasks:run';

    protected $description = 'Command description';

    public function __construct()
    {
        parent::__construct();
    }

    public function handle()
    {
        $tasks = Task::mustBeRun();

        if ($tasks->count() === 0) {
            return;
        }

        $tasks->get()->each(function (Task $task) {
            if (!empty($task->entity)) {
                $task->entity->run();
            }
        });

        $tasks->delete();
    }
}
