<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateSocialsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('socials', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->integer('user_id');

            $table->string('email')->default('');
            $table->integer('count_email')->default(0);

            $table->string('facebook')->default('');
            $table->integer('count_facebook')->default(0);

            $table->string('twitter')->default('');
            $table->integer('count_twitter')->default(0);

            $table->string('instagram')->default('');
            $table->integer('count_instagram')->default(0);

            $table->string('linkedin')->default('');
            $table->integer('count_linkedin')->default(0);

            $table->string('youtube')->default('');
            $table->integer('count_youtube')->default(0);

            $table->string('tiktok')->default('');
            $table->integer('count_tiktok')->default(0);

            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('socials');
    }
}
