<?php

namespace Tests\Feature;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Facades\Artisan;
use Tests\TestCase;

class RegisterTest extends TestCase
{
    use RefreshDatabase;

    public function setUp() : void
    {
        parent::setUp();

        Artisan::call('passport:install');
    }

    /** @test */
    public function a_user_can_register()
    {
        $this->withoutExceptionHandling();

        $data = [
            'name' => 'Test Fligno',
            'email' => 'test@fligno.com',
            'password' => 'secret123',
            'password_confirmation' => 'secret123'
        ];

        $this->postJson('api/register', $data)
             ->assertSuccessful()
             ->assertJsonStructure([
                 'message',
                 'access_token',
                 'token_type',
                 'expires_at',
                 'user_type'
             ]);
    }
}
