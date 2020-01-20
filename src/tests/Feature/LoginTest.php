<?php

namespace Tests\Feature;

use App\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Facades\Artisan;
use Tests\TestCase;

class LoginTest extends TestCase
{
    use RefreshDatabase;

    public function setUp() : void
    {
        parent::setUp();

        Artisan::call('passport:install');
    }

    /** @test */
    public function a_user_can_login()
    {
        $this->withoutExceptionHandling();

        $password = 'secret123';
        $user = factory(User::class)->create([
            'email' => 'test@fligno.com',
            'password' => bcrypt($password),
        ]);

        $this->postJson('api/login', ['email' => 'test@fligno.com', 'password' => $password])
             ->assertSuccessful()
             ->assertJsonStructure(['access_token', 'token_type', 'expires_at']);

        $this->assertAuthenticatedAs($user, 'web');
    }
}
