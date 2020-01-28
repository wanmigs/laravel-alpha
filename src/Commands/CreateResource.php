<?php

namespace Fligno\Auth\Commands;

use Illuminate\Console\Command;

class CreateResource extends Command
{
    /**
     * The name and signature of the console command.
     *-   / vc
     * @var string
     */
    protected $signature = 'resource:create
                {name : The name of the resource model}
                {model? : The model used in resource model}';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Create Resource Model';

    /**
     * Execute the console command.
     *
     * @return mixed
     */
    public function handle()
    {
        $resourcePath = app_path('ResourceModels');

        if (!file_exists($resourcePath)) {
            mkdir($resourcePath);
        }

        $stub = __DIR__ . '/../stubs/ResourceModel.php';
        $name = $this->argument('name');
        $model = $this->argument('model') ?? "\App\\{$name}";

        $file_contents = file_get_contents($stub);
        $file_contents = str_replace("{model}", $model, $file_contents);
        $file_contents = str_replace("{name}", $name, $file_contents);
        file_put_contents($resourcePath . "/{$name}.php", $file_contents);

        $this->info("Resource Model `{$name}` created");
    }
}
