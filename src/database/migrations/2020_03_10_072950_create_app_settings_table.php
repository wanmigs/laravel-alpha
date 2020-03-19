<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

class CreateAppSettingsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('app_settings', function (Blueprint $table) {
            $table->id();
            $table->string('key');
            $table->text('value')->nullable();
        });

        DB::table('app_settings')->insert([
            'key' => 'coming_soon',
            'value' => 'false',
        ]);

        DB::table('app_settings')->insert([
            'key' => 'coming_soon_email_subject',
            'value' => ''
        ]);

        DB::table('app_settings')->insert([
            'key' => 'coming_soon_email_content',
            'value' => '',
        ]);
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('app_settings');
    }
}
