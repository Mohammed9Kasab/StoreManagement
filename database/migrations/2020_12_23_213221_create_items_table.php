<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateItemsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('items', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->integer('quantity');
            $table->integer('organization_id');
            $table->foreignId('category_id');
            $table->foreignId('origin_id');
            $table->foreignId('choice_id');
            $table->foreignId('size_id');
            $table->foreign('category_id')
                ->references('id')
                ->on('categories')
                ->onUpdate('cascade')
                ->onDelete('cascade');
            $table->foreign('origin_id')
                ->references('id')
                ->on('origins')
                ->onUpdate('cascade')
                ->onDelete('cascade');
            $table->foreign('choice_id')
                ->references('id')
                ->on('choices')
                ->onUpdate('cascade')
                ->onDelete('cascade');
            $table->foreign('size_id')
                ->references('id')
                ->on('sizes')
                ->onUpdate('cascade')
                ->onDelete('cascade');
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
        Schema::dropIfExists('items');
    }
}
